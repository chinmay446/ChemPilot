// Login Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const messageDiv = document.getElementById('login-message');
    const rememberMe = document.getElementById('remember-me');

    // Check if user is already logged in
    if (window.authSystem.isLoggedIn) {
        redirectToDashboard();
    }

    // Load remembered username if exists
    loadRememberedUser();

    // Form submission
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // Basic validation
        if (!username || !password) {
            showMessage('Please enter both username and password', 'error');
            return;
        }

        // Attempt login
        const result = await window.authSystem.login(username, password, rememberMe.checked);
        
        if (result.success) {
            showMessage('Login successful! Redirecting...', 'success');
            setTimeout(redirectToDashboard, 1000);
        } else {
            showMessage(result.error, 'error');
        }
    });

    // Enter key support
    document.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            loginForm.dispatchEvent(new Event('submit'));
        }
    });

    function showMessage(message, type) {
        messageDiv.textContent = message;
        messageDiv.className = `message ${type}`;
        messageDiv.classList.remove('hidden');
        
        // Auto-hide success messages
        if (type === 'success') {
            setTimeout(() => {
                messageDiv.classList.add('hidden');
            }, 3000);
        }
    }

    function redirectToDashboard() {
        window.location.href = 'dashboard.html';
    }

    function loadRememberedUser() {
        if (localStorage.getItem('chemPilotRememberMe') === 'true') {
            const savedUser = localStorage.getItem('chemPilotUsername');
            if (savedUser) {
                document.getElementById('username').value = savedUser;
                rememberMe.checked = true;
            }
        }
    }
});