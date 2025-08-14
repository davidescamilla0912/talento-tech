// Lógica para mostrar diferentes secciones
// Función para mostrar secciones (asegurando que solo una sea visible)
function mostrarSeccion(id) {
    console.log('Intentando mostrar sección:', id); // Línea de depuración
    // Ocultar todas las secciones
    document.querySelectorAll('.main-content section').forEach(section => {
        section.style.display = 'none';
    });

    // Mostrar la sección solicitada
    const seccion = document.getElementById(id);
    if (seccion) {
        seccion.style.display = 'block';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Mostrar la sección de login por defecto al cargar la página
    mostrarSeccion('login');

    // --- Lógica para Login y Registro ---

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // Prevenir el envío tradicional del formulario

            const usernameInput = document.getElementById('username');
            const passwordInput = document.getElementById('password');

            const username = usernameInput.value;
            const password = passwordInput.value;

            try {
                const response = await fetch('/catedra/src/login.php', { // Ajusta la URL si es necesario
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username: username, password: password })
                });

                const result = await response.json();

                if (result.success) {
                    alert(result.message); // Mostrar mensaje de éxito
                    // Aquí puedes redirigir al usuario o mostrar contenido protegido
                    console.log('Usuario logueado:', result.user);
                    // Por ejemplo, mostrar la sección de productos después del login
                    mostrarSeccion('productos');
                } else {
                    alert('Error de login: ' + result.message); // Mostrar mensaje de error
                }
            } catch (error) {
                console.error('Error en la solicitud de login:', error);
                alert('Hubo un problema al intentar iniciar sesión.');
            }
        });
    }

    const registerForm = document.getElementById('registerForm');
     if (registerForm) {
        registerForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // Prevenir el envío tradicional del formulario

            const regUsernameInput = document.getElementById('regUsername');
            const regPasswordInput = document.getElementById('regPassword');
            const regConfirmPasswordInput = document.getElementById('regConfirmPassword');
            const regEmailInput = document.getElementById('regEmail');

            const username = regUsernameInput.value;
            const password = regPasswordInput.value;
            const confirmPassword = regConfirmPasswordInput.value;
            const correo = regEmailInput.value;

            if (password !== confirmPassword) {
                alert('Las contraseñas no coinciden.');
                return; // Detener el proceso si las contraseñas no coinciden
            }

            try {
                const response = await fetch('/catedra/src/register.php', { // Ajusta la URL si es necesario
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username: username, password: password, correo: correo })
                });

                const result = await response.json();

                if (result.success) {
                    alert(result.message); // Mostrar mensaje de éxito
                    // Redirigir al usuario a la página de login después de registrarse
                    mostrarSeccion('login');
                     // Limpiar los campos del formulario de registro
                    registerForm.reset();
                } else {
                     alert('Error de registro: ' + result.message); // Mostrar mensaje de error
                }
            } catch (error) {
                console.error('Error en la solicitud de registro:', error);
                alert('Hubo un problema al intentar registrar el usuario.');
            }
        });
    }

    // --- Fin Lógica para Login y Registro ---


});

// Código original relacionado con el carrito de compras y formulario de contacto, etc.
// Asegúrate de que estas funciones no causen conflictos con la lógica de mostrarSeccion.

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

    // Añadir listener al botón pagar DESPUÉS de que se ha añadido al DOM
    const botonPagar = document.getElementById('botonPagar');
    if (botonPagar) {
        botonPagar.addEventListener("click", () => {
            if (!carrito.length) return alert('El carrito está vacío. Agrega productos antes de pagar.');
            carrito.length = 0;
            actualizarCarrito();
        });
    }
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

window.addEventListener("scroll", () => {
    const productosSection = document.querySelector("#productos");
    if (productosSection) {
         carritoSeccion.classList.toggle("scroll", productosSection.getBoundingClientRect().top < 10);
    }
});

// Manejo del formulario de login - ESTE CÓDIGO SERÁ ELIMINADO YA QUE LA LÓGICA DE LOGIN AHORA USA FETCH
/*
const loginForm = document.querySelector('#login form');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const usuario = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Credenciales predefinidas
        if (usuario === 'admin' && password === 'admin') {
            alert('¡Bienvenido!');
            mostrarSeccion('inicio');
        } else {
            alert('Usuario o contraseña incorrectos');
        }
    });
}
*/
