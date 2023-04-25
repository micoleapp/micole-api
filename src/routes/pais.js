const { Router } = require("express");
const router = Router();
const { Pais } = require("../db.js");


//------- PEDIR TODOS LOS COLEGIOS A LA BD--------
router.get("/", async (req, res) => {
  try {
    let pais;
    pais = await Pais.findAll({
      attributes: ["id", "nombre_pais"],
    });

    res.send(pais);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//------- POST A ALMACEN--------
router.post("/", async (req, res) => {
  const { nombre_pais } = req.body;
  try {
    const ultimoPais = await Pais.findOne({
      order: [["id", "DESC"]],
    });
    const [pais, created] = await Pais.findOrCreate({
      where: {
        id:Number(ultimoPais.id)+1,
        nombre_pais: nombre_pais,
      },
    });
    if (created) {
      res.status(200).json(pais);
    } else {
      res.status(500).json({ message: "Pais existente" });
    }
  } catch (err) {
    res.status(500).json({message: "Pais existente" });
  }
});

//--------------------PUT  UN PRODUCTO DEL ALMACEN--------------------
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_pais } = req.body;
    const editedPais = await Pais.update(
      {
        nombre_pais: nombre_pais,
      },
      { where: { id: id } }
    );
    res.json(editedPais);
  } catch (err) {
    res.status(500).send({ err });
  }
});
//--------------------DELETE UN PAIS--------------------

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletePais = await Pais.findOne({ where: { id: id } });
    await deletePais.destroy();
    res.status(200).send({ message: "País borrado" });
  } catch (err) {
    res.status(500).send({
      message: "El país no pudo ser borrado",
    });
  }
});
module.exports = router;
