const paisRepository = require("../repositories/paisRepository");

const getPaises = async (_, res, next) => {
  try {
    const paises = await paisRepository.getAllPaises();
    res.status(200).send(paises);
  } catch (error) {
    return next(error);
  }
};

const createPais = async (req, res, next) => {
  const { nombre_pais } = req.body;
  try {
    const pais = await paisRepository.createPais(nombre_pais);
    if (pais) {
      res.status(200).json(pais);
    } else {
      return next({
        statusCode: 501,
        message: "País existente",
      });
    }
  } catch (error) {
    return next(error);
  }
};

const updatePais = async (req, res, next) => {
  const { id } = req.params;
  const { nombre_pais } = req.body;
  try {
    const result = await paisRepository.updatePais(id, nombre_pais);
    if (result === false) {
      return next({
        statusCode: 400,
        message: "El registro solicitado no existe",
      });
    }
    res.status(200).json({ message: "País Actualizado" });
  } catch (error) {
    return next(error);
  }
};

const deletePais = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await paisRepository.deletePais(id);
    if (result === false) {
      return next({
        statusCode: 400,
        message: "El registro solicitado no existe",
      });
    }
    res.status(200).json({ message: "País Eliminado" });
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
