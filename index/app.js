
function resumencompra(total, prendas) {
    alert('Gracias por tu compra, el total es: $' + total + '\nPrendas elegidas: ' + prendas.join(', '));

}

let nombre = prompt('Te damos la bienvenida a nuestra tienda, ingresa tu nombre');
alert('Bienvenido ' + nombre);

let apellido = prompt('Ingresa tu apellido');
alert('Tu apellido es: ' + apellido);

let edad = prompt('Ingresa tu edad');


alert('Tus datos:\n\nnombre: ' + nombre + '\napellido: ' + apellido + '\nedad: ' + edad );


let total = 0;
let prenda;
let prendaelegida = [];

do {
    prenda = prompt('selecciona una prenda:\n1. Remera - $25000\n2. Pantalón - $50000\n3. Zapatillas - $150000\n4. Salir');

switch (prenda) {
    case '1':
        total = total + 25000;
        prendaelegida.push('Remera');
        break;
    case '2':
        total = total + 50000;
        prendaelegida.push('Pantalón');
        break;
    case '3':
        total = total + 150000;
        prendaelegida.push('Zapatillas');
        break;
    case '4':
        break;
    default:
            alert('Opcion incorrecta, por favor intente nuevamente');  
        break;
}

} while (prenda !== '4');

let metodoPago; 
let pagoRealizado = false;

do {
    metodoPago = prompt('¿Como lo queres pagar?:\n1. Efectivo/Transferencia\n2. Tarjeta de crédito\n3. Tarjeta de débito'); 

switch (metodoPago) {
    case '1':
        total = total * 0.9; // Aplicar descuento del 10%
        alert('10% de descuento por pago en efectivo, total: $' + (total));
        pagoRealizado = true;
        break;
    case '2': 
      total = total * 1.2;
      alert('Este metodo de pago tiene un recargo del 20%, total: $' + (total));
      pagoRealizado = true;
      break;
    case '3':
        alert('Este metodo de pago no tiene recargo, total: $' + total);
        pagoRealizado = true;
        break;
    case '4':
         alert('No realizaste el pago.');
         break;
    default:
            alert('Opción incorrecta, por favor intente nuevamente');
            break;
    }

} while (!pagoRealizado && metodoPago !== '4');

if (pagoRealizado) {
    resumencompra(total, prendaelegida);
    
}







