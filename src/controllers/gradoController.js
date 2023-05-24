const { Grado, Nivel } = require('../db');
const Sequelize = require('sequelize');
const cache = require('../helpers/cacheGlobalInstance');

const getGrados = async (req, res, next) => {
  try {
    const key = req.originalUrl || req.url;
    const grados = await Grado.findAll({
      attributes: ["id", "nombre_grado"],
      order:[["id", "ASC"]]
    });
    cache.set(key, grados, 86400); // Almacenamos la respuesta en caché durante 1 día
    res.status(200).send(grados);
  } catch (error) {
    return next(error);
  }
};

const createGrado = async (req, res, next) => {
  const { nombre_grado, NivelId } = req.body;
  try {
    const indexGrado = await Grado.findOne({
      order: [["id", "DESC"]],
    });
    const [grado, created] = await Grado.findOrCreate({
      where: {
        id: Number(indexGrado.id) + 1,
        nombre_grado: nombre_grado,
      },
    });
    await grado.setNivel(NivelId);
    if (created) {
      res.status(200).json(grado);
    } else {
      return next({
        statusCode: 501,
        message: 'Nivel existente',
      });
    }
  } catch (error) {
    return next(error);
  }
};

const updateGrado = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nombre_grado } = req.body;
    const editedGrado = await Grado.update(
      {
        nombre_grado: nombre_grado,
      },
      { where: { id: id } }
    );
    res.status(200).json(editedGrado);
  } catch (error) {
    return next(error);
  }
};

const deleteGrado = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteGrado = await Grado.findOne({
      where: { id: id },
    });
    await deleteGrado.destroy();
    res.status(200).send({ message: "Grado borrado" });
  } catch (error) {
    return next(error);
  }
};

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
  getGrados,
  createGrado,
  updateGrado,
  deleteGrado,
  getGradosByNivel,
};
