const { Infraestructura, Infraestructura_tipo } = require('../db');
const cache = require('../helpers/cacheGlobalInstance');

const getInfraestructuras = async (req, res, next) => {
  try {
    const key = req.originalUrl || req.url;
    const infraestructuras = await Infraestructura.findAll({
      include: [
        {
          model: Infraestructura_tipo,
          attributes: ["infraestructura_tipo"],
        },
      ],
      attributes: [
        "id",
        "nombre_infraestructura",
        "imagen",
        "InfraestructuraTipoId",
      ],
      order: [["nombre_infraestructura", "ASC"]],
    });
    const infraestructurasPurge = infraestructuras.map((infraestructura) => {
      return {
        id: infraestructura.id,
        nombre_infraestructura: infraestructura.nombre_infraestructura,
        imagen: infraestructura.imagen,
        InfraestructuraTipoId : infraestructura.InfraestructuraTipoId,
        Infraestructura_tipo: {
          infraestructura_tipo: infraestructura.Infraestructura_tipo.dataValues.infraestructura_tipo,
        } 
      };
    });
    cache.set(key, infraestructurasPurge, 86400); // Almacenamos la respuesta en caché durante 1 día
    res.status(200).send(infraestructurasPurge);
  } catch (error) {
    return next(error);
  }
};

const createInfraestructura = async (req, res, next) => {
  const { nombre_infraestructura, imagen, categoriaId } = req.body;
  try {
    const indexInfraestructura = await Infraestructura.findOne({
      order: [["id", "DESC"]],
    });
    const [infraestructura, created] = await Infraestructura.findOrCreate({
      where: {
        id: Number(indexInfraestructura.id) + 1,
        nombre_infraestructura: nombre_infraestructura,
        slug: nombre_infraestructura,
        imagen: imagen,
      },
    });
    await infraestructura.setInfraestructura_tipo(categoriaId);
    if (created) {
      res.status(200).json(infraestructura);
    } else {
      return next({
        statusCode: 501,
        message: 'Infraestructura existente',
      });
    }
  } catch (error) {
    return next(error);
  }
};

const updateInfraestructura = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nombre_infraestructura, categoriaId, imagen  } = req.body;
    const editedInfraestructura = await Infraestructura.update(
      {
        nombre_infraestructura: nombre_infraestructura,
        imagen: imagen,
        InfraestructuraTipoId: categoriaId,
      },
      { where: { id: id } }
    );
    res.status(200).json(editedInfraestructura);
  } catch (error) {
    return next(error);
  }
};

const deleteInfraestructura = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteInfraestructura = await Infraestructura.findOne({
      where: { id: id },
    });
    await deleteInfraestructura.destroy();
    res.status(200).send({ message: "Infraestructura borrada" });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getInfraestructuras,
  createInfraestructura,
  deleteInfraestructura,
  updateInfraestructura,
};
