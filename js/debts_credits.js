// Debt and credit entry management
const entryForm = document.getElementById('entry-form');
const debtTotal = document.getElementById('debt-total');
const creditTotal = document.getElementById('credit-total');
const creditsBody = document.getElementById('credits-body');
let debtAmount = 3000;
let creditAmount = 0;

entryForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const person = document.getElementById('person').value.trim();
    const amount = Number(document.getElementById('amount').value);
    const entryType = document.getElementById('entry-type').value;

    if (!person || amount <= 0) {
        return;
    }

    if (entryType === 'debt') {
        debtAmount += amount;
        debtTotal.textContent = `Ghc ${debtAmount.toLocaleString('en-GH', { minimumFractionDigits: 2 })}`;
    } else {
        creditAmount += amount;
        creditTotal.textContent = `Ghc ${creditAmount.toLocaleString('en-GH', { minimumFractionDigits: 2 })}`;
        const row = document.createElement('tr');
        row.innerHTML = `<td>${person}</td><td>Ghc ${amount.toLocaleString('en-GH', { minimumFractionDigits: 2 })}</td>`;
        creditsBody.appendChild(row);
    }

    entryForm.reset();
});
