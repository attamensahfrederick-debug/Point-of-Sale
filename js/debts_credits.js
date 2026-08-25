// Debt and credit entry management
const entryForm = document.getElementById('entry-form');
const creditorTotal = document.getElementById('creditor-total');
const debtorTotal = document.getElementById('debtor-total');
const creditorsBody = document.getElementById('creditors-body');
const debtorsBody = document.getElementById('debtors-body');

const parseAmount = (value) => Number.parseFloat(value.replace(/[^\d.-]/g, '')) || 0;
const formatAmount = (amount) => `Ghc ${amount.toLocaleString('en-GH', { minimumFractionDigits: 2 })}`;

let creditorAmount = parseAmount(creditorTotal.textContent);
let debtorAmount = parseAmount(debtorTotal.textContent);

entryForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const person = document.getElementById('person').value.trim();
    const amount = Number(document.getElementById('amount').value);
    const entryType = document.getElementById('entry-type').value;

    if (!person || !Number.isFinite(amount) || amount <= 0) {
        return;
    }

    if (entryType === 'creditor') {
        creditorAmount += amount;
        creditorTotal.textContent = formatAmount(creditorAmount);
    } else {
        debtorAmount += amount;
        debtorTotal.textContent = formatAmount(debtorAmount);
    }

    const row = document.createElement('tr');
    const personCell = document.createElement('td');
    const amountCell = document.createElement('td');
    personCell.textContent = person;
    amountCell.textContent = formatAmount(amount);
    row.append(personCell, amountCell);
    const targetBody = entryType === 'creditor' ? creditorsBody : debtorsBody;
    targetBody.appendChild(row);

    entryForm.reset();
});
