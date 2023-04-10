/*
Proyecto: FactuPro hecho por Joshua Flores Ayala
Linkedin: https://www.linkedin.com/in/joshua-ayala-388b581b2/
Github: https://github.com/JoshuaAyala
Twitter: https://twitter.com/joshua4yala
*/


// Se buscan todos los elementos del documento que contengan la clase ".nav-link"
const navLinks = document.querySelectorAll('.nav-link');

// Añadir un event listener a cada botón
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    // Remover la clase active de todos los botones
    navLinks.forEach(link => {
      link.classList.remove('active');
    });
    // Agregar la clase active al botón clickeado
    link.classList.add('active');
  });
});

// Seleccionamos el elemento del botón de clientes
var btnClientes = document.getElementById('clientesbtn');

// Cuando el documento esté listo, se ejecutará la siguiente función
$(document).ready(function (e) {

  // Al hacer clic en el botón "Inicio", se cargará la página "home.html" en el elemento con ID "content"
  $('#inicio').click(function(){
    $('#content').attr('src', 'home.html');
  });

  // Al hacer clic en el botón "Factura", se cargará la página "facturas.html" en el elemento con ID "content"
  $('#factura').click(function(){
    $('#content').attr('src', 'facturas.html');
  });

  // Al hacer clic en el botón "Alta Factura", se cargará la página "altafacturas.html" en el elemento con ID "content"
  $('#altafactura').click(function(){
    $('#content').attr('src', 'altafacturas.html');
  });

  // Al hacer clic en el botón "Clientes", se cargará la página "clientes.html" en el elemento con ID "content"
  $('#clientes').click(function(){
    $('#content').attr('src', 'clientes.html');
  });

  // Al hacer clic en el botón "Alta Clientes", se cargará la página "altaclientes.html" en el elemento con ID "content"
  $('#altaclientes').click(function(){
    $('#content').attr('src', 'altaclientes.html');
  });
});
