document.addEventListener("DOMContentLoaded", function() {
    // Retrieve the donation data from localStorage
    const amountByBloodGroup = JSON.parse(localStorage.getItem('donationData')) || {
        'A+': 0,
        'A-': 0,
        'B+': 0,
        'B-': 0,
        'AB+': 0,
        'AB-': 0,
        'O+': 0,
        'O-': 0
    };

    // Update the table cells with the corresponding unit present values
    for (const bloodGroup in amountByBloodGroup) {
        const unitsPresentCell = document.getElementById(bloodGroup + '_units');
        if (unitsPresentCell) {
            unitsPresentCell.textContent = amountByBloodGroup[bloodGroup] + ' ml';
        }
    }
});
