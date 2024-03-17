document.addEventListener("DOMContentLoaded", function() {
    const donorDetailForm = document.getElementById('donor-detail-form');

    donorDetailForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission

        // Retrieve form data
        const amount = document.getElementById('amount').value;
        const bloodGroup = document.getElementById('blood-group').value;
        const okayWithTransfusion = document.getElementById('transfusion').checked;

        // Create a request object
        const request = {
            amount: amount,
            bloodGroup: bloodGroup,
            okayWithTransfusion: okayWithTransfusion
        };

        // Retrieve existing requests from localStorage or initialize as an empty array
        let requests = JSON.parse(localStorage.getItem('requests')) || [];

        // Add the new request to the array
        requests.push(request);

        // Save the updated requests back to localStorage
        localStorage.setItem('requests', JSON.stringify(requests));

        // Optionally, you can display a confirmation message
        alert('Request submitted successfully.');

        // Optionally, redirect to another page
        // window.location.href = 'next_page.html';
    });
});