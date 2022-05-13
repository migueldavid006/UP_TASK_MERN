import Usuario from "../models/Usuario.js"
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";

const registrar = async (req,res)=>{
//evitar registros duplicados
const {email}= req.body;
const existeUsuario = await Usuario.findOne({email});

if(existeUsuario){
    const error = new Error('Usuario ya registrado');
    return res.status(400).json({msg:error.message});
}

try {
    // OSLO SE ESTA CREANDO USUARIO
    const usuario = new Usuario(req.body)
    usuario.token = generarId();
// ingrsando datos a la mase NO RELACIONAL MONGO DB
    const usuarioAlmacenado = await usuario.save()
    res.json({usuarioAlmacenado});

    console.log(usuario)
} catch (error) {
    console.log(error)
}
};

const autenticar = async (req,res) =>{
    const {email, password} = req.body;
    // comprobar si el ususario existe 
    const usuario = await Usuario.findOne({email})
        // comprobar si el USARIO ESTA CONFIRMADO
if(!usuario){
    const error = new Error('el Usuario No Existe');
    return res.status(403).json({msg: error.message});
}

    //COMPROBAR PAswoord
    if(await usuario.comprobarPassword(password)){
         res.json({
             _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarJWT(usuario._id),
         });
    }else{
        const error = new Error('eL PASSWORDE ES INCORRECTO');
         return res.status(403).json({msg: error.message});
    }
};

const confirmar = async (req,res) =>{

    const {token} = req.params;
    const usuarioConfirmar = await Usuario.findOne({ token});
    if(!usuarioConfirmar){
        const error = new Error('Token no valido');
        return res.status(403).json({msg: error.message});
    }

    try {
        
        usuarioConfirmar.confirmado = true;
        usuarioConfirmar.token = '';
        await usuarioConfirmar.save();
        res.json({msg: 'usuario confirmado correctamente'});

    } catch (error) {
        console.log(error)
    }
};

const olvidePassword = async (req,res) =>{
    const {email} = req.body;

    const usuario = await Usuario.findOne({email})
    if(!usuario){
    const error = new Error('el Usuario No Existe');
    return res.status(404).json({msg: error.message});
}

try {
    usuario.token = generarId();
    await usuario.save();
    res.json({msg:" hemos enviado un email con las instrucciones "})
    } catch (error) {
        console.log(error)
    }
};

const comprobarToken = async (req,res) =>{
    const {token} = req.params;

    const tokenValido = await Usuario.findOne({token});

        if(tokenValido){
            res.json({msg:'token valido Y EL USUARIO EXISSTEE'})
        }else{
            const error = new Error('Token No VALIDO');
            return res.status(404).json({msg: error.message});
        }
};


const nuevoPassword = async (req,res) =>{
    const {token} = req.params;
    const {password} = req.body;

    const usuario = await Usuario.findOne({token});

        if(usuario){
            usuario.password = password;
            usuario.token = '';
          try {
            await usuario.save()
            res.json({msg:"password modificado corretamente"})
          } catch (error) {
              console.log(error)
          }
        }else{
            const error = new Error('Token No VALIDO');
            return res.status(404).json({msg: error.message});
        }
   
};

const perfil = async (req, res) =>{
    const {usuario} = req;

    res.json(usuario);
}

export { registrar,autenticar,confirmar, olvidePassword,comprobarToken,nuevoPassword, perfil};