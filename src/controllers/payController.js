const { mercadopago } = require("../mercadoPago.js");
const { Colegio, Plan_Pago } = require("../db");
const { NGROK_URL } = process.env;

const payController = async (req, res) => {
  const data = req.body;

  const colegio = await Colegio.findByPk(`${data.colegioId}`);
  const id_colegio = colegio.id;
  const nombre_colegio = colegio.nombre_colegio;
  const direccion = colegio.direccion;
  const ruc = colegio.ruc;
  const email = data.email;

  const plan = await Plan_Pago.findByPk(`${data.planPagoId}`);
  const id_plan = data.planPagoId;
  const nombre_plan_pago = plan.nombre_plan_pago;
  const precio = plan.precio;
 
  // caso 3 compra un diferente plan supperior con el plan anterior vigente
 

  let preference = {
    binary_mode: true,
    payer: {
      id_colegio: id_colegio,
      name: nombre_colegio,
      direccion: direccion,
      ruc: ruc,
      email: email,
    },
    items: [
      {
        id: id_plan,
        title: nombre_plan_pago,
        unit_price: precio,
        quantity: data.cantidad,
      },
    ],
    external_reference: id_colegio,
    additional_info: email,
    back_urls: {
      //definir las verdaderas aca
      success: "https://micole.vercel.app/#/dashboardschool",
      failure:
        "https://micole.vercel.app/#/dashboardschool",
      pending: "https://micole.vercel.app/#/dashboardschool",
    },
    notification_url:`${NGROK_URL}/payments/notification`,
    // notification_url: `${NGROK_URL}/payments/notification`,
  };
  console.log(preference.payer);
  console.log(preference.items);
  mercadopago.preferences
    .create(preference)
    //le pasamos las preference que definimos de linea 35 a 72
    .then(function (response) {
      console.log(response.body.init_point);
      res.send(
        response.body.init_point //este id es el id de la compra, que mandamos al front para que reenvie a MercadoPago
      );
    })
    .catch(function (error) {
      console.log(error);
    });
};

module.exports = payController;
