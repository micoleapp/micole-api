const { Router } = require("express");
const { getGradosByNivel } = require("../controllers/gradoController.js");
const router = Router();
const { Ventas, Plan_Pago } = require("../db.js");

//------- PEDIR TODAS LAS VENTAS A UN COLEGIO A LA BD--------
router.get("/", async (req, res) => {
  try {
    const { id } = req.query;
    console.log(id);
    let venta;
    venta = await Ventas.findAll({
      include: [
        {
          model: Plan_Pago,
          attributes: ["id", "nombre_plan_pago"],
        },
      ],
      attributes: [
        "id",
        "totalprice",
        "status",
        "months",
        "InicioPlan",
        "vencimientoPlan",
        "activo",
      ],
      where: {
        ColegioId: id,
      },
    });
    console.log(venta);
    venta.sort((x, y) => x.activo - y.activo);

    res.json(venta);
  } catch (err) {
    res.json({ err });
  }
});

// router.post("/vacantes", getGradosByNivel);

module.exports = router;
