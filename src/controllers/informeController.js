const { Informe } = require('../db');
const mailer = require("../utils/sendMails/mailer");

const sendInfoEmail = async (req, res, next) => {
  const { name, email, ruc, celular } = req.body;
  try {
    const newInforme = await Informe.create({
      nombre_colegio: name,
      email,
      ruc,
      telefono: celular,
    });
    mailer.sendMailInforme(newInforme); 
    res.status(200).send('Solicitud recibida correctamente');
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  sendInfoEmail,
};
