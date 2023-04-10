/*
Proyecto: FactuPro hecho por Joshua Flores Ayala
Linkedin: https://www.linkedin.com/in/joshua-ayala-388b581b2/
Github: https://github.com/JoshuaAyala
Twitter: https://twitter.com/joshua4yala
*/


const formulario = document.querySelector('#formulario');
const templateFactura = document.querySelector('#templateFactura');
const templateCliente = document.querySelector('#templateCliente');
const cardFactura = document.querySelector('#cardFactura');

let cliente;
let factura;

function facturar() {
    event.preventDefault();

    // Obtener los datos del formulario o de donde sea necesario
    const noFact = document.getElementById('noFact').value;
    const dateFact = document.getElementById('dateFact').value;
    const razonSocial = document.getElementById('nombre').value;
    const RFCFactura = document.getElementById('rfc').value;
    const direccionFiscal = cliente.calle + " Ext. " + cliente.num_ext + " Int. " + cliente.num_int + ", " + cliente.colonia + ", " + cliente.poblacion + ", " + cliente.cp + ".";
    const upc = document.getElementById('upc').value;
    const cant = document.getElementById('cantidad').value;

    // Obtener la referencia a la plantilla en el DOM
    const template = document.querySelector('#templateFactura');

    // Clonar la plantilla
    const facturaTemplate = template.content.cloneNode(true);

    // Modificar los campos de la plantilla con los datos obtenidos
    facturaTemplate.querySelector('input[type="text"]').value = noFact;
    facturaTemplate.querySelector('input[type="date"]').value = dateFact;
    facturaTemplate.querySelector('#razonSocial').textContent = razonSocial;
    facturaTemplate.querySelector('#RFCFactura').textContent = RFCFactura;
    facturaTemplate.querySelector('#direccionFiscal').textContent = direccionFiscal;
    facturaTemplate.querySelector('#cant').textContent = cant;
    facturaTemplate.querySelector('tr td:nth-child(2)').textContent = upc;
    facturaTemplate.querySelector('#descripcion').textContent = productDescription;
    facturaTemplate.querySelector('#preciounitario').textContent = productPriceUnit;
    const preciototalproduct = cant * productPriceUnit;
    facturaTemplate.querySelector('#preciototalproduct').textContent = cant * productPriceUnit;
    const productIVA = preciototalproduct * 0.08;
    facturaTemplate.querySelector('#productIVA').textContent = productIVA;
    facturaTemplate.querySelector('#productTotal').textContent = preciototalproduct + productIVA;
    // Insertar la factura en el DOM
    document.getElementById('facturas').appendChild(facturaTemplate);

    // Se crea objeto factura con todos los elementos de los inputs requeridos para registrar la factura
    factura = {
        fecha: document.querySelector('input[type="date"]').value,
        razon_social: document.querySelector("#razonSocial").textContent,
        RFC: document.querySelector("#RFCFactura").textContent,
        direccion_fiscal: document.querySelector("#direccionFiscal").textContent,
        cantidad: parseInt(document.querySelector("#cantidad").value),
        upc: document.querySelector('tr td:nth-child(2)').textContent,
        producto: document.querySelector("#descripcion").textContent,
        precioUnitario: parseFloat(document.querySelector("#preciounitario").value),
        subtotal: parseFloat(document.querySelector('#preciototalproduct').textContent),
        iva: parseFloat(document.querySelector('#productIVA').textContent),
        total: parseFloat(document.querySelector("#productTotal").textContent)
    };
    fetch("../factupro/resources/php/createFactura.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(factura)
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Error en la respuesta de red");
            }
            return response.json();
        })
        .then((data) => {
            console.log("Factura guardada:", data);
            correctFacturar()
        })
        .catch((error) => {
            console.error("Error al guardar la factura:", error);
        });
}


function buscarCliente(claveCliente) {
    const xhttp = new XMLHttpRequest();

    // Configurar la solicitud
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // Manejar la respuesta
            console.log(this.responseText)
            cliente = JSON.parse(this.responseText);
            // Crear variables para cada elemento
            document.getElementById("rfc").value = cliente.rfc;
            document.getElementById("nombre").value = cliente.nombre;
            document.getElementById("vendedor").value = cliente.vendedor;
            document.getElementById("descuento").value = cliente.descuento;
            document.getElementById("calle").value = cliente.calle;
            document.getElementById("numExt").value = cliente.num_ext;
            document.getElementById("numInt").value = cliente.num_int;
            document.getElementById("colonia").value = cliente.colonia;
            document.getElementById("poblacion").value = cliente.poblacion;
            document.getElementById("cp").value = cliente.cp;
        }
    };
    xhttp.open("GET", "../factupro/resources/php/buscar_cliente.php?claveCliente=" + claveCliente, true);

    xhttp.send();
}

//fecha actual en alta de facturas
document.getElementById("dateFact").value = new Date().toISOString().slice(0, 10);

let inputUPC = document.querySelector("#upc");
let productDescription;
let inputDescripcion = document.querySelector("#descripcion");
let productPriceUnit;
let inputPrecioUnitario = document.querySelector("#preciounitario");

inputUPC.addEventListener("input", () => {
    const url = `../factupro/resources/php/verificar_producto.php?upc=${inputUPC.value}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.descripcion && data.precioUnitario) {
                productDescription = data.descripcion;
                productPriceUnit = data.precioUnitario;
                inputPrecioUnitario.value = data.precioUnitario;
            }
        })
        .catch(error => console.error(error));
});

function limpiar() {
    // Limpia inputs de la creacion de facturas
    document.getElementById('claveCliente').value = '';
    document.getElementById('rfc').value = '';
    document.getElementById('nombre').value = '';
    document.getElementById('vendedor').value = '';
    document.getElementById('descuento').value = '0.00';
    document.getElementById('calle').value = '';
    document.getElementById('numExt').value = '';
    document.getElementById('numInt').value = '';
    document.getElementById('colonia').value = '';
    document.getElementById('poblacion').value = '';
    document.getElementById('cp').value = '';
    document.getElementById('cantidad').value = '';
    document.getElementById('upc').value = '';
    document.getElementById('preciounitario').value = '';

}

function descargarPDF() {
    // Obtener el elemento a guardar como PDF
    const elementToSave = document.getElementById('factura-generada');

    // Crear un lienzo para dibujar el elemento
    html2canvas(elementToSave).then(function (canvas) {
        // Crear un objeto de documento PDF
        const doc = new jsPDF();

        // Convertir el lienzo a una imagen en formato JPEG y agregarlo al documento PDF
        const imgData = canvas.toDataURL('image/jpeg');
        doc.addImage(imgData, 'JPEG', 10, 10, 180, 240, '', 'FAST');
        
        // Guardar el documento PDF en el disco
        doc.save(factura.razon_social + ' ' + factura.fecha + '.pdf');
    });

}

function correctFacturar() {
    const mensaje = "La factura se ha registrado correctamente."
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