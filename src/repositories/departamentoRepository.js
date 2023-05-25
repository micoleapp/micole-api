const { Departamento } = require('../db');
const cache = require('../helpers/cacheGlobalInstance');

const CACHE_TTL = 86400; // Tiempo de vida de la caché en segundos (1 día)

const getAllDepartamentos = async () => {
  const cacheKey = '/departamentos';
  let departamentos = cache.get(cacheKey);
  if (!departamentos) {
    departamentos = await Departamento.findAll({
      order: [['nombre_departamento', 'ASC']],
    });

    cache.set(cacheKey, departamentos, CACHE_TTL);
  }
  return departamentos;
};

const getDepartamentoById = async (id) => {
  const departamento = await Departamento.findByPk(id);
  if (departamento) {
    return departamento;
  }
  return null;
};

const createProvincia = async (id_pais, nombre_departamento) => {
  const indexDepartamento = await Departamento.findOne({
    order: [['id', 'DESC']],
  });
  const [departamento, created] = await Departamento.findOrCreate({
    where: {
      id: Number(indexDepartamento.id) + 1,
      nombre_departamento,
      PaisId : id_pais,
    },
  });
  return created ? departamento : null;
};

const updateProvincia = async (id, id_pais, nombre_departamento) => {
  const departamento = await Departamento.findByPk(id);
  if (departamento) {
    await Departamento.update({
      nombre_departamento,
      PaisId : id_pais,
    });
    return true;
  }
  return false;
};

const deleteProvincia = async (id) => {
  const departamento = await Departamento.findByPk(id);
  if (departamento) {
    await departamento.destroy();
    return true;
  }
  return false;
};

module.exports = {
  getAllDepartamentos,
  getDepartamentoById,
  createProvincia,
  updateProvincia,
  deleteProvincia,
};
