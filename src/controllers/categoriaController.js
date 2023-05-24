const { Categoria } = require('../db');
const cache = require('../helpers/cacheGlobalInstance');

const getCategorias = async (req, res, next) => {
  try {
    const key = req.originalUrl || req.url;
    const categorias = await Categoria.findAll({
      attributes: [
        'id',
        'nombre_categoria',
        'imagen_categoria',
        'logo_categoria',
      ],
    });
    cache.set(key, categorias, 86400); // Almacenamos la respuesta en caché durante 1 día
    res.status(200).send(categorias);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getCategorias,
};
