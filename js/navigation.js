(function () {
    const pages = [
        { label: 'Overview', href: 'index.html', icon: 'O' },
        { label: 'Inventory', href: 'Inventory.html', icon: 'I' },
        { label: 'Sales', href: 'Sales.html', icon: 'S' },
        { label: 'Purchases', href: 'Purchases.html', icon: 'P' },
        { label: 'Accounts', href: 'Accounts.html', icon: 'A' },
        { label: 'Debts & Credits', href: 'Debts_Credits.html', icon: 'D' },
        { label: 'Add Item', href: 'additem.html', icon: '+' }
    ];

    const currentPage = window.location.pathname.split('/').pop().toLowerCase() || 'index.html';
    const style = document.createElement('style');
    style.textContent = `
        :root {
            --navigation-ink: #f8fafc;
            --navigation-muted: #a7b3c4;
            --navigation-accent: #f5b942;
            --navigation-width: 248px;
        }

        body.has-app-navigation {
            padding-left: calc(var(--navigation-width) + 32px) !important;
        }

        .app-navigation {
            position: fixed;
            inset: 0 auto 0 0;
            z-index: 1000;
            width: var(--navigation-width);
            padding: 28px 16px;
            background: #17212b;
            color: var(--navigation-ink);
            box-shadow: 5px 0 24px rgba(15, 23, 42, 0.12);
            font-family: Arial, Helvetica, sans-serif;
        }

        .app-navigation__brand {
            display: block;
            padding: 4px 12px 28px;
            color: var(--navigation-ink);
            text-decoration: none;
        }

        .app-navigation__brand strong {
            display: block;
            color: var(--navigation-accent);
            font-size: 19px;
            letter-spacing: 0.02em;
        }

        .app-navigation__brand span {
            display: block;
            margin-top: 5px;
            color: var(--navigation-muted);
            font-size: 11px;
            letter-spacing: 0.13em;
            text-transform: uppercase;
        }

        .app-navigation__list {
            display: grid;
            gap: 6px;
            margin: 0;
            padding: 0;
            list-style: none;
        }

        .app-navigation__link {
            display: flex;
            align-items: center;
            gap: 12px;
            min-height: 44px;
            padding: 10px 12px;
            border-left: 3px solid transparent;
            border-radius: 6px;
            color: var(--navigation-muted);
            font-size: 14px;
            font-weight: 600;
            text-decoration: none;
            transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
        }

        .app-navigation__link:hover,
        .app-navigation__link[aria-current="page"] {
            border-left-color: var(--navigation-accent);
            background: #243342;
            color: var(--navigation-ink);
        }

        .app-navigation__icon {
            display: grid;
            width: 22px;
            height: 22px;
            place-items: center;
            color: var(--navigation-accent);
            font-size: 12px;
            font-weight: 700;
        }

        @media (max-width: 720px) {
            :root { --navigation-width: 72px; }

            body.has-app-navigation {
                padding-left: 88px !important;
            }

            .app-navigation {
                padding: 20px 10px;
            }

            .app-navigation__brand {
                padding: 4px 0 24px;
                text-align: center;
            }

            .app-navigation__brand strong {
                font-size: 14px;
            }

            .app-navigation__brand span,
            .app-navigation__link-label {
                display: none;
            }

            .app-navigation__link {
                justify-content: center;
                padding: 10px 4px;
            }
        }
    `;
    document.head.appendChild(style);

    const navigation = document.createElement('nav');
    navigation.className = 'app-navigation';
    navigation.setAttribute('aria-label', 'Main navigation');
    navigation.innerHTML = `
        <a class="app-navigation__brand" href="index.html">
            <strong>BiggFred</strong>
            <span>Enterprise</span>
        </a>
        <ul class="app-navigation__list">
            ${pages.map(page => `
                <li>
                    <a class="app-navigation__link" href="${page.href}" aria-label="${page.label}" title="${page.label}"${currentPage === page.href.toLowerCase() ? ' aria-current="page"' : ''}>
                        <span class="app-navigation__icon" aria-hidden="true">${page.icon}</span>
                        <span class="app-navigation__link-label">${page.label}</span>
                    </a>
                </li>
            `).join('')}
        </ul>
    `;

    document.body.classList.add('has-app-navigation');
    document.body.prepend(navigation);
})();
