const nodemailer = require("nodemailer");
const moment = require("moment");
var actualDate = moment().format("DD/MM/YYYY HH:mm:ss A");
/* Mail Templates */
const confirmationSignUpTemplate = require("./Auth/confirmationSignUpTemplate");
const resetPassword = require("./Auth/resetPassword");
const informeMailUser = require("./Informes/informeMailUser");
const informeMailAdmin = require("./Informes/informeMailAdmin");
const solicitudCita = require("./Citas/User/solicitudCita");
const aplicacionCita = require("./Citas/User/aplicacionCita");
const entrevistaDirector = require("./Citas/User/entrevistaDirector");
const vacanteOfrecida = require("./Citas/User/vacanteOfrecida");
const vacanteAceptada = require("./Citas/User/vacanteAceptada");
const sendPaymentSuccessEmail = require("./Ventas/VentaExitosa");
const sendPaymentCanceledEmail = require("./Ventas/VentaCancelada");

const createTransport = () => {
  /* Test with MailTrap */
  /* const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "c5ede4159841b3",
      pass: "19572a2f48110a"
    }
  }); */

  /* Config for send Email with Gmail */
  const transport = nodemailer.createTransport({
    host:"smtp.gmail.com",
    port: 465,
    secure: true,
    auth:{
      user: "micole.test.app@gmail.com",
      pass: process.env.GMAIL_MAILS_PASS,
    },
    tls: {
      rejectUnauthorized: false
  }
  });
  transport.verify().then( ()=>{
    console.log("Listo para enviar emails");
  });
  return transport;
};

const sendMailSignUp = async(user, type) => {
  const transporter = createTransport();
  if(type === "Colegio"){
    await transporter.sendMail({
      from: '"MiCole App " <micole.test.app@gmail.com>',
      to: `${user.email}`,
      subject: `¡Bienvenido colegio ${user.nombre} a MiCole!`,
      html: confirmationSignUpTemplate(user, type, actualDate)
    });
  }
  return;
};


/*const sendMailForgotPassword = async(email, link) => {
  const transporter = createTransport();
  await transporter.sendMail({
    from: '"MiCole App" <micole.test.app@gmail.com>',
    to: `${email}`,
    subject: "Restablecimiento de Contraseña - MiCole",
    html: resetPassword(link)
  });
  return;
};*/

const sendMailForgotPassword = async(mail, otp) => {
  const transporter = createTransport();
  await transporter.sendMail({
    from: '"MiCole App" <micole.test.app@gmail.com>',
    to: `${mail}`,
    subject: "Restablecimiento de Contraseña - MiCole",
    html: resetPassword(otp)
  });
  return;
};



const sendMailInforme = async(user) => {
  const transporter = createTransport();
  await transporter.sendMail({
    from: '"MiCole App" <micole.test.app@gmail.com>',
    to: `${user.email}`,
    subject: "Confirmación de solicitud de información sobre MiCole",
    html: informeMailUser(user, actualDate)
  });
  await transporter.sendMail({
    from: '"MiCole App" <micole.test.app@gmail.com>',
    to: `informes@micole.com.pe`,
    subject: "Nueva solicitud de información sobre MiCole",
    html: informeMailAdmin(user, actualDate)
  });
  return;
};

const sendMailSolicitudCita = async(user, colegio) => {
  const transporter = createTransport();
  await transporter.sendMail({
    from: '"MiCole App" <micole.test.app@gmail.com>',
    to: `${user.email}`,
    subject: `Solicitud de cita con el colegio ${colegio.nombre_colegio}`,
    html: solicitudCita(user, colegio, actualDate)
  });
  return;
};

const sendMailAplicacionCita = async(user, colegio) => {
  const transporter = createTransport();
  await transporter.sendMail({
    from: '"MiCole App" <micole.test.app@gmail.com>',
    to: `${user.email}`,
    subject: `¡Felicitaciones! Has pasado a la etapa de Aplicación del colegio ${colegio.nombre_colegio}`,
    html: aplicacionCita(user, colegio, actualDate)
  });
  return;
};

const sendMailEntrevistaCita = async(user, colegio) => {
  const transporter = createTransport();
  await transporter.sendMail({
    from: '"MiCole App" <micole.test.app@gmail.com>',
    to: `${user.email}`,
    subject: `¡Felicitaciones! Has pasado a la etapa de Entrevista con el Director del colegio ${colegio.nombre_colegio}`,
    html: entrevistaDirector(user, colegio, actualDate)
  });
  return;
};

const sendMailVOfrecida = async(user, colegio) => {
  const transporter = createTransport();
  await transporter.sendMail({
    from: '"MiCole App" <micole.test.app@gmail.com>',
    to: `${user.email}`,
    subject: `¡Felicitaciones! Has pasado a la etapa de Vacante Ofrecida del colegio ${colegio.nombre_colegio}`,
    html: vacanteOfrecida(user, colegio, actualDate)
  });
  return;
};

const sendMailVAceptada = async(user, colegio) => {
  const transporter = createTransport();
  await transporter.sendMail({
    from: '"MiCole App" <micole.test.app@gmail.com>',
    to: `${user.email}`,
    subject: `¡Felicitaciones! Has sido aceptado en el colegio ${colegio.nombre_colegio}`,
    html: vacanteAceptada(user, colegio, actualDate)
  });
  return;
};

/* Mails Ventas */
const PlanNombre = ["Free","Básico", "Estandar", "Premium"];

const sendPaymentSuccess = async(email, colegio, plan) => {
  const transporter = createTransport();
  await transporter.sendMail({
    from: '"MiCole App" <micole.test.app@gmail.com>',
    to: `${email}`,
    subject: `MiCole - suscripción al plan ${PlanNombre[plan-1]} realizado con éxito`,
    html: sendPaymentSuccessEmail(colegio, plan, actualDate)
  });
  return;
};

const sendPaymentCanceled = async(email, colegio, plan) => {
  const transporter = createTransport();
  await transporter.sendMail({
    from: '"MiCole App" <micole.test.app@gmail.com>',
    to: `${email}`,
    subject: `MiCole - suscripción al plan ${PlanNombre[plan-1]} ha sido rechazada`,
    html: sendPaymentCanceledEmail(colegio, plan, actualDate)
  });
  return;
};

exports.sendMailSignUp = (user , type) => sendMailSignUp(user , type);
exports.sendMailInforme = (user) => sendMailInforme(user);
exports.sendMailSolicitudCita = (user, colegio) => sendMailSolicitudCita(user, colegio);
exports.sendMailCitaRealizada = (user, colegio) => sendMailCitaRealizada(user, colegio);
exports.sendMailAplicacionCita = (user, colegio) => sendMailAplicacionCita(user, colegio);
exports.sendMailEntrevistaCita = (user, colegio) => sendMailEntrevistaCita(user, colegio);
exports.sendMailVOfrecida = (user, colegio) => sendMailVOfrecida(user, colegio);
exports.sendMailVAceptada = (user, colegio) => sendMailVAceptada(user, colegio);
exports.sendPaymentSuccess = (colegio, plan) => sendPaymentSuccess(colegio, plan);
exports.sendPaymentCanceled = (colegio, plan) => sendPaymentCanceled(colegio, plan);
exports.sendMailForgotPassword = (mail, otp) => sendMailForgotPassword(mail, otp);
