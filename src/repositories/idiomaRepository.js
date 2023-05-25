const { Idioma } = require('../db');
const cache = require('../helpers/cacheGlobalInstance');

const CACHE_TTL = 86400; // Tiempo de vida de la caché en segundos (1 día)

const getAllIdiomas = async () => {
  const cacheKey = '/idiomas';
  let idiomas = cache.get(cacheKey);
  if (!idiomas) {
    idiomas = await Idioma.findAll({
      attributes: ['id', 'nombre_idioma'],
      order: [['nombre_idioma', 'ASC']],
    });

    cache.set(cacheKey, idiomas, CACHE_TTL);
  }
  return idiomas;
};

const getIdiomaById = async (id) => {
  const idioma = await Idioma.findByPk(id);
  if (idioma) {
    return idioma;
  }
  return null;
};

const createIdioma = async (nombre_idioma) => {
  const indexIdioma = await Idioma.findOne({
    order: [['id', 'DESC']],
  });

  const [idioma, created] = await Idioma.findOrCreate({
    where: {
      id: Number(indexIdioma.id) + 1,
      nombre_idioma,
    },
  });
  return created ? idioma : null;
};

const updateIdioma = async (id, nombre_idioma) => {
  const idioma = await Idioma.findByPk(id);
  if (idioma) {
    await idioma.update({
      nombre_idioma,
    });
    return true;
  }
  return false;
};

const deleteIdioma = async (id) => {
  const idioma = await Idioma.findByPk(id);
  if (idioma) {
    await idioma.destroy();
    return true;
  }
  return false;
};

module.exports = {
  getAllIdiomas,
  getIdiomaById,
  createIdioma,
  updateIdioma,
  deleteIdioma,
};
