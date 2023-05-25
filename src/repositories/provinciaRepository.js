const { Provincia } = require('../db');
const cache = require('../helpers/cacheGlobalInstance');

const CACHE_TTL = 86400; // Tiempo de vida de la caché en segundos (1 día)

const getAllProvincias = async () => {
  const cacheKey = '/provincias';
  let provincias = cache.get(cacheKey);
  if (!provincias) {
    provincias = await Provincia.findAll({
      order: [['nombre_provincia', 'ASC']],
    });

    cache.set(cacheKey, provincias, CACHE_TTL);
  }
  return provincias;
};

const getProvinciaById = async (id) => {
  const provincia = await Provincia.findByPk(id);
  if (provincia) {
    return provincia;
  }
  return null;
};

const createProvincia = async (departamentoId, nombre_provincia) => {
  const indexProvincia = await Provincia.findOne({
    order: [['id', 'DESC']],
  });
  const [provincia, created] = await Provincia.findOrCreate({
    where: {
      id: Number(indexProvincia.id) + 1,
      nombre_provincia,
      DepartamentoId : departamentoId,
    },
  });
  return created ? provincia : null;
};

const updateProvincia = async (id, departamentoId, nombre_provincia) => {
  const provincia = await Provincia.findByPk(id);
  if (provincia) {
    await Provincia.update({
      nombre_provincia,
      DepartamentoId : departamentoId,
    });
    return true;
  }
  return false;
};

const deleteProvincia = async (id) => {
  const provincia = await Provincia.findByPk(id);
  if (provincia) {
    await provincia.destroy();
    return true;
  }
  return false;
};

module.exports = {
  getAllProvincias,
  getProvinciaById,
  createProvincia,
  updateProvincia,
  deleteProvincia,
};
