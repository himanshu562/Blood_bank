<?php
// Check if file is uploaded
if (isset($_FILES['pdfFile'])) {
  $fileName = $_FILES['pdfFile']['name'];
  $tempFilePath = $_FILES['pdfFile']['tmp_name'];
  $destination = 'uploads/' . $fileName; // Change upload directory as needed

  // Move the uploaded file to the destination folder
  if (move_uploaded_file($tempFilePath, $destination)) {
    // Prepare download link (replace with actual URL)
    $downloadLink = 'http://your-domain.com/uploads/' . $fileName;
    echo "File uploaded successfully. Download link: <a href='$downloadLink'>$downloadLink</a>";
  } else {
    echo "Error saving uploaded file.";
  }
} else {
  echo "No file uploaded.";
}
?>
