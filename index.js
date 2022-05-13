import express  from 'express';
import conectDB from './config/db.js';
import dotenv from 'dotenv'
import usuariosRoutes from './routes/usuariosRoutes.js';

const app = express();
app.use(express.json());

dotenv.config();

conectDB();

//Routing
app.use("/api/usuarios",usuariosRoutes );



const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
 console.log(`servidor en e lpuestp ${{PORT}}`)
});