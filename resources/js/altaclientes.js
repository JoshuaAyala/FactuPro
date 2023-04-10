/*
Proyecto: FactuPro hecho por Joshua Flores Ayala
Linkedin: https://www.linkedin.com/in/joshua-ayala-388b581b2/
Github: https://github.com/JoshuaAyala
Twitter: https://twitter.com/joshua4yala
*/
let cliente;

function registrarCliente() {
    // Un try-catch para asegurarnos que todo funcione bien
    try {
        // Se recogen los datos de los inputs
        const razon_social = document.getElementById("nombre").value;
        const rfc = document.getElementById("rfc").value;
        const clave_cliente = document.getElementById("claveCliente").value;
        const calle = document.getElementById("calle").value;
        const num_ext = document.getElementById("numExt").value;
        const num_int = document.getElementById("numInt").value;
        const colonia = document.getElementById("colonia").value;
        const cp = document.getElementById("cp").value;
        const poblacion = document.getElementById("poblacion").value;
        const estado = document.getElementById("estado").value;
        const vendedor = document.getElementById("vendedor").value;
        const descuento = document.getElementById("descuento").value;
        const credito = document.getElementById("credito").value;
        const direccionFiscal = calle + " Ext. " + num_ext + " Int. " + num_int + ", " + colonia + ", " + poblacion + ", " + cp + ".";
        // Crear un objeto con los datos del cliente
        cliente = {
            razon_social: razon_social,
            rfc: rfc,
            clave_cliente: clave_cliente,
            calle: calle,
            num_ext: num_ext,
            num_int: num_int,
            colonia: colonia,
            cp: cp,
            poblacion: poblacion,
            estado: estado,
            direccion_fiscal: direccionFiscal,
            vendedor: vendedor,
            descuento: descuento,
            credito: credito,
        };
        // Enviar los datos del cliente al servidor PHP utilizando fetch
        // fetch recibe dos argumentos, la URL del archivo PHP y un objeto de opciones de configuración
        fetch('resources/php/registrar_cliente.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cliente)
        })
            // Después de enviar la petición, se realiza un chequeo de la respuesta devuelta por el servidor
            // Si la respuesta es distinta de 200, se lanza un error
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error en la respuesta de red");
                }
                // Si la respuesta es correcta, se convierte la respuesta en formato JSON
                return response.json();
            })
            // Una vez convertida la respuesta en formato JSON, se realiza una acción con los datos recibidos
            // En este caso se imprime un mensaje en la consola y se llama a la función limpiar()
            .then(data => {
                console.log(data.message);
                limpiar();
            })
            // Si ocurre algún error en el proceso, se imprime un mensaje de error en la consola
            .catch(error => {
                console.error('Error al registrar el cliente', error);
            });
        correctRegister(cliente.razon_social)
        limpiar()
    } catch (error) {
        console.log(error)
        alert(error)
    }
}

function limpiar() {
    // Se limpian los inputs
    document.getElementById("nombre").value = "";
    document.getElementById("rfc").value = "";
    document.getElementById("claveCliente").value = "";
    document.getElementById("calle").value = "";
    document.getElementById("numExt").value = "";
    document.getElementById("numInt").value = "";
    document.getElementById("colonia").value = "";
    document.getElementById("cp").value = "";
    document.getElementById("poblacion").value = "";
    document.getElementById("estado").value = "";
    document.getElementById("vendedor").value = "";
    document.getElementById("descuento").value = "";
    document.getElementById("credito").value = "";
}


function correctRegister(cliente) {
    const mensaje = "El cliente "+ cliente + " ha registrado correctamente."
    const mensajeContenedor = document.getElementById('mensaje');

  // Crear el HTML del mensaje
  const mensajeHTML = `
    <div class="alert alert-success alert-dismissible fade show position-absolute top-0 end-0 me-3" style="width: 30%; " role="alert">
      ${mensaje}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `;

  // Agregar el HTML al contenedor
  mensajeContenedor.innerHTML = mensajeHTML;

  // Esperar 3 segundos y luego ocultar el mensaje
  setTimeout(() => {
    mensajeContenedor.innerHTML = '';
  }, 3000);
}