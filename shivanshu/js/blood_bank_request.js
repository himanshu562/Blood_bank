document.addEventListener("DOMContentLoaded", function() {
    // Define a function to update the amount of blood for a specific blood group
    function updateBloodAmount(bloodGroup, requestedAmount) {
        // Retrieve the current amount of blood from localStorage
        let amountByBloodGroup = JSON.parse(localStorage.getItem('donationData')) || {
            'A+': 0,
            'A-': 0,
            'B+': 0,
            'B-': 0,
            'AB+': 0,
            'AB-': 0,
            'O+': 0,
            'O-': 0
        };

        // Subtract the requested amount from the current amount
        amountByBloodGroup[bloodGroup] -= requestedAmount;

        // Save the updated donation data to localStorage
        localStorage.setItem('donationData', JSON.stringify(amountByBloodGroup));

        // Log the updated amount to the console (optional)
        console.log('Updated amount for ' + bloodGroup + ': ' + amountByBloodGroup[bloodGroup]);
    }

    // Get the approve button element
    const approveButton = document.getElementById('approve-button');

    // Add event listener to the approve button
    approveButton.addEventListener('click', function() {
        // Retrieve the requested blood type and amount
        const requestedBloodType = document.getElementById('requested-blood-type').textContent.split(': ')[1];
        const requestedAmount = parseInt(document.getElementById('requested-amount').textContent.split(': ')[1].split(' ')[0]);

        // Update the blood amount for the requested blood type
        updateBloodAmount(requestedBloodType, requestedAmount);

        // Display a confirmation message (optional)
        alert('Blood donation request approved. Blood amount updated.');

        // Redirect to another page or perform any other actions as needed
        // window.location.href = 'next_page.html';
    });
});
