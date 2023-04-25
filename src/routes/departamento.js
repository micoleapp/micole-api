const { Router } = require("express");
const router = Router();
const { Departamento, Pais } = require("../db.js");
// const getComponentData = require("../funciones/getComponentData.js");
// const ratingProm = require("../funciones/ratingProm.js");

//------- PEDIR TODOS LOS DEPARTAMENTOS A LA BD--------
router.get("/", async (req, res) => {
  try {
    let departamento;
    departamento = await Departamento.findAll();

    res.json(departamento);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//------- POST A DEPARTAMENTO--------
router.post("/", async (req, res) => {
  const { nombre_departamento, id_pais } = req.body;
  try {
    const ultimoDepartameto = await Departamento.findOne({
      order: [["id", "DESC"]],
    });
    const [departament, created] = await Departamento.findOrCreate({
      where: {
        nombre_departamento: nombre_departamento,
        id:Number(ultimoDepartameto.id)+1,
        PaisId:id_pais
      },
    });
    if (created) {
      
      res.status(200).json(departament);
    } else {
      res.status(501).json({
        message: "Departamento existente",
      });
    }
  } catch (err) {
    res.status(501).json({
      message: "Departamento existente",
    });
  }
});

//--------------------PUT  DEPARTAMENTO-------------------
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_departamento,id_pais } = req.body;
    const editedDepartamento = await Departamento.update(
      {
        nombre_departamento: nombre_departamento,
        PaisId:id_pais
      },
      { where: { id: id } }
    );
    res.json(editedDepartamento);
  } catch (err) {
    res.status(500).send({ err });
  }
});
//--------------------DELETE DEPARTAMENTO--------------------

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteDepartamento = await Departamento.findOne({
      where: { id: id },
    });
    await deleteDepartamento.destroy();
    res.status(200).send({ message: "Departamento borrado" });
  } catch (err) {
    res.status(500).send({ err });
  }
});
module.exports = router;
