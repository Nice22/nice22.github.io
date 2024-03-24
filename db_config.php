<?php
// Define the database connection
$conn = new mysqli('localhost', 'myUsername', 'myPassword', 'form');

// Check for errors
if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
}