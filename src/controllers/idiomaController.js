const idiomaRepository = require('../repositories/idiomaRepository');

const getIdiomas = async (_, res, next) => {
  try {
    const idiomas = await idiomaRepository.getAllIdiomas();
    res.status(200).send(idiomas);
  } catch (error) {
    return next(error);
  }
};

const createIdioma = async (req, res, next) => {
  const { nombre_idioma } = req.body;
  try {
    const idioma = await idiomaRepository.createIdioma(nombre_idioma);
    if (idioma) {
      res.status(200).json(idioma);
    } else {
      return next({
        statusCode: 501,
        message: 'Idioma existente',
      });
    }
  } catch (error) {
    return next(error);
  }
};

const getIdiomaById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const idioma = await idiomaRepository.getIdiomaById(id);
    if (!idioma) {
      return next({
        statusCode: 404,
        message: 'El idioma solicitado no existe',
      });
    }
    res.status(200).json(idioma);
  } catch (error) {
    return next(error);
  }
};

const updateIdioma = async (req, res, next) => {
  const { id } = req.params;
  const { nombre_idioma } = req.body;
  try {
    const result = await idiomaRepository.updateIdioma(id, nombre_idioma);
    if (result === false) {
      return next({
        statusCode: 400,
        message: 'El registro solicitado no existe',
      });
    }
    res.status(200).json({ message: "Idioma Actualizado" });
  } catch (error) {
    return next(error);
  }
};

const deleteIdioma = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await idiomaRepository.deleteIdioma(id);
    if (result === false) {
      return next({
        statusCode: 400,
        message: 'El registro solicitado no existe',
      });
    }
    res.status(200).json({ message: "Idioma Eliminado" });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getIdiomas,
  getIdiomaById,
  createIdioma,
  deleteIdioma,
  updateIdioma,
};
