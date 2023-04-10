
<?php

// Conectar a la base de datos
include_once("connection.php");

// Obtener claveCliente de la consulta GET
$claveCliente = isset($_GET['claveCliente']) ? $_GET['claveCliente'] : null;

if ($claveCliente) {
    // Resto del código
} else {
    echo 'Error: claveCliente no está definido en la URL';
}
// Consultar la base de datos
$sql = "SELECT * FROM clientes WHERE clave_cliente='$claveCliente'";
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