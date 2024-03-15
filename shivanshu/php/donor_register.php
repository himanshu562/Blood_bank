<?php
// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Database connection
    $servername = "localhost";
    $username = "root";
    $password = "root";
    $dbname = "blood_bank";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Get form data
    $name = $_POST['name'];
    $age = $_POST['age'];
    $gender = $_POST['gender'];
    $blood_group = $_POST['blood_group'];
    $address = $_POST['address'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $city = $_POST['city'];
    // Add other form fields as needed

    // Prepare SQL statement
    $stmt = $conn->prepare("INSERT INTO donors (name, age, gender, blood_group, address, city, email, password) VALUES (?, ?, ?, ?,?,?,?,?)");
    $stmt->bind_param("siss", $name, $age, $gender, $blood_group, $address,$city,$email,$password);

    // Execute SQL statement
    if ($stmt->execute() === TRUE) {
        echo "New record created successfully";
        header("Location: ../html/donor_login.html");
        exit();
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    // Close connection
    $stmt->close();
    $conn->close();
}
?>
