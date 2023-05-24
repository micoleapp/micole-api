const { Dificultades } = require('../db');
const cache = require('../helpers/cacheGlobalInstance');

const getDificultades = async (req, res, next) => {
  try {
    const key = req.originalUrl || req.url;
    const dificultades = await Dificultades.findAll();
    cache.set(key, dificultades, 21600); // Almacenamos la respuesta en caché durante 6 horas
    res.status(200).send(dificultades);
  } catch (error) {
    return next(error);
  }
};

const createDificultad = async (req, res, next) => {
  const { nombre_dificultad } = req.body;
  try {
    const indexDificultad = await Dificultades.findOne({
      order: [["id_dificultad", "DESC"]],
    });
    const [dificultad, created] = await Dificultades.findOrCreate({
      where: {
        id_dificultad: Number(indexDificultad.id_dificultad) + 1,
        nombre_dificultad: nombre_dificultad,
      },
    });
    if (created) {
      res.status(200).json(dificultad);
    } else {
      return next({
        statusCode: 501,
        message: 'Dificultad existente',
      });
    }
  } catch (error) {
    return next(error);
  }
};

const updateDificultad = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nombre_dificultad } = req.body;
    const editedDificultad = await Dificultades.update(
      {
        nombre_dificultad: nombre_dificultad,
      },
      { where: { id_dificultad: id } }
    );
    res.status(200).json(editedDificultad);
  } catch (error) {
    return next(error);
  }
};

const deleteDificultad = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteDificultad = await Dificultades.findOne({
      where: { id_dificultad: id },
    });
    await deleteDificultad.destroy();
    res.status(200).send({ message: "Dificultad borrada" });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getDificultades,
  createDificultad,
  deleteDificultad,
  updateDificultad,
};
