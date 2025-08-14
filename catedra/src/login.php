<?php
require_once 'db_connect.php';

header('Content-Type: application/json');

// Permitir solicitudes desde cualquier origen (solo para desarrollo)
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

    if ($username && $password) {
        try {
            // Preparar la consulta SQL para buscar al usuario por nombre
            $sql = "SELECT id, nombre, Rol, password FROM usuarios WHERE nombre = ?";
            $stmt = $pdo->prepare($sql);
            
            // Ejecutar la consulta
            $stmt->execute([$username]);

            // Obtener el resultado (una fila o null)
            $user = $stmt->fetch();

            // Verificar si se encontró el usuario y si la contraseña coincide
            if ($user && password_verify($password, $user['password'])) {
                // Login exitoso
                // Aquí deberías iniciar una sesión o generar un token de autenticación
                echo json_encode(['success' => true, 'message' => 'Login exitoso.', 'user' => ['id' => $user['id'], 'nombre' => $user['nombre'], 'Rol' => $user['Rol'] ] ]);
            } else {
                // Usuario no encontrado o contraseña incorrecta
                http_response_code(401); // Unauthorized
                echo json_encode(['success' => false, 'message' => 'Usuario o contraseña incorrectos.']);
            }

        } catch (PDOException $e) {
            // http_response_code(500); // Ya se maneja en db_connect.php si es error de conexión
            echo json_encode(['success' => false, 'message' => 'Error al intentar login: ' . $e->getMessage()]);
        }
    } else {
        http_response_code(400); // Bad Request
        echo json_encode(['success' => false, 'message' => 'Nombre de usuario y contraseña son requeridos.']);
    }
} else {
    http_response_code(405); // Method Not Allowed
    echo json_encode(['success' => false, 'message' => 'Método no permitido.']);
}
?> 