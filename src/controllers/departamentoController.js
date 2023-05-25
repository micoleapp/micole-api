const departamentoRepository = require("../repositories/departamentoRepository");

const getDepartamentos = async (_, res, next) => {
  try {
    const departamentos = await departamentoRepository.getAllDepartamentos();
    res.status(200).send(departamentos);
  } catch (error) {
    return next(error);
  }
};

const createDepartamento = async (req, res, next) => {
  const { nombre_departamento,id_pais } = req.body;
  try {
    const departamento = await departamentoRepository.createDepartamento(id_pais, nombre_departamento);
    if (departamento) {
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
  const { id } = req.params;
  const { nombre_departamento,id_pais } = req.body;
  try {
    const result = await departamentoRepository.updateDepartamento(id,id_pais, nombre_departamento);
    if (result === false) {
      return next({
        statusCode: 400,
        message: 'El registro solicitado no existe',
      });
    }
    res.status(200).json({ message: "Departamento Actualizado" });
  } catch (error) {
    return next(error);
  }
};

const deleteDepartamento = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await departamentoRepository.deleteDepartamento(id);
    if (result === false) {
      return next({
        statusCode: 400,
        message: 'El registro solicitado no existe',
      });
    }
    res.status(200).json({ message: "Departamento Eliminado" });
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
