<?php
// Import the database configuration file
require_once 'db_config.php';

// Get the form data
$first_name = $_POST['first_name'];
$last_name  = $_POST['last_name'];
$email      = $_POST['email'];
$message    = $_POST['message'];

// Prepare the SQL statement
$sql = "INSERT INTO users (first_name, last_name, email, message) VALUES (?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
if ($stmt) {
    // Bind the form data to the prepared statement
    $stmt->bind_param("ssss", $first_name, $last_name, $email, $message);

    // Execute the prepared statement
    if ($stmt->execute()) {
        // Form submitted successfully
        echo 'Success!';
    } else {
        // Error inserting the form data
        echo 'Error: ' . $sql . '<br>' . $conn->error;
    }

    // Close the prepared statement
    $stmt->close();
} else {
    // Error preparing the SQL statement
    echo 'Error: ' . $conn->error;
}

// Close the database connection
$conn->close();
?>