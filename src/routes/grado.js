const { Router } = require("express");
const { getGradosByNivel } = require("../controllers/gradoController.js");
const router = Router();
const { Grado, Nivel } = require("../db.js");

//------- PEDIR TODOS LOS GRADOS A LA BD--------
router.get("/", async (req, res) => {
  try {
    let grado;
    grado = await Grado.findAll({
      attributes: ["id", "nombre_grado"],
      order:[["id", "ASC"]]
    });

    res.json(grado);
  } catch (err) {
    res.json({ err });
  }
});
//------- POST A GRADO--------
router.post("/", async (req, res) => {
  const { nombre_grado, NivelId } = req.body;
  try {
    const ultimoGrado = await Grado.findOne({
      order: [["id", "DESC"]],
    });
    const [grado, created] = await Grado.findOrCreate({
      where: {
        id: Number(ultimoGrado.id) + 1,
        nombre_grado: nombre_grado,
      },
    });
    await grado.setNivel(NivelId);
    if (created) {
      res.status(200).json(grado);
    } else {
      res.status(501).json({
        message: "Nivel existente",
      });
    }
  } catch (err) {
    res.status(501).json({
      message: "Nivel existente",
    });
  }
});

//--------------------PUT  GRADO-------------------
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_grado } = req.body;
    const editedGrado = await Grado.update(
      {
        nombre_grado: nombre_grado,
      },
      { where: { id: id } }
    );
    res.json(editedGrado);
  } catch (err) {
    res.status(500).send({ err });
  }
});
//--------------------DELETE GRADO--------------------

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteGrado = await Grado.findOne({
      where: { id: id },
    });
    await deleteGrado.destroy();
    res.status(200).send({ message: "Grado borrado" });
  } catch (err) {
    res.status(500).send({ err });
  }
});

router.post("/vacantes", getGradosByNivel);

module.exports = router;
