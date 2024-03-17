document.addEventListener("DOMContentLoaded", function() {
    const registrationForm = document.getElementById('registrationForm');
    const messageDiv = document.getElementById('message');

    if (registrationForm && messageDiv) { // Ensure both elements are found
        registrationForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent form submission

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Check if username is already taken
            if (localStorage.getItem(username)) {
                messageDiv.textContent = 'Username already exists. Please choose a different one.';
                return;
            }

            // Store data in localStorage
            localStorage.setItem(username, JSON.stringify({ username: username, password: password }));

            messageDiv.textContent = 'Registration successful.';
        });
    } else {
        console.error("Couldn't find registrationForm or messageDiv");
    }
});
