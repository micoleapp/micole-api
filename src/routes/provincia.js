const { Router } = require("express");
const router = Router();
const {Provincia,Departamento} = require("../db.js");

//------- PEDIR TODOS LOS COLEGIOS A LA BD--------
router.get("/", async (req, res) => {
  let response = [];
  try {
    let provincia;
    provincia = await Provincia.findAll();

    res.send(provincia);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//------- POST A PROVINCIA--------
router.post("/", async (req, res) => {
  const { nombre_provincia,departamentoId } = req.body;
  try {
    const ultimaProvincia = await Provincia.findOne({
      order: [["id", "DESC"]],
    });
    const [provincia, created] = await Provincia.findOrCreate({
      where: {
        id:Number(ultimaProvincia.id)+1,
        nombre_provincia: nombre_provincia,
      },
    });
    await provincia.setDepartamento(departamentoId);
    if (created) {
      res.status(200).json(provincia);
    } else {
      res.status(501).json({
        message: "Provincia existente",
      });
    }
  } catch (err) {
    res.status(501).json({
      message: "Provincia existente",
    });
  }
});

//--------------------PUT  PROVINCIA-------------------
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_provincia,departamentoId } = req.body;
    const editedProvincia = await Provincia.update(
      {
        nombre_provincia: nombre_provincia,
        DepartamentoId:departamentoId
      },
      { where: { id: id } }
    );
    // await editedProvincia.setDepartamento(departamentoId);
    res.json(editedProvincia);
  } catch (err) {
    res.status(500).send({ err });
  }
});
//--------------------DELETE PROVINCIA--------------------

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteProvincia = await Provincia.findOne({
      where: { id: id },
    });
    await deleteProvincia.destroy();
    res.status(200).send({ message: "Provincia borrada" });
  } catch (err) {
    res.status(500).send({ err });
  }
});

module.exports = router;
