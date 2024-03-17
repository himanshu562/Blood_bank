document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById('loginForm');
    const messageDiv = document.getElementById('message');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Retrieve stored user data from localStorage
        const userData = localStorage.getItem(username);

        if (userData) {
            const storedData = JSON.parse(userData);

            // Check if password matches
            if (password === storedData.password) {
                messageDiv.textContent = 'Login successful.';
                window.location.href = 'donor_profile.html';
            } else {
                messageDiv.textContent = 'Incorrect password. Please try again.';
            }
        } else {
            messageDiv.textContent = 'User not found. Please register first.';
        }
    });

    const loginButton = document.getElementById('loginButton');
    loginButton.addEventListener('click', function() {
        // Just a placeholder message
        messageDiv.textContent = 'Please submit the login form.';
    });
});
