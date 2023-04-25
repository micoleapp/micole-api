const { Router } = require("express");
const router = Router();
const { Metodos } = require("../db.js");

//------- PEDIR TODOS LOS METODOS A LA BD--------
router.get("/", async (req, res) => {
  try {
    const metodos = await Metodos.findAll({
      attributes: ["id_metodo", "nombre_metodo"],
    });
    res.json(metodos);
  } catch (err) {
    res.json({ err });
  }
});

//------- POST A METODO--------
router.post("/", async (req, res) => {
  const { nombre_metodo } = req.body;
  try {
    const ultimoMetodo = await Metodos.findOne({
      order: [["id_metodo", "DESC"]],
    });
    console.log(ultimoMetodo);
    const [metodo, created] = await Metodos.findOrCreate({
      where: {
        id_metodo:Number(ultimoMetodo.id_metodo)+1,
        nombre_metodo: nombre_metodo,
      },
    });
    if (created) {
      res.status(200).json(metodo);
    } else {
      res.status(501).json({
        message: "Metodo existente",
      });
    }
  } catch (err) {
    res.status(501).json({
      message: "Metodo existente",
    });
  }
});

//--------------------PUT  UN PRODUCTO DEL METODO--------------------
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_metodo } = req.body;
    const editedMetodo = await Metodos.update(
      {
        nombre_metodo: nombre_metodo,
      },
      { where: { id_metodo: id } }
    );
    res.json(editedMetodo);
  } catch (err) {
    res.status(500).send({ err });
  }
});
//--------------------DELETE METODO--------------------

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteMetodo = await Metodos.findOne({ where: { id_metodo: id } });
    await deleteMetodo.destroy();
    res.status(200).send({ message: "Metodo borrado" });
  } catch (err) {
    res.status(500).send({ err });
  }
});

module.exports = router;
