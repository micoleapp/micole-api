const { Provincia } = require('../db');
const cache = require('../helpers/cacheGlobalInstance');

const getProvincias = async (req, res, next) => {
  try {
    const key = req.originalUrl || req.url;
    const provincias = await Provincia.findAll();
    cache.set(key, provincias, 86400); // Almacenamos la respuesta en caché durante 1 día
    res.status(200).send(provincias);
  } catch (error) {
    return next(error);
  }
};

const createProvincia = async (req, res, next) => {
  const { nombre_provincia,departamentoId } = req.body;
  try {
    const indexProvincia = await Provincia.findOne({
      order: [["id", "DESC"]],
    });
    const [provincia, created] = await Provincia.findOrCreate({
      where: {
        id:Number(indexProvincia.id)+1,
        nombre_provincia: nombre_provincia,
      },
    });
    await provincia.setDepartamento(departamentoId);
    if (created) {
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
  try {
    const { id } = req.params;
    const { nombre_provincia,departamentoId } = req.body;
    const editedProvincia = await Provincia.update(
      {
        nombre_provincia: nombre_provincia,
        DepartamentoId:departamentoId
      },
      { where: { id: id } }
    );
    res.status(200).json(editedProvincia);
  } catch (error) {
    return next(error);
  }
};

const deleteProvincia = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteProvincia = await Provincia.findOne({
      where: { id: id },
    });
    await deleteProvincia.destroy();
    res.status(200).send({ message: "Provincia borrada" });
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
