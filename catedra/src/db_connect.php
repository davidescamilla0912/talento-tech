<?php
$host = 'localhost';
$db   = 'dev_caps';
$user = 'root'; // Asumimos el usuario por defecto de XAMPP
$pass = ''; // Sin contraseña
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
    // echo "Conexión exitosa"; // Comentado por defecto para evitar salida no deseada
} catch (\PDOException $e) {
    // En un entorno de producción, considera loguear el error en lugar de mostrarlo
    // o mostrar un mensaje de error genérico al usuario.
    http_response_code(500); // Internal Server Error
    echo json_encode(['success' => false, 'message' => 'Error de conexión a la base de datos.']);
    exit(); // Detener la ejecución si la conexión falla
}

// La variable $pdo ahora contiene el objeto de conexión a la base de datos.
// Puedes incluir este archivo donde necesites interactuar con la BD.
?> 