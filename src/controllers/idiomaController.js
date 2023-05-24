const { Idioma } = require('../db');
const cache = require('../helpers/cacheGlobalInstance');

const getIdiomas = async (req, res, next) => {
  try {
    const key = req.originalUrl || req.url;
    const idiomas = await Idioma.findAll({
      attributes: ["id", "nombre_idioma"],
      order: [["nombre_idioma", "ASC"]],
    });
    cache.set(key, idiomas, 86400); // Almacenamos la respuesta en caché durante 1 día
    res.status(200).send(idiomas);
  } catch (error) {
    return next(error);
  }
};

const createIdioma = async (req, res, next) => {
  const { nombre_idioma } = req.body;
  try {
    const indexIdioma = await Idioma.findOne({
      order: [["id", "DESC"]],
    });
    const [idioma, created] = await Idioma.findOrCreate({
      where: {
        id: Number(indexIdioma.id) + 1,
        nombre_idioma: nombre_idioma,
      },
    });
    if (created) {
      res.status(200).json(idioma);
    } else {
      return next({
        statusCode: 501,
        message: 'Idioma existente',
      });
    }
  } catch (error) {
    return next(error);
  }
};

const updateIdioma = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nombre_idioma } = req.body;
    const editedIdioma = await Idioma.update(
      {
        nombre_idioma: nombre_idioma,
      },
      { where: { id: id } }
    );
    res.status(200).json(editedIdioma);
  } catch (error) {
    return next(error);
  }
};

const deleteIdioma = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedIdioma = await Idioma.findOne({
      where: { id: id },
    });
    await deletedIdioma.destroy();
    res.status(200).send({ message: "Idioma borrado" });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getIdiomas,
  createIdioma,
  deleteIdioma,
  updateIdioma,
};
