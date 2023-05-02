const { Router } = require("express");
const router = Router();
const {
  Colegio,
  Infraestructura,
  Afiliacion,
  Dificultades,
  Distrito,
  Categoria,
  Metodos,
} = require("../db.js");

//------- PEDIR UNO DE LOS COLEGIOS POR ID PARA EL COMPARADOR--------
router.get("/:Colegio_id", async (req, res) => {
  try {
    const { Colegio_id } = req.params;
    console.log(Colegio_id);
    const totalInfraestructuras = await Colegio.findAll({
      where: { id: [Colegio_id] },
      attributes: ["nombre_colegio"],
      include: [
        {
          model: Infraestructura,
          attributes: ["nombre_infraestructura"],
          through: {
            attributes: [],
          },
        },
      ],
    });
    const totalAfiliacion = await Colegio.findAll({
      where: { id: [Colegio_id] },
      attributes: ["nombre_colegio"],
      include: [
        {
          model: Afiliacion,
          attributes: ["nombre_afiliacion"],
          through: {
            attributes: [],
          },
        },
      ],
    });
    const totalInfra = totalInfraestructuras[0].Infraestructuras.length;
    const totalAfil = totalAfiliacion[0].Afiliacions.length;

    console.log(totalInfraestructuras);
    const cole = await Colegio.findAll({
      where: { id: [Colegio_id] },
      attributes: [
        "id",
        "nombre_colegio",
        "direccion",
        "numero_estudiantes",
        "primera_imagen",
        "galeria_fotos",
        "area",
        "rating",
        "logo",
      ],
      include: [
        {
          model: Distrito,
          attributes: ["nombre_distrito"],
        },
        {
          model: Categoria,
          attributes: ["nombre_categoria"],
          through: {
            attributes: [],
          },
        },
        {
          model: Dificultades,
          attributes: ["nombre_dificultad"],
        },
        {
          model: Metodos,
          attributes: ["nombre_metodo"],
        },
      ],
    });
    res.json({
      Colegio: cole,
      CountInfraestructuras: totalInfra,
      CountAfiliaciones: totalAfil,
    });
  } catch (err) {
    res.json({ err });
  }
});

module.exports = router;