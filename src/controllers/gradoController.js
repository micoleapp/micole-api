const { Grado, Nivel } = require('../db');
const Sequelize = require('sequelize');

const getGradosByNivel = async (req, res, next) => {
  const { niveles } = req.body;
  try {
    const promises = niveles.map((nivel) =>
      Grado.findAll({
        where: { NivelId: nivel.id },
        include: [Nivel],
        attributes: [
          'id',
          'nombre_grado',
          'NivelId',
          [Sequelize.col('Nivel.nombre_nivel'), 'nombre_nivel'],
        ],
      })
    );
    const resultados = await Promise.all(promises);
    const grados = resultados.flat();
    const sanitizedGrados = grados.map((grado) => {
      return {
        GradoId: grado.id,
        nombre_grado: grado.nombre_grado,
        NivelId: grado.NivelId,
        nombre_nivel: grado.Nivel.nombre_nivel,
      };
    });
    res.status(200).send(sanitizedGrados);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getGradosByNivel,
};
