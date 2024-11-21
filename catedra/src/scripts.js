function mostrarSeccion(seccionId) {
    const secciones = document.querySelectorAll('.section');
    secciones.forEach(seccion => {
        seccion.classList.remove('active');
    });

    const seccionSeleccionada = document.getElementById(seccionId);
    if (seccionSeleccionada) {
        seccionSeleccionada.classList.add('active');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    mostrarSeccion('inicio'); // Muestra la sección de inicio al cargar la página
});

const form = document.getElementById('contactForm');
form.addEventListener('submit', function(event) {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    if (name === '' || email === '') {
        alert('Por favor, completa todos los campos.');
        event.preventDefault();
    } else {
        alert('¡Formulario enviado correctamente!');
    }
});

const carrito = [];
const carritoSeccion = document.querySelector("#carrito");
const botonesAgregar = document.querySelectorAll(".producto-agregar");

const actualizarCarrito = () => {
    const total = carrito.reduce((sum, p) => sum + p.precio * p.cantidad, 0);
    carritoSeccion.innerHTML = `
        <h2>Carrito de Compras</h2>
        ${carrito.length ? `
        <ul>${carrito.map((p, i) => `
            <li>${p.nombre} - ${p.precio}$ x ${p.cantidad}
            <button onclick="eliminarDelCarrito(${i})">Eliminar</button></li>`).join("")}</ul>
        <p><strong>Total:</strong> ${total}$</p>` : "<p>El carrito está vacío.</p>"}`;
};

const agregarAlCarrito = (nombre, precio) => {
    const producto = carrito.find(p => p.nombre === nombre) || { nombre, precio, cantidad: 0 };
    producto.cantidad++;
    if (!carrito.includes(producto)) carrito.push(producto);
    actualizarCarrito();
};

const eliminarDelCarrito = (index) => {
    carrito.splice(index, 1);
    actualizarCarrito();
};

botonesAgregar.forEach(boton => {
    boton.addEventListener("click", () => {
        const producto = boton.closest(".productos");
        agregarAlCarrito(producto.querySelector("h3").textContent, 
        parseFloat(producto.querySelector("p").textContent.replace(/[^0-9.-]+/g, "")));
    });
});

document.getElementById('botonPagar').addEventListener("click", () => {
    if (!carrito.length) return alert('El carrito está vacío. Agrega productos antes de pagar.');
    
    carrito.length = 0; // Limpiar el carrito después de pagar
    actualizarCarrito();
});

window.addEventListener("scroll", () => {
    carritoSeccion.classList.toggle("scroll", document.querySelector("#productos").getBoundingClientRect().top < 10);
});
