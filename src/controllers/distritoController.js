const distritoRepository = require('../repositories/distritoRepository');

const getDistritos = async (_, res, next) => {
  try {
    const distritos = await distritoRepository.getAllDistritos();
    res.status(200).send(distritos);
  } catch (error) {
    return next(error);
  }
};

const getDistritoById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const distrito = await distritoRepository.getDistritoById(id);
    if (!distrito) {
      return next({
        statusCode: 404,
        message: 'El distrito solicitado no existe',
      });
    }
    res.status(200).json(distrito);
  } catch (error) {
    return next(error);
  }
};

const createDistrito = async (req, res, next) => {
  const { ProvinciaId, nombre_distrito } = req.body;
  try {

    const distrito = await distritoRepository.createDistrito(ProvinciaId, nombre_distrito);
    if (distrito) {
      res.status(200).json(distrito);
    } else {
      return next({
        statusCode: 501,
        message: 'Distrito existente',
      });
    }

  } catch (error) {
    return next(error);
  }
};


const updateDistrito = async (req, res, next) => {
  const { id } = req.params;
  const { ProvinciaId, nombre_distrito } = req.body;
  try {
    const result = await distritoRepository.updateDistrito(id, ProvinciaId, nombre_distrito);
    if (result === false) {
      return next({
        statusCode: 400,
        message: 'El registro solicitado no existe',
      });
    }
    res.status(200).json({ message: "Distrito Actualizado" });
  } catch (error) {
    return next(error);
  }
};

const deleteDistritoById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await distritoRepository.deleteDistrito(id);
    if (result === false) {
      return next({
        statusCode: 400,
        message: 'El registro solicitado no existe',
      });
    }
    res.status(200).json({ message: "Distrito Eliminado" });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getDistritos,
  getDistritoById,
  createDistrito,
  deleteDistritoById,
  updateDistrito,
};
