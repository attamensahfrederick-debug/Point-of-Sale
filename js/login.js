document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    const emailOrPhoneInput = document.getElementById('emailOrPhone');
    const passwordInput = document.getElementById('password');
    const submitButton = form?.querySelector('.sign-in-btn');

    if (!form || !emailOrPhoneInput || !passwordInput || !submitButton) {
        return;
    }

    const messageBox = document.createElement('div');
    messageBox.className = 'form-message';
    messageBox.setAttribute('aria-live', 'polite');
    form.insertBefore(messageBox, submitButton);

    function setMessage(message, type = 'error') {
        messageBox.textContent = message;
        messageBox.className = `form-message ${type}`;
    }

    function validateForm() {
        const emailOrPhone = emailOrPhoneInput.value.trim();
        const password = passwordInput.value.trim();

        if (!emailOrPhone || !password) {
            setMessage('Please enter your e-mail/phone and password.', 'error');
            return false;
        }

        if (password.length < 6) {
            setMessage('Password must be at least 6 characters long.', 'error');
            return false;
        }

        setMessage('', 'success');
        return true;
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        const user = {
            emailOrPhone: emailOrPhoneInput.value.trim(),
            password: passwordInput.value.trim(),
            loggedInAt: new Date().toISOString()
        };

        localStorage.setItem('loggedInUser', JSON.stringify(user));
        localStorage.setItem('isAuthenticated', 'true');

        submitButton.disabled = true;
        submitButton.textContent = 'Signing in...';
        setMessage('Login successful. Redirecting...', 'success');

        setTimeout(() => {
            window.location.href = 'index.html';
        }, 700);
    });
});
