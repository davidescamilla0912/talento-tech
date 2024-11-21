import mysql2 from 'mysql2/promise';


const config = {
    host: "127.0.0.1",
    user: "root",
    port: "3307",
    password: "",
    database: "modelo_relacional", 
}


let conection;

try {
    conection = await mysql2.createConnection(config)
    console.log("Se ha extablecido conexión con MySql")
} catch (error) {
    console.log("Se ha producido un Error al momento de extablecer la conexión con la BD! ERROR: ", error)

}

