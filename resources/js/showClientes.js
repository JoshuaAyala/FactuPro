/*
Proyecto: FactuPro hecho por Joshua Flores Ayala
Linkedin: https://www.linkedin.com/in/joshua-ayala-388b581b2/
Github: https://github.com/JoshuaAyala
Twitter: https://twitter.com/joshua4yala
*/


// Obtener el elemento tbody donde se mostrarán las facturas
const clientesLista = document.getElementById("clientes-lista");

// Función para obtener las facturas de la BD y mostrarlas en la tabla
function mostrarClientes() {
  // Petición AJAX para obtener las facturas de la BD
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "resources/php/verClientes.php", true);
  xhr.onload = function () {
    if (this.status === 200) {
      const clientes = JSON.parse(this.responseText);
      // Generar las filas con los datos de las facturas
      let html = "";
      console.log(clientes)
      clientes.forEach((cliente) => {
        html += `
          <tr>
            <td>${cliente.clave_cliente}</td>
            <td>${cliente.nombre}</td>
            <td>${cliente.rfc}</td>
            <td>${cliente.direccion_fiscal}</td>
            <td>${cliente.vendedor}</td>
          </tr>
        `;
      });
      clientesLista.innerHTML = html;
    }
  };
  xhr.send();
}

// Llamar a la función para mostrar las facturas al cargar la página
mostrarClientes();
