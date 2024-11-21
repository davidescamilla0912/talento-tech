
const mysql = require('mysql2');
const express = require('express');
const connection = require('./conexion');

const app = express();
const port = 4000;


app.use(express.json());


app.get('/producto', (req, res) => {
  connection.query('SELECT * FROM producto', (err, results) => {
    if (err) {
      console.error('Error al obtener los producto:', err);
      return res.status(500).send('Error al obtener los producto');
    }
    res.json(results);
  });
});


app.delete('/producto/:id', (req, res) => {
  const userId = req.params.id;
  connection.query('DELETE FROM usuario WHERE id = ?', [id_producto], (err, result) => {
    if (err) {
      console.error('Error al eliminar el producto:', err);
      return res.status(500).send('Error al eliminar el producto');
    }
    if (result.affectedRows === 0) {
      return res.status(404).send('producto no encontrado');
    }
    res.send(`producto con ID ${userId} eliminado`);
  });
});


app.get('/', (req, res) => {
  res.send('¡Servidor en funcionamiento!');
});


app.listen(port, () => {
  console.log(`Servidor funcionando en http://localhost:${port}`);
});

  
