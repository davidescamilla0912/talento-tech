// Carrito de compras
const carrito = [];
const carritoSeccion = document.querySelector("#carrito");
const botonesAgregar = document.querySelectorAll(".producto-agregar");

// Función para actualizar el carrito en la vista
const actualizarCarrito = () => {
    const total = carrito.reduce((sum, p) => sum + p.precio * p.cantidad, 0);
    carritoSeccion.innerHTML = `
        <h2>Carrito de Compras</h2>
        ${carrito.length ? `
        <ul>${carrito.map((p, i) => `
            <li>${p.nombre} - ${p.precio}$ x ${p.cantidad}
            <button onclick="eliminarDelCarrito(${i})">Eliminar</button></li>`).join("")}</ul>
        <p><strong>Total:</strong> ${total}$</p>` : `<p>El carrito está vacío.</p>`}`;
};

// Función para agregar un producto al carrito
const agregarAlCarrito = (nombre, precio) => {
    const producto = carrito.find(p => p.nombre === nombre) || { nombre, precio, cantidad: 0 };
    producto.cantidad++;
    if (!carrito.includes(producto)) carrito.push(producto);
    actualizarCarrito();
};

// Función para eliminar un producto del carrito
const eliminarDelCarrito = (index) => {
    carrito.splice(index, 1);
    actualizarCarrito();
};

// Evento para agregar productos al carrito al hacer clic en el botón
botonesAgregar.forEach(boton => {
    boton.addEventListener("click", () => {
        const producto = boton.closest(".producto");
        agregarAlCarrito(producto.querySelector("h3").textContent, 
        parseFloat(producto.querySelector("p").textContent.replace(/[^0-9.-]+/g, "")));
    });
});

// Evento para manejar el proceso de pago
document.getElementById('botonPagar').addEventListener("click", () => {
    if (!carrito.length) return alert('El carrito está vacío. Agrega productos antes de pagar.');
    alert(`¡Gracias por tu compra! Total a pagar: ${carrito.reduce((sum, p) => sum + p.precio * p.cantidad, 0)}$`);
    carrito.length = 0; // Vaciar el carrito
    actualizarCarrito();
});

// Función para cambiar la clase "scroll" cuando se hace scroll
window.addEventListener("scroll", () => {
    carritoSeccion.classList.toggle("scroll", document.querySelector("#productos").getBoundingClientRect().top < 10);
});