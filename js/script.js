// js/script.js

document.addEventListener("DOMContentLoaded", () => {

    // ================= NAVIGATION =================
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => navLinks.classList.toggle("active"));
    }

    // ================= AUTH SYSTEM =================
    const authContainer = document.getElementById("authContainer");
    const loginModal = document.getElementById("loginModal");
    const closeModalBtn = document.getElementById("closeModalBtn");
    const mainLoginForm = document.getElementById("mainLoginForm");
    const socialSetupForm = document.getElementById("socialSetupForm");
    const loginErrorMessage = document.getElementById("loginErrorMessage");
    const setupErrorMessage = document.getElementById("setupErrorMessage");

    let isLoggedIn = localStorage.getItem("nova_logged_in") === "true";

    // Simulated Database
    let DATABASE = JSON.parse(localStorage.getItem("nova_users")) || {
        "admin@novabrew.com": { password: "password123", firstName: "Raj", initial: "R" }
    };

    function saveDatabase() {
        localStorage.setItem("nova_users", JSON.stringify(DATABASE));
    }

    function renderAuth() {
        if (!authContainer) return;

        if (isLoggedIn) {
            const user = JSON.parse(localStorage.getItem("active_user")) || { firstName: "Raj", initial: "R" };
            authContainer.innerHTML = `
                <div class="profile-wrapper" id="profileWrapper">
                    <div class="profile-avatar">${user.initial}</div>
                    <div class="profile-menu">
                        <p>Hi, ${user.firstName}!</p>
                        <a href="#">My Orders</a>
                        <a href="#">Settings</a>
                        <a href="#" id="logoutBtn">Log Out</a>
                    </div>
                </div>
            `;

            setTimeout(() => {
                const wrapper = document.getElementById("profileWrapper");
                const logoutBtn = document.getElementById("logoutBtn");

                if (wrapper) {
                    wrapper.addEventListener("click", (e) => {
                        e.stopPropagation();
                        wrapper.classList.toggle("active");
                    });
                }
                if (logoutBtn) {
                    logoutBtn.addEventListener("click", (e) => {
                        e.preventDefault();
                        localStorage.setItem("nova_logged_in", "false");
                        localStorage.removeItem("active_user");
                        isLoggedIn = false;
                        renderAuth();
                    });
                }
            }, 50);

        } else {
            authContainer.innerHTML = `<button class="login-text-btn" id="loginBtn">Log In</button>`;
            setTimeout(() => {
                document.getElementById("loginBtn")?.addEventListener("click", openLoginModal);
            }, 50);
        }
    }

    function openLoginModal() {
        if (checkLockoutStatus()) return;
        loginErrorMessage.style.display = "none";
        mainLoginForm.style.display = "flex";
        socialSetupForm.style.display = "none";
        loginModal.classList.add("open");
    }

    // Close Modal
    if (closeModalBtn) closeModalBtn.addEventListener("click", () => loginModal.classList.remove("open"));
    loginModal.addEventListener("click", (e) => {
        if (e.target === loginModal) loginModal.classList.remove("open");
    });

    // ================= LOGIN FORM =================
    if (mainLoginForm) {
        mainLoginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            if (checkLockoutStatus()) return;

            const email = document.getElementById("email_field").value.trim().toLowerCase();
            const password = document.getElementById("password_field").value;

            let attempts = parseInt(localStorage.getItem("auth_attempts") || "0");

            if (DATABASE[email] && DATABASE[email].password === password) {
                loginSuccess(DATABASE[email]);
            } else {
                attempts++;
                localStorage.setItem("auth_attempts", attempts);

                if (attempts >= 3) {
                    const lockTime = Date.now() + 16 * 60 * 1000;
                    localStorage.setItem("auth_lockout_time", lockTime);
                    loginErrorMessage.textContent = "Too many failed attempts. Account locked for 16 minutes.";
                } else {
                    loginErrorMessage.textContent = `Invalid credentials. Attempt ${attempts}/3`;
                }
                loginErrorMessage.style.display = "block";
            }
        });
    }

    function loginSuccess(userData) {
        localStorage.setItem("nova_logged_in", "true");
        localStorage.setItem("active_user", JSON.stringify(userData));
        localStorage.setItem("auth_attempts", "0");
        isLoggedIn = true;
        renderAuth();
        loginModal.classList.remove("open");
    }

    // ================= LOCKOUT CHECK =================
    function checkLockoutStatus() {
        const lockTime = localStorage.getItem("auth_lockout_time");
        if (!lockTime) return false;

        if (Date.now() < parseInt(lockTime)) {
            const remaining = Math.ceil((parseInt(lockTime) - Date.now()) / 60000);
            loginErrorMessage.textContent = `Account locked. Try again in ${remaining} minutes.`;
            loginErrorMessage.style.display = "block";
            return true;
        } else {
            localStorage.removeItem("auth_lockout_time");
            localStorage.setItem("auth_attempts", "0");
            return false;
        }
    }

    // ================= GOOGLE / APPLE =================
    const googleBtn = document.getElementById("googleAuthBtn");
    const appleBtn = document.getElementById("appleAuthBtn");

    function handleSocialLogin(platform) {
        if (checkLockoutStatus()) return;

        const simulatedEmail = "raj.sen@gmail.com"; // You can randomize if you want
        const existingUser = DATABASE[simulatedEmail];

        if (existingUser) {
            alert(`Welcome back via ${platform}!`);
            loginSuccess(existingUser);
        } else {
            // New user → Show setup form
            document.getElementById("oauthGeneratedCode").value = "NV-" + Math.floor(100000 + Math.random() * 900000);
            document.getElementById("socialSetupSubtitle").textContent = 
                `Verified via ${platform}. Please set your password to complete registration.`;

            mainLoginForm.style.display = "none";
            socialSetupForm.style.display = "flex";
        }
    }

    if (googleBtn) googleBtn.addEventListener("click", () => handleSocialLogin("Google"));
    if (appleBtn) appleBtn.addEventListener("click", () => handleSocialLogin("Apple"));

    // ================= SOCIAL SETUP FORM =================
    if (socialSetupForm) {
        socialSetupForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const newPass = document.getElementById("new_password").value;
            const repeatPass = document.getElementById("repeat_password").value;
            const email = "raj.sen@gmail.com"; // from simulation

            if (newPass !== repeatPass) {
                setupErrorMessage.textContent = "Passwords do not match!";
                setupErrorMessage.style.display = "block";
                return;
            }

            DATABASE[email] = {
                password: newPass,
                firstName: "Raj",
                initial: "R"
            };
            saveDatabase();

            alert("Account created successfully!");
            loginSuccess(DATABASE[email]);
        });
    }

    // Terms & Conditions
    const termsTrigger = document.getElementById("termsTrigger");
    if (termsTrigger) {
        termsTrigger.addEventListener("click", () => {
            alert("Nova Brew Terms & Conditions:\n\n1. You must be 13+ to use this service.\n2. Do not share your password.\n3. We respect your privacy.\n4. Repeated failed logins will temporarily lock your account for security.");
        });
    }

    // Initial Render
    renderAuth();
});