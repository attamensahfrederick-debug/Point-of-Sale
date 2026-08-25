// Account selection and persistence

document.addEventListener('DOMContentLoaded', () => {
    const accountCards = document.querySelectorAll('.card[data-color]');
    const storageKey = 'selectedAccount';
    const savedAccount = localStorage.getItem(storageKey);

    accountCards.forEach((card) => {
        const role = card.dataset.color;
        const title = card.querySelector('.card-title')?.textContent.trim() || role;
        const button = document.createElement('button');

        button.type = 'button';
        button.className = 'card-button';
        button.textContent = 'Select account';
        button.dataset.account = role;
        card.appendChild(button);

        button.addEventListener('click', () => {
            localStorage.setItem(storageKey, role);
            setSelectedAccount(role);
        });

        if (savedAccount === role) {
            setSelectedAccount(role);
        }

        function setSelectedAccount(selectedRole) {
            accountCards.forEach((accountCard) => {
                const isSelected = accountCard.dataset.color === selectedRole;
                accountCard.classList.toggle('selected', isSelected);

                const accountButton = accountCard.querySelector('.card-button');
                if (accountButton) {
                    accountButton.textContent = isSelected ? 'Selected' : 'Select account';
                }
            });

            let status = document.querySelector('.account-status');
            if (!status) {
                status = document.createElement('p');
                status.className = 'account-status';
                document.querySelector('main').prepend(status);
            }
            status.textContent = `Selected account: ${selectedRole}`;
            status.setAttribute('aria-live', 'polite');
        }
    });
});
