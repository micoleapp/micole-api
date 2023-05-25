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

const updateIdioma = async (req, res, next) => {
  const { id } = req.params;
  const { nombre_idioma } = req.body;
  try {
    await idiomaRepository.updateIdioma(id, nombre_idioma);
    res.status(200).json({ message: "Idioma Actualizado" });
  } catch (error) {
    return next(error);
  }
};

const deleteIdioma = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deleted = await idiomaRepository.deleteIdioma(id);
    if (deleted) {
      res.status(200).send({ message: 'Idioma borrado' });
    } else {
      return next({
        statusCode: 404,
        message: 'Idioma no encontrado',
      });
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getIdiomas,
  createIdioma,
  deleteIdioma,
  updateIdioma,
};
