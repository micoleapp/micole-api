const { Departamento } = require('../db');
const cache = require('../helpers/cacheGlobalInstance');

const getDepartamentos = async (req, res, next) => {
  try {
    const key = req.originalUrl || req.url;
    const departamentos = await Departamento.findAll();
    cache.set(key, departamentos, 86400); // Almacenamos la respuesta en caché durante 1 día
    res.status(200).send(departamentos);
  } catch (error) {
    return next(error);
  }
};

const createDepartamento = async (req, res, next) => {
  const { nombre_departamento,id_pais } = req.body;
  try {
    const indexDepartamento = await Departamento.findOne({
      order: [["id", "DESC"]],
    });
    const [departamento, created] = await Departamento.findOrCreate({
      where: {
        id:Number(indexDepartamento.id)+1,
        nombre_departamento: nombre_departamento,
        PaisId:id_pais
      },
    });
    if (created) {
      res.status(200).json(departamento);
    } else {
      return next({
        statusCode: 501,
        message: 'Departamento existente',
      });
    }
  } catch (error) {
    return next(error);
  }
};

const updateDepartamento = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nombre_departamento,id_pais } = req.body;
    const editedDepartamento = await Departamento.update(
      {
        nombre_departamento: nombre_departamento,
        PaisId:id_pais
      },
      { where: { id: id } }
    );
    res.status(200).json(editedDepartamento);
  } catch (error) {
    return next(error);
  }
};

const deleteDepartamento = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteDepartamento = await Departamento.findOne({
      where: { id: id },
    });
    await deleteDepartamento.destroy();
    res.status(200).send({ message: "Departamento borrado" });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getDepartamentos,
  createDepartamento,
  deleteDepartamento,
  updateDepartamento,
};
