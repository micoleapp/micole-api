const { Pais } = require('../db');
const cache = require('../helpers/cacheGlobalInstance');

const getPaises = async (req, res, next) => {
  try {
    const key = req.originalUrl || req.url;
    const paises = await Pais.findAll();
    cache.set(key, paises, 86400); // Almacenamos la respuesta en caché durante 1 día
    res.status(200).send(paises);
  } catch (error) {
    return next(error);
  }
};

const createPais = async (req, res, next) => {
  const { nombre_pais } = req.body;
  try {
    const indexPais = await Pais.findOne({
      order: [["id", "DESC"]],
    });
    const [pais, created] = await Pais.findOrCreate({
      where: {
        id:Number(indexPais.id)+1,
        nombre_pais: nombre_pais,
      },
    });
    if (created) {
      res.status(200).json(pais);
    } else {
      return next({
        statusCode: 501,
        message: 'Pais existente',
      });
    }
  } catch (error) {
    return next(error);
  }
};

const updatePais = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nombre_pais } = req.body;
    const editedPais = await Pais.update(
      {
        nombre_pais: nombre_pais,
      },
      { where: { id: id } }
    );
    res.status(200).json(editedPais);
  } catch (error) {
    return next(error);
  }
};

const deletePais = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletePais = await Pais.findOne({
      where: { id: id },
    });
    await deletePais.destroy();
    res.status(200).send({ message: "País borrado" });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getPaises,
  createPais,
  deletePais,
  updatePais,
};
