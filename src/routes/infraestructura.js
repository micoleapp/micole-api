const { Router } = require("express");
const router = Router();
const { Infraestructura, Infraestructura_tipo,Colegio } = require("../db.js");

//------- PEDIR TODOS LAS INFRAESTRUCTURAS A LA BD--------
router.get("/", async (req, res) => {
  try {
    let infraestructura;
    infraestructura = await Infraestructura.findAll({
      include: [
        {
          model: Infraestructura_tipo,
          attributes: ["infraestructura_tipo"],
        },
      ],
      attributes: [
        "id",
        "nombre_infraestructura",
        "imagen",
        "InfraestructuraTipoId",
      ],
      order: [["nombre_infraestructura", "ASC"]],
    });

    res.json(infraestructura);
  } catch (err) {
    res.json({ err });
  }
});

//------- POST A INFRAESTRUCTURA-------
router.post("/", async (req, res) => {
  const { nombre_infraestructura, imagen, categoriaId } = req.body;
  try {
    const ultimaInfraestructura = await Infraestructura.findOne({
      order: [["id", "DESC"]],
    });
    const [infraestructura, created] = await Infraestructura.findOrCreate({
      where: {
        id: Number(ultimaInfraestructura.id) + 1,
        nombre_infraestructura: nombre_infraestructura,
        slug: nombre_infraestructura,
        imagen: imagen,
      },
    });
    await infraestructura.setInfraestructura_tipo(categoriaId);
    if (created) {
      res.status(200).json(infraestructura);
    } else {
      res.status(501).json({
        message: "Infraestructura existente",
      });
    }
  } catch (err) {
    res.status(501).json({
      message: "Infraestructura existente",
    });
  }
});

//--------------------PUT  INFRAESTRUCTURA--------------------
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_infraestructura, categoriaId, imagen } = req.body;
    const editedInfra = await Infraestructura.update(
      {
        nombre_infraestructura: nombre_infraestructura,
        imagen: imagen,
        InfraestructuraTipoId: categoriaId,
      },
      { where: { id: id } }
    );
    res.json(editedInfra);
  } catch (err) {
    res.status(500).send({ err });
  }
});
//--------------------DELETE UNA INFRAESTRUCTURA--------------------

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteInfra = await Infraestructura.findOne({ where: { id: id } });
    await deleteInfra.destroy();
    res.status(200).send({ message: "Infraestructura borrada" });
  } catch (err) {
    res.status(500).send({ err });
  }
});

module.exports = router;
