const { Afiliacion, Afiliacion_tipo } = require('../db');
const cache = require('../helpers/cacheGlobalInstance');

const getAfiliacion = async (req, res, next) => {
  try {
    const key = req.originalUrl || req.url;
    const Afiliaciones = await Afiliacion.findAll({
      include: {
        model: Afiliacion_tipo,
        attributes: ['id', 'afiliacion_tipo'],
      },
      attributes: ['id', 'nombre_afiliacion', 'slug', 'logo'],
    });

   const afiliacionesPurge = Afiliaciones.map((afiliacion) => {
      return {
        id: afiliacion.id,
        nombre_afiliacion: afiliacion.nombre_afiliacion,
        slug: afiliacion.slug,
        logo: afiliacion.logo,
        Afiliacion_tipo_id : afiliacion.Afiliacion_tipo.dataValues.id,
        Afiliacion_tipo: {
          id: afiliacion.Afiliacion_tipo.dataValues.id,
          afiliacion_tipo: afiliacion.Afiliacion_tipo.dataValues.afiliacion_tipo,
        }
      };
    });
    cache.set(key, afiliacionesPurge, 86400); // Almacenamos la respuesta en caché durante 1 día
    res.status(200).send(afiliacionesPurge);
  } catch (error) {
    return next(error);
  }
};

const getAfiliacion_tipo = async (req, res, next) => {
  try {
    const Afiliaciones_tipos = await Afiliacion_tipo.findAll();
    res.status(200).send(Afiliaciones_tipos);
  } catch (error) {
    return next(error);
  }
};

const getAfiliacionById = async (req, res, next) => {
  const { idAfiliacion } = req.params;
  try {
    const afiliacion = await Afiliacion.findByPk(idAfiliacion);
    if (!afiliacion) {
      return next({
        statusCode: 404,
        message: 'El registro solicitado no existe',
      });
    }
    res.status(200).send(afiliacion);
  } catch (error) {
    return next(error);
  }
};

const getTipoAfiliacionById = async (req, res, next) => {
  const { idTipoAfiliacion } = req.params;
  try {
    const tipoAfiliacion = await Afiliacion_tipo.findByPk(idTipoAfiliacion);
    if (!tipoAfiliacion) {
      return next({
        statusCode: 404,
        message: 'El registro solicitado no existe',
      });
    }
    res.status(200).send(tipoAfiliacion);
  } catch (error) {
    return next(error);
  }
};

const createAfiliacion = async (req, res, next) => {
  const { nombre_afiliacion, logo, Afiliacion_tipo_Id } = req.body;
  try {
    const ifExists = await Afiliacion.findOne({
      where: { nombre_afiliacion: nombre_afiliacion },
    });
    if (ifExists) {
      return next({
        statusCode: 400,
        message: 'El registro ingresado ya existe.',
      });
    }
    const newAfiliacion = await Afiliacion.create({
      nombre_afiliacion,
      logo,
      slug:logo,
      Afiliacion_tipo_Id,
    });
    res.status(200).json(newAfiliacion);
  } catch (error) {
    return next(error);
  }
};

const updateAfiliacion = async (req, res, next) => {
  const { idAfiliacion } = req.params;
  const { nombre_afiliacion, logo, Afiliacion_tipo_Id } = req.body;
  try {
    const afiliacion = await Afiliacion.findByPk(idAfiliacion);
    if (!afiliacion) {
      return next({
        statusCode: 400,
        message: 'El registro solicitado no existe',
      });
    }
    const updatedAfiliacion = await Afiliacion.update({
      nombre_afiliacion,
      logo,
      slug:logo,
      Afiliacion_tipo_Id,
    },{where:{id:idAfiliacion}});
    res.status(200).json(updatedAfiliacion);
  } catch (error) {
    return next(error);
  }
};

const createAfiliacion_tipo = async (req, res, next) => {
  const { afiliacion_tipo } = req.body;
  try {
    const ifExists = await Afiliacion_tipo.findOne({
      where: { afiliacion_tipo: afiliacion_tipo },
    });
    if (ifExists) {
      return next({
        statusCode: 400,
        message: 'El registro ingresado ya existe.',
      });
    }
    const id = await Afiliacion_tipo.count();
    const newAfiliacion_tipo = await Afiliacion_tipo.create({
      id: id + 1,
      afiliacion_tipo,
    });
    res.status(200).json(newAfiliacion_tipo);
  } catch (error) {
    return next(error);
  }
};

const updateTipoAfiliacion = async (req, res, next) => {
  const { idTipoAfiliacion } = req.params;
  const { afiliacion_tipo } = req.body;
  try {
    const tipoAfiliacion = await Afiliacion_tipo.findByPk(idTipoAfiliacion);
    if (!tipoAfiliacion) {
      return next({
        statusCode: 400,
        message: 'El registro solicitado no existe',
      });
    }
    const updatedTipoAfiliacion = await Afiliacion_tipo.update({
      afiliacion_tipo
    });
    res.status(200).json(updatedTipoAfiliacion);
  } catch (error) {
    return next(error);
  }
};

const deleteAfiliacionById = async (req, res, next) => {
  const { idAfiliacion } = req.params;
  try {
    const deleteAfiliacion = await Afiliacion.findOne({where:{id:idAfiliacion}});
    if (!deleteAfiliacion) {
      return next({
        statusCode: 404,
        message: 'El registro solicitado no existe',
      });
    }
    await deleteAfiliacion.destroy();
    res.status(200).send('Registro eliminado correctamente');
  } catch (error) {
    return next(error);
  }
};

const deleteTipoAfiliacionById = async (req, res, next) => {
  const { idTipoAfiliacion } = req.params;
  try {
    const TipoAfiliacion = await Afiliacion_tipo.findByPk(idTipoAfiliacion);
    if (!TipoAfiliacion) {
      return next({
        statusCode: 404,
        message: 'El registro solicitado no existe',
      });
    }
    await Afiliacion_tipo.destroy({ where: { id: idTipoAfiliacion } });
    res.status(200).send('Registro eliminado correctamente');
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAfiliacion,
  createAfiliacion,
  getAfiliacion_tipo,
  createAfiliacion_tipo,
  getAfiliacionById,
  getTipoAfiliacionById,
  deleteAfiliacionById,
  deleteTipoAfiliacionById,
  updateAfiliacion,
  updateTipoAfiliacion
};
