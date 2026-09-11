document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('supplier-form');
    const tableBody = document.getElementById('purchase-body');
    const totalDisplay = document.getElementById('purchase-total');
    const message = document.getElementById('form-message');
    const storageKey = 'purchases';

    if (!form || !tableBody || !totalDisplay) {
        return;
    }

    let purchases = JSON.parse(localStorage.getItem(storageKey) || 'null');
    if (!Array.isArray(purchases)) {
        purchases = [{
            supplier: 'J and J enterprise',
            product: 'Laptop',
            quantity: 50,
            amount: 50000
        }];
        localStorage.setItem(storageKey, JSON.stringify(purchases));
    }

    function renderPurchases() {
        tableBody.innerHTML = '';
        const total = purchases.reduce((sum, purchase) => sum + purchase.amount, 0);

        purchases.forEach((purchase) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${purchase.supplier}</td>
                <td>${purchase.product}</td>
                <td>${purchase.quantity}</td>
                <td>Ghc ${purchase.amount.toFixed(2)}</td>
            `;
            tableBody.appendChild(row);
        });

        totalDisplay.textContent = `Ghc ${total.toFixed(2)}`;
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const purchase = {
            supplier: document.getElementById('supplier-name').value.trim(),
            product: document.getElementById('purchase-product').value.trim(),
            quantity: Number(document.getElementById('purchase-quantity').value),
            amount: Number(document.getElementById('purchase-amount').value)
        };

        if (!purchase.supplier || !purchase.product || purchase.quantity < 1 || purchase.amount < 0) {
            if (message) {
                message.textContent = 'Enter valid supplier, product, quantity, and amount details.';
            }
            return;
        }

        purchases.push(purchase);
        localStorage.setItem(storageKey, JSON.stringify(purchases));
        form.reset();
        if (message) {
            message.textContent = '';
        }
        renderPurchases();
    });

    renderPurchases();
});