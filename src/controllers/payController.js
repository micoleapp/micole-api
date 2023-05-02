const { mercadopago } = require("../mercadoPago.js");
const { Colegio, Plan_Pago, Ventas } = require("../db");
const { NGROK_URL } = process.env;

const payController = async (req, res) => {
  const data = req.body;

  const colegio = await Colegio.findByPk(`${data.colegioId}`);
  const id_colegio = colegio.id;
  const nombre_colegio = colegio.nombre_colegio;
  let direccion = "igual";
  const ruc = colegio.ruc;
  const id_plan_anterior = colegio.PlanPagoId;
  const email = data.email;
  var cantidadMeses = data.cantidad;

  const plan = await Plan_Pago.findByPk(`${data.planPagoId}`);
  const id_plan = data.planPagoId;
  const nombre_plan_pago = plan.nombre_plan_pago;
  var precio = plan.precio;

  if (id_plan_anterior < id_plan) {
    // Funciona cuando se hace UPDATE de plan
    const PlanAnterior = await Plan_Pago.findByPk(id_plan_anterior);
    const mesesAcumulados = await Ventas.findOne({
      where: {
        ColegioId: data.colegioId,
        activo: true,
      },
    });
    const diferencia = precio - PlanAnterior.precio;
    precio = diferencia;
    cantidadMeses = mesesAcumulados.accumulated_months;
    direccion = "diferente";
    console.log("ESTA ES LA DIFERENCIA---->" + diferencia);
  }

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
        quantity: cantidadMeses,
        description: direccion,
      },
    ],
    external_reference: id_colegio,
    additional_info: email,
    back_urls: {
      //definir las verdaderas aca
      success: "https://www.micole.com.pe/#/dashboardschool",
      failure: "https://www.micole.com.pe/#/dashboardschool",
      pending: "https://www.micole.com.pe/#/dashboardschool",
    },
    notification_url: `https://8b4e-177-246-245-112.ngrok-free.app/payments/notification`,
    // notification_url: `${NGROK_URL}/payments/notification`,
  };
  console.log(preference.payer);
  console.log(preference.items);
  mercadopago.preferences
    .create(preference)
    // le pasamos las preference que definimos de linea 35 a 72
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
