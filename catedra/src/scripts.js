// Lógica para mostrar diferentes secciones
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
    mostrarSeccion('login'); 
    mostrarSeccion('inicio'); 
});

// Lógica del formulario de contacto
const form = document.getElementById('contactForm');
if (form) {
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
}

// Lógica del carrito de compras
const carrito = [];
const carritoSeccion = document.querySelector("#carrito");
const botonesAgregar = document.querySelectorAll(".producto-agregar");

const actualizarCarrito = () => {
    const total = carrito.reduce((sum, p) => sum + p.precio * p.cantidad, 0);
    carritoSeccion.innerHTML = `
        <h2>Carrito de Compras</h2>
        ${carrito.length ? `
        <ul>${carrito.map((p, i) => `
            <li>
                <img src="${p.imagen}" alt="${p.nombre}" class="carrito-imagen"> 
                ${p.nombre} - ${p.precio}$ x ${p.cantidad}
                <button onclick="eliminarDelCarrito(${i})">Eliminar</button>
            </li>`).join("")}</ul>
        <p><strong>Total:</strong> ${total}$</p>` : "<p>El carrito está vacío.</p>"}
        <button id="botonPagar">Iniciar Compra</button>
    `;
};

const agregarAlCarrito = (nombre, precio, imagen) => {
    const producto = carrito.find(p => p.nombre === nombre) || { nombre, precio, cantidad: 0, imagen };
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
        const nombre = producto.querySelector("h3").textContent;
        const precio = parseFloat(producto.querySelector("p").textContent.replace(/[^0-9.-]+/g, ""));
        const imagen = producto.querySelector("img").src; 

        agregarAlCarrito(nombre, precio, imagen);
    });
});


document.getElementById('botonPagar').addEventListener("click", () => {
    if (!carrito.length) return alert('El carrito está vacío. Agrega productos antes de pagar.');
    carrito.length = 0;
    actualizarCarrito();
});


window.addEventListener("scroll", () => {
    carritoSeccion.classList.toggle("scroll", document.querySelector("#productos").getBoundingClientRect().top < 10);
});


document.addEventListener("DOMContentLoaded", () => {
    const carrito = document.querySelector("#carrito tbody");
    const totalElement = document.querySelector("#total");

    const renderCarrito = () => {
        carrito.innerHTML = ""; 
        let total = 0;

        productos.forEach(producto => {
            const fila = document.createElement("tr");

            const subtotal = producto.cantidad * producto.precio;
            total += subtotal;

            fila.innerHTML = `
                <td>${producto.nombre}</td>
                <td>
                    <button class="btn-restar" data-id="${producto.id}">-</button>
                    ${producto.cantidad}
                    <button class="btn-aumentar" data-id="${producto.id}">+</button>
                </td>
                <td>$${producto.precio}</td>
                <td>$${subtotal.toFixed(2)}</td>
                <td><button class="btn-eliminar" data-id="${producto.id}">Eliminar</button></td>
            `;

            carrito.appendChild(fila);
        });

        totalElement.textContent = total.toFixed(2);
    };

    carrito.addEventListener("click", (e) => {
        const id = parseInt(e.target.dataset.id);

        if (e.target.classList.contains("btn-aumentar")) {
            const producto = productos.find(prod => prod.id === id);
            producto.cantidad++;
        } else if (e.target.classList.contains("btn-restar")) {
            const producto = productos.find(prod => prod.id === id);
            if (producto.cantidad > 1) {
                producto.cantidad--;
            }
        } else if (e.target.classList.contains("btn-eliminar")) {
            const index = productos.findIndex(prod => prod.id === id);
            productos.splice(index, 1); 
        }

        renderCarrito(); 
    });

    renderCarrito();
});
