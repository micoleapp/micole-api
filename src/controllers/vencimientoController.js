const { Colegio, Ventas, Auth } = require("../db.js");

exports.jobs = async () => {
  var hoy = new Date();
  console.log(hoy);
  var fechaHoy = hoy.toISOString().split("T")[0];
  console.log(fechaHoy);
  const colegios = await Ventas.findAll({
    attributes: ["id", "vencimientoPlan"],
    include: [
      {
        model: Colegio,
        attributes: ["id", "nombre_colegio"],
        include: [{ model: Auth, attributes: ["email"] }],
      },
    ],
    where: {
      activo: true,
    },
  });
  const prontosVencer = colegios.filter((cole) => {
    let diferencia;
    let vencimiento = new Date(cole.vencimientoPlan);
    let hoy = new Date(fechaHoy);
    diferencia = vencimiento - hoy;
    // RECORDATORIO 3 DÍAS
    if (diferencia >= 172800000 && diferencia <= 259200000) {
      return true;
    }
    // RECORDATORIO 5 DÍAS
    if (diferencia >= 345600000 && diferencia <= 432000000) {
      return true;
    }
    return false;
  });
  //a los prontos a vencer los tengo que notificar por email

  for (let i = 0; i < prontosVencer.length; i++) {
    // ******* AQUI SE MANDA EL CORREO DE QUE ESTÁ POR VENCER EL PLAZO
    console.log(prontosVencer[i].Colegio.Auth.email);
  }

  const vencidos = colegios.filter((cole) => {
    let diferencia;
    let vencimiento = new Date(cole.vencimientoPlan);
    let hoy = new Date(fechaHoy);
    diferencia = vencimiento - hoy;
    if (diferencia >= -86400000 && diferencia <= 0) {
      return true;
    }
    return false;
  });
  //a los vencidos  los tengo que notificar por email y cambiar a status inactivo
  for (let i = 0; i < vencidos.length; i++) {
    var colegioDesactivado = await Colegio.findByPk(vencidos[i].Colegio.id);
    colegioDesactivado.isActive = false;
    colegioDesactivado.save();
    // ******* AQUI SE MANDA EL CORREO DE QUE EL PLAZO YA VENCIO Y TE PASAMOS A INACTIVO
    console.log(vencidos[i].Colegio.Auth.email);
  }
};
