const { Nivel } = require('../db');
const cache = require('../helpers/cacheGlobalInstance');

const getNiveles = async (req, res, next) => {
  try {
    const key = req.originalUrl || req.url;
    const niveles = await Nivel.findAll();
    cache.set(key, niveles, 86400); // Almacenamos la respuesta en caché durante 1 día
    res.status(200).send(niveles);
  } catch (error) {
    return next(error);
  }
};

const createNivel = async (req, res, next) => {
  const { nombre_nivel } = req.body;
  try {
    const indexNivel = await Nivel.findOne({
      order: [["id", "DESC"]],
    });
    const [nivel, created] = await Nivel.findOrCreate({
      where: {
        id:Number(indexNivel.id)+1,
        nombre_nivel: nombre_nivel,
      },
    });
    if (created) {
      res.status(200).json(nivel);
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

const updateNivel = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nombre_nivel } = req.body;
    const editedNivel = await Nivel.update(
      {
        nombre_nivel: nombre_nivel,
      },
      { where: { id: id } }
    );
    res.status(200).json(editedNivel);
  } catch (error) {
    return next(error);
  }
};

const deleteNivel = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteNivel = await Nivel.findOne({
      where: { id: id },
    });
    await deleteNivel.destroy();
    res.status(200).send({ message: "Nivel borrado" });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getNiveles,
  createNivel,
  deleteNivel,
  updateNivel,
};
