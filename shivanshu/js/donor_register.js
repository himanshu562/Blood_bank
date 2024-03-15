// registration.js

// Function to collect form data and format as CSV
function formatDataAsCSV() {
    var name = document.getElementById('name').value;
    var age = document.getElementById('age').value;
    var gender = document.getElementById('gender').value;
    var bloodGroup = document.getElementById('blood_group').value;
    
    var address = document.getElementById('address').value;
    var city = document.getElementById('city').value;    
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    // Add other form fields as needed

    // Format data as CSV string
    var csvData = name + ',' + age + ',' + gender + ',' + bloodGroup + '\n';
    // Add other form fields as needed

    return csvData;
}

// Function to create or append data to CSV file
function writeToCSV() {
    var csvData = formatDataAsCSV();

    // Create or append data to CSV file
    var file = new Blob([csvData], {type: 'text/csv'});
    var a = document.createElement('a');
    a.href = URL.createObjectURL(file);
    a.download = 'donor_data.csv';
    a.click();
}

// Function to submit form and write to CSV
function submitForm() {
    writeToCSV();
    // Add any additional submission logic here if needed
}
