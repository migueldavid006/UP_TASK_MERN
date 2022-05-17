import express  from 'express';
import conectDB from './config/db.js';
import dotenv from 'dotenv';
import cors from 'cors';
import usuariosRoutes from './routes/usuariosRoutes.js';
import proyectoRoutes from './routes/proyectoRoutes.js';
import tareaRoutes from './routes/tareaRoutes.js';

const app = express();
app.use(express.json());

dotenv.config();

conectDB();

//configurar CORS
const whiteList = [process.env.FRONTEND_URL];

const corsOption = {
    origin: function (origin, callback) {
        // console.log(origin)
        if(whiteList.includes(origin)){
            // PUEDE CONSULTAR LA PI
            callback(null, true);
        }else{
            // no esta permitido el request
            callback(new Error('error de cors'));
        }
    }
}


app.use(cors(corsOption))
//Routing
app.use("/api/usuarios",usuariosRoutes );
app.use("/api/proyectos", proyectoRoutes );
app.use("/api/tareas", tareaRoutes );



const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
 console.log(`servidor en e lpuestp ${{PORT}}`)
});