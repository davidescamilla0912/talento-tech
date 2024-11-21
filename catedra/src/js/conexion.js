const mysql = require('mysql2'); 


const connection = mysql.createConnection({
  host: '127.0.0.1',  
  user: 'root',  
  password: '',  
  port: '3307',  
  database: 'modelo_relacional',  
});


connection.connect((err) => {
    if (err) {
      console.error('Error al conectar a la base de datos:', err);
      return;
    }
    console.log('Conexión exitosa a la base de datos');
    process.exit();  
  });
  
 
  module.exports = connection;