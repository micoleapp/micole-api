const { Distrito } = require('../db');
const cache = require('../helpers/cacheGlobalInstance');

const CACHE_TTL = 86400; // Tiempo de vida de la caché en segundos (1 día)

const getAllDistritos = async () => {
  const cacheKey = '/distritos';
  let distritos = cache.get(cacheKey);
  if (!distritos) {
    distritos = await Distrito.findAll({
      order: [['nombre_distrito', 'ASC']],
    });

    cache.set(cacheKey, distritos, CACHE_TTL);
  }
  return distritos;
};

const getDistritoById = async (id) => {
  const distrito = await Distrito.findByPk(id);
  if (distrito) {
    return distrito;
  }
  return null;
};

const createDistrito = async (ProvinciaId, nombre_distrito) => {
  const indexDistrito = await Distrito.findOne({
    order: [['id', 'DESC']],
  });
  const [distrito, created] = await Distrito.findOrCreate({
    where: {
      id: Number(indexDistrito.id) + 1,
      nombre_distrito,
      ProvinciaId,
    },
  });
  return created ? distrito : null;
};

const updateDistrito = async (id, ProvinciaId, nombre_distrito) => {
  const distrito = await Distrito.findByPk(id);
  if (distrito) {
    await distrito.update({
      nombre_distrito,
      ProvinciaId,
    });
    return true;
  }
  return false;
};

const deleteDistrito = async (id) => {
  const distrito = await Distrito.findByPk(id);
  if (distrito) {
    await distrito.destroy();
    return true;
  }
  return false;
};

module.exports = {
  getAllDistritos,
  getDistritoById,
  createDistrito,
  updateDistrito,
  deleteDistrito,
};
