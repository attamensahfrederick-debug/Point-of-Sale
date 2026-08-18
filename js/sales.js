// Sales order form management
document.addEventListener('DOMContentLoaded', () => {
    const attendantSelect = document.getElementById('attendant');
    const STORAGE_KEY = 'selectedAttendant';

    // Calculate and update order totals
    function recalculateTotals() {
        const orderLines = document.querySelectorAll('.order-line');
        let orderTotal = 0;

        orderLines.forEach((line) => {
            const quantity = parseFloat(line.querySelector('.qty').value) || 0;
            const unitPrice = parseFloat(line.querySelector('.price').value) || 0;
            const lineTotal = Math.round((quantity * unitPrice) * 100) / 100;

            line.querySelector('.line-total').value = lineTotal.toFixed(2);
            orderTotal += lineTotal;
        });

        const totalDisplay = document.getElementById('order-total');
        if (totalDisplay) {
            totalDisplay.textContent = orderTotal.toFixed(2);
        }
    }

    // Persist attendant selection in localStorage
    if (attendantSelect) {
        const savedAttendant = localStorage.getItem(STORAGE_KEY);
        if (savedAttendant) {
            attendantSelect.value = savedAttendant;
        }

        attendantSelect.addEventListener('change', (event) => {
            localStorage.setItem(STORAGE_KEY, event.target.value);
        });
    }

    // Update totals when quantity or price changes
    document.addEventListener('input', (event) => {
        if (event.target.matches('.qty') || event.target.matches('.price')) {
            recalculateTotals();
        }
    });

    // Handle adding and removing order lines
    document.addEventListener('click', (event) => {
        const tbody = document.querySelector('#order-table tbody');
        if (!tbody) return;

        if (event.target.matches('.add-line')) {
            const templateRow = tbody.querySelector('.order-line');
            const newRow = templateRow.cloneNode(true);

            // Reset new row inputs
            newRow.querySelectorAll('input').forEach((input) => {
                if (input.classList.contains('qty')) {
                    input.value = 1;
                } else if (input.classList.contains('line-total')) {
                    input.value = '0.00';
                } else {
                    input.value = '';
                }
            });

            tbody.appendChild(newRow);
            recalculateTotals();
        }

        if (event.target.matches('.remove-line')) {
            const allRows = tbody.querySelectorAll('.order-line');
            const targetRow = event.target.closest('.order-line');

            if (allRows.length > 1) {
                targetRow.remove();
            } else {
                // Clear the last row instead of removing it
                targetRow.querySelectorAll('input').forEach((input) => {
                    input.value = input.classList.contains('qty') ? 1 : '';
                });
            }
            recalculateTotals();
        }
    });

    // Initial calculation
    recalculateTotals();
});
