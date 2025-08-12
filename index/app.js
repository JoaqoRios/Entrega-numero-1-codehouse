

let total = 0;
let prendaelegida = [];
let carrito = [];

const formDatos = document.getElementById('formDatos');
const seleccionPrendas = document.getElementById('seleccionPrendas');
const metodoPagoDiv = document.getElementById('metodoPago');
const resumenDiv = document.getElementById('resumen');
const resultadoDiv = document.getElementById('resultado');

formDatos.addEventListener('submit', function(e) {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const edad = document.getElementById('edad').value;
    resumenDiv.innerHTML = `Tus datos:<br>Nombre: ${nombre}<br>Apellido: ${apellido}<br>Edad: ${edad}`;
    formDatos.style.display = 'none';
    seleccionPrendas.style.display = 'block';
});

document.getElementById('continuarPago').addEventListener('click', function() {
    total = 0;
    prendaelegida = [];
    carrito = [];
    const checks = seleccionPrendas.querySelectorAll('input[type="checkbox"]:checked');
    checks.forEach(chk => {
        prendaelegida.push(chk.value);
        carrito.push({
            nombre: chk.value,
            precio: Number(chk.dataset.precio),
            cantidad: 1
        });
        total += Number(chk.dataset.precio);
    });
    seleccionPrendas.style.display = 'none';
    metodoPagoDiv.style.display = 'block';
});

document.getElementById('finalizarCompra').addEventListener('click', function() {
    const metodoPago = document.getElementById('pago').value;
    let mensajePago = '';
    if (metodoPago === '1') {
        total = total * 0.9;
        mensajePago = '10% de descuento por pago en efectivo/transferencia.';
    } else if (metodoPago === '2') {
        total = total * 1.2;
        mensajePago = '20% de recargo por pago con tarjeta de crédito.';
    } else {
        mensajePago = 'Pago con tarjeta de débito (sin recargo).';
    }
    metodoPagoDiv.style.display = 'none';
    resumenDiv.innerHTML += `<br><br>${mensajePago}<br>Total: $${total}<br>Prendas elegidas: ${prendaelegida.join(', ')}`;
   
    // gguardar en localstorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
});

// DOM y JSON descuentos y carrito

document.getElementById('verDescuentos').addEventListener('click', () => {
    let carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];
    let productosConDescuento = carritoGuardado.filter(producto => producto.precio < 30000);
    if (productosConDescuento.length === 0) {
        resultadoDiv.innerHTML = '<p>No hay productos con descuento.</p>';
    } else {
        resultadoDiv.innerHTML = '<h3>Productos con descuento:</h3>' +
            productosConDescuento.map(prod =>
                `<p>${prod.nombre} - $${prod.precio} x ${prod.cantidad}</p>`
            ).join('');
    }
});

document.getElementById('verCarrito').addEventListener('click', () => {
    let carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];
    if (carritoGuardado.length === 0) {
        resultadoDiv.innerHTML = '<p>El carrito está vacío.</p>';
    } else {
        resultadoDiv.innerHTML = '<h3>Carrito:</h3>' +
            carritoGuardado.map(prod =>
                `<p>${prod.nombre} - $${prod.precio} x ${prod.cantidad}</p>`
            ).join('');
    }
});
    
// funciones de orden superior:

//forEach: para recorrer y ejecutar algo por cada elemento.
//map: para crear un nuevo array transformando cada elemento.
//filter: para crear un nuevo array solo con los elementos que cumplen una condición.
//reduce: para acumular un valor a partir de los elementos del array.
//find: para buscar el primer elemento que cumpla una condición.









