from flask import Flask
from flask_mysqldb import MySQL
from config import config

app = Flask(__name__)

conexion=MySQL(app)
@app.route('/producto')
def listar_producto():
     try:
          cursor=conexion.connection.cursor()
          sql="SELECT id_producto, descripcion, precio, nombre, stock, referencia, imagen, id_proovedor, tipo_proovedor  from producto"
          cursor.execute(sql)
          datos=cursor.fetchall()
          print(datos)
          return "productos listados"
     except Exception as ex:
          return "Error"
     
def pagina_no_encontrada(error):
          return "<h1> la pagina que intestas buscar no se encontro..</h1>"
 

if __name__ == '__main__':
    app.config.from_object(config['development'])
    app.register_error_handler(404, pagina_no_encontrada)
    app.run()
