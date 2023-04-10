/*
Proyecto: FactuPro hecho por Joshua Flores Ayala
Linkedin: https://www.linkedin.com/in/joshua-ayala-388b581b2/
Github: https://github.com/JoshuaAyala
Twitter: https://twitter.com/joshua4yala
*/


// Obtener el elemento tbody donde se mostrarán las facturas
const facturasLista = document.getElementById("facturas-lista");

// Función para obtener las facturas de la BD y mostrarlas en la tabla
function mostrarFacturas() {
  // Petición AJAX para obtener las facturas de la BD
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "resources/php/verFacturas.php", true);
  xhr.onload = function () {
    if (this.status === 200) {
      const facturas = JSON.parse(this.responseText);
      // Generar las filas con los datos de las facturas
      let html = "";
      facturas.forEach((factura) => {
        html += `
          <tr>
            <td>${factura.id}</td>
            <td>${factura.razon_social}</td>
            <td>${factura.fecha}</td>
            <td>$ ${factura.precioUnitario}</td>
            <td>$ ${factura.total}</td>
          </tr>
        `;
      });
      facturasLista.innerHTML = html;
    }
  };
  xhr.send();
}

// Llamar a la función para mostrar las facturas al cargar la página
mostrarFacturas();
