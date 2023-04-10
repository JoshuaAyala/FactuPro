<?php
// Conexión a la base de datos
include_once("connection.php");


// Consulta de las facturas
$sql = "SELECT * FROM facturas";
$result = mysqli_query($conn, $sql);

// Creación del array de facturas
$facturas = array();
while($row = mysqli_fetch_assoc($result)) {
    $facturas[] = $row;
}

// Devolución de las facturas en formato JSON
header('Content-Type: application/json');
echo json_encode($facturas);

// Cierre de la conexión a la base de datos
mysqli_close($conn);
?>