
<?php
// Establecer conexión a la base de datos
include_once("connection.php");

$upc = isset($_GET['upc']) ? $_GET['upc'] : null;

// Consultar la base de datos
$sql = "SELECT * FROM productos WHERE upc='$upc'";
$result = $conn->query($sql);

// Verificar si se encontró un registro
if ($result->num_rows > 0) {
  // Obtener el registro
  $row = $result->fetch_assoc();
  // Devolver el resultado como JSON
  header('Content-Type: application/json');
  echo json_encode($row);
} else {
  echo "No se encontró ningún registro.";
}

$conn->close();
?>