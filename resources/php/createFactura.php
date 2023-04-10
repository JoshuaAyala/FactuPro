

<?php
// Obtener los datos enviados desde el cliente
$factura = json_decode(file_get_contents("php://input"));

// Verificar si se pudo decodificar correctamente el JSON
if ($factura === null && json_last_error() !== JSON_ERROR_NONE) {
    // Enviar respuesta de error al cliente en formato JSON
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode(array("error" => "Los datos enviados no son válidos."));
    exit();
}

include_once("connection.php");

$stmt = $conn->prepare("INSERT INTO facturas (fecha, razon_social, RFC, direccion_fiscal, cantidad, upc, producto, precioUnitario, subtotal, iva, total) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssssissdddd", $factura->fecha, $factura->razon_social, $factura->RFC, $factura->direccion_fiscal, $factura->cantidad, $factura->upc, $factura->producto, $factura->precioUnitario, $factura->subtotal, $factura->iva, $factura->total);

// Ejecutar la consulta SQL
if ($stmt->execute()) {
    // Enviar respuesta al cliente en formato JSON
    header('Content-Type: application/json');
    echo json_encode(array("success" => true));
} else {
    // Enviar respuesta de error al cliente en formato JSON
    http_response_code(500);
    header('Content-Type: application/json');
    echo $stmt;
    echo json_encode(array("error" => $stmt));
    echo json_encode(array("error" => "$stmt Error al guardar la factura." + $stmt));
    echo $stmt;
}

// Cerrar la conexión a la base de datos
$stmt->close();
$conn->close();
?>