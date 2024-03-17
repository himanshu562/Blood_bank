document.addEventListener("DOMContentLoaded", function() {
    const donationForm = document.getElementById('donation-form');
    const unitPresentDiv = document.getElementById('unit-present');

    // Initialize or retrieve the donation data from localStorage
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

    donationForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission

        // Retrieve input values
        const amount = parseInt(document.getElementById('amount').value);
        const bloodGroup = document.getElementById('blood-group').value;

        // Update the amount for the respective blood group
        amountByBloodGroup[bloodGroup] += amount;

        // Save the updated donation data to localStorage
        localStorage.setItem('donationData', JSON.stringify(amountByBloodGroup));
        
        console.log('Updated donation data:', amountByBloodGroup);

        // Update the "Unit present" data for all blood groups
        updateUnitPresentData();
        alert('Blood donation added. Blood amount updated.');
    });

    // Function to update the "Unit present" data for all blood groups
    function updateUnitPresentData() {
        let unitPresentText = '';
        for (const bloodGroup in amountByBloodGroup) {
            unitPresentText += bloodGroup + ': ' + amountByBloodGroup[bloodGroup] + ' ml<br>';
        }
        unitPresentDiv.innerHTML = unitPresentText;
    }
});
