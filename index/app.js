
// Secciones del menú

const secciones = {
  inicio: document.getElementById('inicio'),
  ropa: document.getElementById('ropa'),
  accesorios: document.getElementById('accesorios'),
  sale: document.getElementById('sale')
};

// Mostrar solo la sección correspondiente al hacer clic
document.querySelectorAll('.menu a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = link.textContent.toLowerCase();

    Object.keys(secciones).forEach(key => {
      secciones[key].style.display = (key === target) ? 'grid' : 'none';
    });
  });
});


// Variables del carrito

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
const botonesComprar = document.querySelectorAll('.btn-comprar');
const modal = document.getElementById('modalCarrito');
const abrirCarritoBtn = document.getElementById('abrirCarrito');
const cerrarCarritoBtn = document.getElementById('cerrarCarrito');
const listaCarrito = document.getElementById('lista-carrito');
const totalElemento = document.getElementById('total');
const finalizarCompra = document.getElementById('finalizarCompra');
const contadorCarrito = document.getElementById('contadorCarrito');


// Funciones carrito

function actualizarContador() {
  let totalProductos = carrito.reduce((sum, item) => sum + item.cantidad, 0);
  contadorCarrito.textContent = totalProductos;
}

function actualizarCarrito() {
  listaCarrito.innerHTML = '';
  let total = 0;

  carrito.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="info-producto">
        <span>${item.nombre}</span>
        <span>$${(item.precio * item.cantidad).toLocaleString()}</span>
      </div>
      <div class="acciones">
        <button class="btn-cantidad" onclick="cambiarCantidad(${index}, -1)">−</button>
        <span class="cantidad">${item.cantidad}</span>
        <button class="btn-cantidad" onclick="cambiarCantidad(${index}, 1)">+</button>
        <button class="btn-eliminar" onclick="eliminarProducto(${index})">Eliminar</button>
      </div>
    `;
    listaCarrito.appendChild(li);
    total += item.precio * item.cantidad;
  });

  totalElemento.textContent = `Total: $${total.toLocaleString()}`;
  actualizarContador();
}

function cambiarCantidad(index, cambio) {
  if (cambio === 1 && carrito[index].cantidad < carrito[index].stock) carrito[index].cantidad++;
  else if (cambio === -1 && carrito[index].cantidad > 1) carrito[index].cantidad--;
  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarCarrito();
}

function eliminarProducto(index) {
  carrito.splice(index, 1);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarCarrito();
}


// Eventos carrito

botonesComprar.forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.parentElement;
    const nombre = card.getAttribute('data-nombre');
    const precio = Number(card.getAttribute('data-precio'));
    const stock = Number(card.getAttribute('data-stock')) || 99;

    const itemExistente = carrito.find(item => item.nombre === nombre);
    if (itemExistente) {
      if (itemExistente.cantidad < itemExistente.stock) itemExistente.cantidad++;
      else Swal.fire("Sin stock", "No quedan más unidades disponibles", "warning");
    } else {
      carrito.push({ nombre, precio, cantidad: 1, stock });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();

    contadorCarrito.classList.remove('rebote');
    void contadorCarrito.offsetWidth;
    contadorCarrito.classList.add('rebote');
  });
});

abrirCarritoBtn.addEventListener('click', () => {
  if (carrito.length === 0) {
    Swal.fire({ icon: 'warning', title: 'Carrito vacío', text: 'No hay productos en el carrito', confirmButtonColor: '#253681' });
    return;
  }
  modal.style.display = 'block';
});

cerrarCarritoBtn.addEventListener('click', () => modal.style.display = 'none');
window.addEventListener('click', e => { if (e.target === modal) modal.style.display = 'none'; });


// Finalizar compra

finalizarCompra.addEventListener('click', () => {
  if (carrito.length === 0) {
    Swal.fire({ icon: 'warning', title: 'Carrito vacío', text: 'No hay productos en el carrito', confirmButtonColor: '#253681' });
    return;
  }

  const contenedorPago = document.getElementById('metodoPagoContenedor');
  contenedorPago.style.display = 'flex';

  if (finalizarCompra.dataset.confirmar !== "true") {
    finalizarCompra.textContent = "Confirmar pago";
    finalizarCompra.dataset.confirmar = "true";
    return;
  }

  let metodoSeleccionado = document.querySelector('input[name="metodoPago"]:checked');
  if (!metodoSeleccionado) {
    Swal.fire({ icon: 'error', title: 'Método no seleccionado', text: 'Seleccioná un método de pago antes de continuar.', confirmButtonColor: '#253681' });
    return;
  }

  let valorPago = metodoSeleccionado.value;
  let total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
  let mensajePago = '';

  if (valorPago === '1') { total *= 0.9; mensajePago = '10% de descuento por pago en efectivo/transferencia.'; }
  else if (valorPago === '2') { total *= 1.2; mensajePago = '20% de recargo por pago con tarjeta de crédito.'; }
  else mensajePago = 'Pago con tarjeta de débito (sin recargo).';

  Swal.fire({
    icon: 'success',
    title: '¡Compra realizada!',
    html: `<p>${carrito.map(item => `${item.nombre} x ${item.cantidad} = $${item.precio * item.cantidad}`).join('<br>')}</p>
           <p>${mensajePago}</p>
           <p><strong>Total a pagar: $${total.toFixed(2)}</strong></p>`,
    confirmButtonColor: '#253681',
    confirmButtonText: 'Aceptar'
  });

  carrito = [];
  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarCarrito();
  modal.style.display = 'none';
  finalizarCompra.textContent = "Finalizar compra";
  finalizarCompra.dataset.confirmar = "false";
  contenedorPago.style.display = 'none';
});


// Suscribirse a novedades

document.getElementById('suscribirseNovedades').addEventListener('click', () => {
  Swal.fire({
    title: '¡Suscríbete a las novedades!',
    text: 'Ingresa tu correo electrónico para recibir ofertas y noticias:',
    input: 'email',
    inputPlaceholder: 'tuemail@ejemplo.com',
    confirmButtonText: 'Suscribirme',
    showCancelButton: true,
    cancelButtonText: 'Cancelar',
    inputValidator: (value) => { if (!value) return 'Debes ingresar un correo válido'; }
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire('¡Gracias!', 'Te avisaremos de todas las novedades a ' + result.value, 'success');
    }
  });
});


// Login

document.getElementById('btnLogin').addEventListener('click', () => {
  Swal.fire({
    title: 'Registrarse / Iniciar sesión',
    html: `<input type="text" id="swal-usuario" class="swal2-input" placeholder="Usuario">
           <input type="email" id="swal-email" class="swal2-input" placeholder="Email">
           <input type="password" id="swal-password" class="swal2-input" placeholder="Contraseña">`,
    confirmButtonText: 'Guardar',
    showCancelButton: true,
    cancelButtonText: 'Cancelar',
    preConfirm: () => {
      const usuario = document.getElementById('swal-usuario').value;
      const email = document.getElementById('swal-email').value;
      const password = document.getElementById('swal-password').value;
      if (!usuario || !email || !password) {
        Swal.showValidationMessage('Completa todos los campos');
        return false;
      }
      localStorage.setItem('usuario', JSON.stringify({ usuario, email, password }));
      return { usuario, email };
    }
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire('¡Bienvenido!', `Usuario: ${result.value.usuario}<br>Email: ${result.value.email}`, 'success');
    }
  });
});


// Inicializar carrito al cargar
actualizarCarrito();









