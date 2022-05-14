import express from "express";
const router = express.Router();

import {autenticar, comprobarToken, confirmar, nuevoPassword, olvidePassword, perfil, registrar} from '../controllers/usuarioController.js'
import checkAuth from '../middleware/checkAuth.js'
// router.get('/', usuarios);
// router.post('/', crearUsuario);

// AUTHENTICACION CREACION Y REGISTRO DE USUARIOS

router.post('/', registrar);
router.post('/login', autenticar);

router.get('/confirmar/:token', confirmar);
router.post('/olvide-password', olvidePassword);
// router.get('/olvide-password/:token', comprobarToken);
// router.post('/olbide-password/:token', nuevoPassword);

router.route('/olvide-password/:token').get(comprobarToken).post(nuevoPassword)

// ------------------RUTAS PRIVADAS
router.get('/perfil', checkAuth , perfil)

export default router;