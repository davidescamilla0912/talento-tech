<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Código de depuración: Mostrar el contenido crudo del cuerpo de la solicitud POST
// REMOVER ESTO EN PRODUCCIÓN.
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $raw_post_data = file_get_contents('php://input');
    header('Content-Type: text/plain'); // Enviar como texto plano para evitar problemas de parseo JSON
    echo "Datos POST crudos:\n";
    echo $raw_post_data;
    exit(); // Detener la ejecución aquí
}

require_once 'db_connect.php';

header('Content-Type: application/json');

// Permitir solicitudes desde cualquier origen (esto es solo para desarrollo)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Manejar solicitudes OPTIONS preflight
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtener datos del cuerpo de la solicitud (asumiendo JSON)
    $json_data = file_get_contents('php://input');
    $data = json_decode($json_data, true);

    $username = $data['username'] ?? null;
    $password = $data['password'] ?? null;
    $correo = $data['correo'] ?? null;

    if ($username && $password && $correo) {
        // Hashear la contraseña
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        // Asumir un rol por defecto para la prueba. Ajusta si tu ENUM tiene otros valores.
        $rol = 'cliente'; // O el valor ENUM por defecto que uses

        try {
            // Preparar la consulta SQL para insertar el usuario (usando 'correo')
            $sql = "INSERT INTO usuarios (nombre, Rol, password, correo) VALUES (?, ?, ?, ?)";
            $stmt = $pdo->prepare($sql);
            
            // Ejecutar la consulta con los datos (pasando $correo al placeholder de correo)
            $stmt->execute([$username, $rol, $hashed_password, $correo]);

            // Verificar si se insertó alguna fila
            if ($stmt->rowCount()) {
                echo json_encode(['success' => true, 'message' => 'Usuario registrado con éxito.']);
            } else {
                echo json_encode(['success' => false, 'message' => 'No se pudo registrar el usuario.']);
            }

        } catch (PDOException $e) {
            // En caso de error (ej. nombre de usuario duplicado si es UNIQUE)
            // http_response_code(500); // Ya se maneja en db_connect.php si es error de conexión
            echo json_encode(['success' => false, 'message' => 'Error al registrar usuario: ' . $e->getMessage()]);
        }
    } else {
        http_response_code(400); // Bad Request
        echo json_encode(['success' => false, 'message' => 'Nombre de usuario, contraseña y correo son requeridos.']);
    }
} else {
    http_response_code(405); // Method Not Allowed
    echo json_encode(['success' => false, 'message' => 'Método no permitido.']);
}
?> 