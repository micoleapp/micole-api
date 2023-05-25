const { Pais } = require('../db');
const cache = require('../helpers/cacheGlobalInstance');

const CACHE_TTL = 86400; // Tiempo de vida de la caché en segundos (1 día)

const getAllPaises = async () => {
  const cacheKey = '/paises';
  let paises = cache.get(cacheKey);
  if (!paises) {
    paises = await Pais.findAll({
      order: [['nombre_pais', 'ASC']],
    });

    cache.set(cacheKey, paises, CACHE_TTL);
  }
  return paises;
};

const getPaisById = async (id) => {
  const pais = await Pais.findByPk(id);
  if (pais) {
    return pais;
  }
  return null;
};

const createPais = async (nombre_pais) => {
  const indexPais = await Pais.findOne({
    order: [["id", "DESC"]],
  });
  const [pais, created] = await Pais.findOrCreate({
    where: {
      id:Number(indexPais.id)+1,
      nombre_pais,
    },
  });
  return created ? pais : null;
};

const updatePais = async (id, nombre_pais) => {
  const pais = await Pais.findByPk(id);
  if (pais) {
    await Pais.update({
      nombre_pais,
    });
    return true;
  }
  return false;
};

const deletePais = async (id) => {
  const pais = await Pais.findByPk(id);
  if (pais) {
    await pais.destroy();
    return true;
  }
  return false;
};

module.exports = {
  getAllPaises,
  getPaisById,
  createPais,
  updatePais,
  deletePais,
};
