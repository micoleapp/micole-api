const { Metodos } = require('../db');
const cache = require('../helpers/cacheGlobalInstance');

const getMetodos = async (req, res, next) => {
  try {
    const key = req.originalUrl || req.url;
    const metodos = await Metodos.findAll({
      attributes: ["id_metodo", "nombre_metodo"],
    });
    cache.set(key, metodos, 21600); // Almacenamos la respuesta en caché durante 6 horas
    res.status(200).send(metodos);
  } catch (error) {
    return next(error);
  }
};

const createMetodo = async (req, res, next) => {
  const { nombre_metodo } = req.body;
  try {
    const indexMetodo = await Metodos.findOne({
      order: [["id_metodo", "DESC"]],
    });
    const [metodo, created] = await Metodos.findOrCreate({
      where: {
        id_metodo:Number(indexMetodo.id_metodo)+1,
        nombre_metodo: nombre_metodo,
      },
    });
    if (created) {
      res.status(200).json(metodo);
    } else {
      return next({
        statusCode: 501,
        message: 'Metodo existente',
      });
    }
  } catch (error) {
    return next(error);
  }
};

const updateMetodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nombre_metodo } = req.body;
    const editedMetodo = await Metodos.update(
      {
        nombre_metodo: nombre_metodo,
      },
      { where: { id_metodo: id } }
    );
    res.status(200).json(editedMetodo);
  } catch (error) {
    return next(error);
  }
};

const deleteMetodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteMetodo = await Metodos.findOne({
      where: { id_metodo: id },
    });
    await deleteMetodo.destroy();
    res.status(200).send({ message: "Metodo borrado" });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getMetodos,
  createMetodo,
  deleteMetodo,
  updateMetodo,
};
