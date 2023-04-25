const { Router } = require("express");
const router = Router();
const { Idioma } = require("../db.js");

//------- PEDIR TODOS LOS IDIOMAS A LA BD--------
router.get("/", async (req, res) => {
  try {
    let idioma;
    idioma = await Idioma.findAll({
      attributes: ["id", "nombre_idioma"],
      order: [["nombre_idioma", "ASC"]],
    });

    res.json(idioma);
  } catch (err) {
    res.json({ err });
  }
});
//------- POST IDIOMA--------
router.post("/", async (req, res) => {
  const { nombre_idioma } = req.body;
  try {
    const ultimoIdioma = await Idioma.findOne({
      order: [["id", "DESC"]],
    });
    const [idioma, created] = await Idioma.findOrCreate({
      where: {
        id: Number(ultimoIdioma.id) + 1,
        nombre_idioma,
      },
    });
    if (created) {
      res.status(200).json(idioma);
    } else {
      res.status(501).json({
        message: "Idioma existente",
      });
    }
  } catch (err) {
    res.status(501).json({
      message: "Idioma existente",
    });
  }
});

//--------------------PUT  IDIOMA-------------------
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_idioma } = req.body;
    const editedIdioma = await Idioma.update(
      {
        nombre_idioma,
      },
      { where: { id: id } }
    );
    res.json(editedIdioma);
  } catch (err) {
    res.status(500).send({ err });
  }
});
//--------------------DELETE IDIOMA--------------------

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedIdioma = await Idioma.findOne({
      where: { id: id },
    });
    await deletedIdioma.destroy();
    res.status(200).send({ message: "Idioma borrado" });
  } catch (err) {
    res.status(500).send({ err });
  }
});

module.exports = router;
