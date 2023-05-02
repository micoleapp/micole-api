const { Router } = require("express");
const payController = require("../controllers/payController");
const { Colegio, Ventas, Plan_Pago } = require("../db.js");
const mailer = require("../utils/sendMails/mailer");
const mercadopago = require("mercadopago");
const router = Router();

router.get("/success", (req, res) => {
  res.send("Todo bien al 100");
});
router.post("/notification", async (req, res) => {
  const { query } = req;
  const topic = query.topic;

  var merchantOrder;
  var ventas;
  var colegio;
  var fecha;
  var planVencido;
  var today = new Date();
  var fechaHoy = today.toISOString().split("T")[0];
  var mesesAcumulados;

  switch (topic) {
    case "payment":
      const paymentId = query.id;
      const payment = await mercadopago.payment.findById(paymentId);

      merchantOrder = await mercadopago.merchant_orders.findById(
        payment.body.order.id
      );

      ventas = await Ventas.findOne({
        where: {
          mp_merchantOrder_id: [merchantOrder.body.id],
        },
      });
      console.log(merchantOrder.body);

      if (ventas && ventas.status === "Pending") {
        if (merchantOrder.body.payments[0].status === "approved") {
          ventas.status = "Paid";
          ventas.mp_payment_id = paymentId;
          ventas.InicioPlan = merchantOrder.body.payments[0].date_approved;
          ventas.months = merchantOrder.body.items[0].quantity;
          ventas.PlanPagoId = merchantOrder.body.items[0].id;

          const description = merchantOrder.body.items[0].description;
          const plan = merchantOrder.body.items[0].id;
          const planNombre = merchantOrder.body.items[0].title;
          const idColegio = merchantOrder.body.external_reference;
          const email = merchantOrder.body.additional_info;
          //caso 1 compra por primera vez
          // caso 2 compra el mismo plan
          planVencido = await Ventas.findOne({
            where: {
              ColegioId: idColegio,
              activo: true,
            },
          });
          //se comprueba si existen compras anteriores y también si no a caducado la compra anterior, para sumar los meses faltantes
          //a los de la compra anterior
          if (description === "igual") {
            if (
              planVencido !== null &&
              fechaHoy <= planVencido.vencimientoPlan
            ) {
              fecha = new Date(planVencido.vencimientoPlan);
              fecha.setMonth(
                fecha.getMonth() + Number(merchantOrder.body.items[0].quantity)
              );
              ventas.accumulated_months =
                ventas.accumulated_months +
                Number(merchantOrder.body.items[0].quantity);
            } else {
              //si ya venció se deja la fecha de compra mas los meses comprados
              fecha = merchantOrder.body.payments[0].date_approved;
              fecha = new Date(fecha);

              fecha.setMonth(
                fecha.getMonth() + Number(merchantOrder.body.items[0].quantity)
              );
              ventas.accumulated_months = Number(
                merchantOrder.body.items[0].quantity
              );
            }
          } else {
            fecha = planVencido.vencimientoPlan;
          }
          if (planVencido !== null) planVencido.activo = false;
          await ventas.setPlan_Pago(plan);
          await ventas.setColegio(idColegio);

          colegio = await Colegio.findOne({ where: { id: idColegio } });
          if (colegio.mes_prueba === true) {
            fecha.setMonth(fecha.getMonth() + Number(1));
            colegio.mes_prueba = false;
            await colegio.save();
          }
          ventas.vencimientoPlan = fecha;
          await colegio.setPlan_Pago(plan);
          await ventas.save();
          if (planVencido !== null) await planVencido.save();
          // AQUI SE MANDA  EL CORREO DE QUE SE COMPRO EXITOSAMENTE <-----------------------
          // la informacion la optienes de colegio.nombre_colegio """colegio.nombre del plan"""
          // planNombre
          mailer.sendPaymentSuccess(
            email,
            colegio.nombre_colegio,
            colegio.PlanPagoId
          );
          res.status(200).send(merchantOrder);
        }
      } else if (merchantOrder.body.payments[0].status === "canceled") {
        ventas.status = "Canceled";
        ventas.mp_payment_id = paymentId;
        await ventas.save();
        // AQUI SE MANDA  EL CORREO DE QUE SE CANCELO LA COMPRA <-----------------------
        // la informacion la optienes de colegio.nombre_colegio """colegio.nombre del plan"""
        mailer.sendPaymentCanceled(
          email,
          colegio.nombre_colegio,
          colegio.PlanPagoId
        );
        res.status(200).send(merchantOrder);
      }

      break;

    case "merchant_order":
      const orderId = query.id;
      merchantOrder = await mercadopago.merchant_orders.findById(orderId);

      ventas = await Ventas.findOrCreate({
        where: {
          mp_merchantOrder_id: [merchantOrder.body.id],
          totalprice: [merchantOrder.body.total_amount],
        },
      });

      ventas = await Ventas.findOne({
        where: {
          mp_merchantOrder_id: [merchantOrder.body.id],
        },
      });
      res.status(200).send(merchantOrder);
      break;
  }
});
// nuevo endpoint para caso 4 bajar a free
router.post("/", payController);

module.exports = router;
