const { Router } = require("express");
const router = Router();
const {Vacante} = require("../db.js");
const { Sequelize } = require("sequelize");

//------- PEDIR EL MAXIMO PRECIO DE CUOTA INGRESO, MATRICULA--------
router.get("/", async (req, res) => {
  try {
    const precios = await Vacante.findAll({
      attributes: [
        [Sequelize.fn('min', Sequelize.col('cuota_pension')), 'cuota_pension_min'],
        [Sequelize.fn('max', Sequelize.col('cuota_pension')), 'cuota_pension_max'],
        [Sequelize.fn('min', Sequelize.col('cuota_ingreso')), 'cuota_ingreso_min'],
        [Sequelize.fn('max', Sequelize.col('cuota_ingreso')), 'cuota_ingreso_max']
      ]
    });
    const resultado = [
      [precios[0].dataValues.cuota_pension_min, precios[0].dataValues.cuota_pension_max],
      [precios[0].dataValues.cuota_ingreso_min, precios[0].dataValues.cuota_ingreso_max]
    ];
    res.status(200).send(resultado);
  } catch (error) {
    return next(error);
  }
});


module.exports = router;
