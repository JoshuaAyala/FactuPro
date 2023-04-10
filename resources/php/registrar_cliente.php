
<?php
// Obtener los datos del cliente enviados por AJAX
$cliente = json_decode(file_get_contents("php://input"));

// Verificar si se pudo decodificar correctamente el JSON
if ($cliente === null && json_last_error() !== JSON_ERROR_NONE) {
  // Enviar respuesta de error al cliente en formato JSON
  http_response_code(400);
  header('Content-Type: application/json');
  echo json_encode(array("error" => "Los datos enviados no son válidos."));
  exit();
}

// Conectar a la base de datos
include_once("connection.php");

// Insertar el cliente en la base de datos
$query = "INSERT INTO clientes (nombre, rfc, clave_cliente, calle, num_ext, num_int, colonia, cp, poblacion, estado, direccion_fiscal, vendedor, descuento, credito) VALUES ('$cliente->razon_social', '$cliente->rfc', '$cliente->clave_cliente', '$cliente->calle', '$cliente->num_ext', '$cliente->num_int', '$cliente->colonia', '$cliente->cp', '$cliente->poblacion', '$cliente->estado', '$cliente->direccion_fiscal', '$cliente->vendedor', '$cliente->descuento', '$cliente->credito')";
$resultado = mysqli_query($conn, $query);

// Enviar la respuesta al cliente
if ($resultado) {
  $respuesta = array("message" => "Cliente registrado correctamente");
  echo json_encode($respuesta);
} else {
  $respuesta = array("message" => "Error al registrar el cliente");
  echo json_encode($respuesta);
}

// Cerrar la conexión a la base de datos
mysqli_close($conexion);
?>