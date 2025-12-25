// Authentication System for ChemPilot Admin
class AuthSystem {
    constructor() {
        this.currentUser = null;
        this.isLoggedIn = false;
        this.init();
    }

    init() {
        // Check if user is already logged in
        this.checkAuthState();
    }

    // Check authentication state from localStorage
    checkAuthState() {
        const userData = localStorage.getItem('chemPilotAdmin');
        const loginTime = localStorage.getItem('chemPilotLoginTime');
        
        if (userData && loginTime) {
            const loginDuration = Date.now() - parseInt(loginTime);
            const maxSessionDuration = 24 * 60 * 60 * 1000; // 24 hours
            
            if (loginDuration < maxSessionDuration) {
                this.currentUser = JSON.parse(userData);
                this.isLoggedIn = true;
                
                // Auto-extend session
                localStorage.setItem('chemPilotLoginTime', Date.now().toString());
            } else {
                this.logout();
            }
        }
    }

    // Login method
    async login(username, password, rememberMe = false) {
        try {
            // Show loading state
            this.showLoading(true);

            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Validate credentials (in production, this would be a server-side check)
            const isValid = await this.validateCredentials(username, password);

            if (isValid) {
                const userData = {
                    username: username,
                    role: 'admin',
                    loginTime: new Date().toISOString(),
                    permissions: ['manage_api', 'manage_data', 'manage_users', 'view_analytics']
                };

                // Store user data
                this.currentUser = userData;
                this.isLoggedIn = true;

                // Store in localStorage
                localStorage.setItem('chemPilotAdmin', JSON.stringify(userData));
                localStorage.setItem('chemPilotLoginTime', Date.now().toString());

                if (rememberMe) {
                    localStorage.setItem('chemPilotRememberMe', 'true');
                }

                this.showLoading(false);
                return { success: true, user: userData };
            } else {
                this.showLoading(false);
                return { success: false, error: 'Invalid username or password' };
            }
        } catch (error) {
            this.showLoading(false);
            return { success: false, error: 'Login failed. Please try again.' };
        }
    }

    // Validate credentials (in production, this would call your backend)
    async validateCredentials(username, password) {
        // Default admin credentials (in production, use secure authentication)
        const validCredentials = [
            { username: 'admin', password: 'ChemPilot2024!' },
            { username: 'chempilot', password: 'Admin123!' }
        ];

        return validCredentials.some(cred => 
            cred.username === username && cred.password === password
        );
    }

    // Logout method
    logout() {
        this.currentUser = null;
        this.isLoggedIn = false;
        
        // Clear stored data
        localStorage.removeItem('chemPilotAdmin');
        localStorage.removeItem('chemPilotLoginTime');
        
        // Redirect to login page
        window.location.href = 'login.html';
    }

    // Check if user has specific permission
    hasPermission(permission) {
        return this.isLoggedIn && 
               this.currentUser && 
               this.currentUser.permissions.includes(permission);
    }

    // Get current user
    getCurrentUser() {
        return this.currentUser;
    }

    // Show/hide loading state
    showLoading(show) {
        const loginBtn = document.querySelector('.login-btn');
        if (loginBtn) {
            if (show) {
                loginBtn.disabled = true;
                loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing In...';
            } else {
                loginBtn.disabled = false;
                loginBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Sign In';
            }
        }
    }

    // Protect routes - redirect to login if not authenticated
    protectRoute() {
        if (!this.isLoggedIn) {
            window.location.href = 'login.html';
            return false;
        }
        return true;
    }
}

// Initialize global auth instance
window.authSystem = new AuthSystem();