const { Router } = require("express");
const router = Router();
const { Categoria } = require("../db.js");

//------- PEDIR TODOS LAS CATEGORIAS A LA BDatos--------
router.get("/", async (req, res) => {
  try {
    let categoria;
    categoria = await Categoria.findAll({
      attributes: [
        "id",
        "nombre_categoria",
        "imagen_categoria",
        "logo_categoria",
      ],
    });

    res.json(categoria);
  } catch (err) {
    res.json({ err });
  }
});

module.exports = router;
