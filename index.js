import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import './dbconection.js'
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*", credentials: true }));




const router = express.Router();

router.get('/datos', async (req, res) => {
  try {
   
    const [rows] = await db.query('SELECT * FROM usuario'); 
    res.json(rows); 
  } catch (error) {
    console.error('Error al consultar la base de datos:', error);
    res.status(500).json({ error: 'Error al consultar la base de datos' });
  }
});


app.use('/', router);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`The server is running on PORT ${PORT}`);
});
