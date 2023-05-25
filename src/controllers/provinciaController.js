const provinciaRepository = require("../repositories/provinciaRepository");

const getProvincias = async (_, res, next) => {
  try {
    const provincias = await provinciaRepository.getAllProvincias();
    res.status(200).send(provincias);
  } catch (error) {
    return next(error);
  }
};

const createProvincia = async (req, res, next) => {
  const { nombre_provincia,departamentoId } = req.body;
  try {
    const provincia = await provinciaRepository.createProvincia(departamentoId, nombre_provincia);
    if (provincia) {
      res.status(200).json(provincia);
    } else {
      return next({
        statusCode: 501,
        message: 'Provincia existente',
      });
    }

  } catch (error) {
    return next(error);
  }
};

const updateProvincia = async (req, res, next) => {
  const { id } = req.params;
  const { nombre_provincia,departamentoId } = req.body;
  try {
    const result = await provinciaRepository.updateProvincia(id,departamentoId, nombre_provincia);
    if (result === false) {
      return next({
        statusCode: 400,
        message: 'El registro solicitado no existe',
      });
    }
    res.status(200).json({ message: "Provincia Actualizada" });
  } catch (error) {
    return next(error);
  }
};

const deleteProvincia = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await provinciaRepository.deleteProvincia(id);
    if (result === false) {
      return next({
        statusCode: 400,
        message: 'El registro solicitado no existe',
      });
    }
    res.status(200).json({ message: "Provincia Eliminada" });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getProvincias,
  createProvincia,
  deleteProvincia,
  updateProvincia,
};
