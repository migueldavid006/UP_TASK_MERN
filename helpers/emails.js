import nodemailer from 'nodemailer';

export const  emailRegistro = async (datos) => {
    // console.log('DATOS' , datos);

    const {email, nombre, token} = datos;

    const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "bb55cf31a9c62d",
          pass: "35825cbb71b82a"
        }
      });

      //informacion del EMAIL
      const info = await transport.sendMail({
          from: ' " UpTask - administrador de proyectos" <cuentas@uptask.com>',
          to: email,
          subject: "UpTasck - comprueba tu cuenta",
          text: "comprueba tu cuenta en UpTak",
          html:`<p> Hola :${nombre} comprueba tu cuenta en UpTack </p>
          <p> tu cuenta ets acasi lista , solo debees comprobarla en el siguiente enlace:</p>
          
          <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a>

        <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
          `
          
      });
}


export const  emailOlvidePassword = async (datos) => {

  const {email, nombre, token} = datos;

  //TODO: mover todo haci avariable d eentorno
  const transport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "bb55cf31a9c62d",
        pass: "35825cbb71b82a"
      }
    });

    //informacion del EMAIL
    const info = await transport.sendMail({
        from: ' " UpTask - administrador de proyectos" <cuentas@uptask.com>',
        to: email,
        subject: "UpTasck - Restablece tu Password",
        text: "Reestablece tu Password",
        html:`<p> Hola :${nombre} has solicitsdo reestablecer tu assword </p>
        <p> sigue el siguiente enlace para generar un nuevo password</p>
        
        <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablece tu Password</a>

      <p>Si tu no creaste este email, puedes ignorar el mensaje</p>
        `
        
    });

}