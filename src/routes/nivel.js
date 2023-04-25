const { Router } = require("express");
const router = Router();
const { Nivel } = require("../db.js");

//------- PEDIR TODOS LOS NIVELES A LA BD--------
router.get("/", async (req, res) => {
  try {
    let nivel;
    nivel = await Nivel.findAll({
      attributes: ["id", "nombre_nivel"],
    });

    res.json(nivel);
  } catch (err) {
    res.json({ err });
  }
});
//------- POST A NIVEL--------
router.post("/", async (req, res) => {
  const { nombre_nivel } = req.body;
  try {
    const ultimoNivel = await Nivel.findOne({
      order: [["id", "DESC"]],
    });
    const [nivel, created] = await Nivel.findOrCreate({
      where: {
        id:Number(ultimoNivel.id)+1,
        nombre_nivel: nombre_nivel,
      },
    });
    if (created) {
      res.status(200).json(nivel);
    } else {
      res.status(500).json({ message: "Nivel existente" });
    }
  } catch (err) {
    res.status(501).json({
      message: "Nivel existente",
    });
  }
});
//--------------------PUT  NIVEL-------------------
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_nivel } = req.body;
    const editedNivel = await Nivel.update(
      {
        nombre_nivel: nombre_nivel,
      },
      { where: { id: id } }
    );
    res.json(editedNivel);
  } catch (err) {
    res.status(500).send({ err });
  }
});
//--------------------DELETE NIVEL--------------------

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteNivel = await Nivel.findOne({
      where: { id: id },
    });
    await deleteNivel.destroy();
    res.status(200).send({ message: "Nivel borrado" });
  } catch (err) {
    res.status(500).send({ err });
  }
});
module.exports = router;
