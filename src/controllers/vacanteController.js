const { Vacante, Grado, Colegio } = require('../db');

const getVacantes = async (req, res, next) => {
  try {
    const total = await Vacante.count();
    if (total === 0) {
      return next({
        statusCode: 404,
        message: 'No hay registros en la DB',
      });
    }
    const vacantes = await Vacante.findAll({
      include: [
        {
          model: Colegio,
          attributes: ['nombre_colegio'],
        },
        {
          model: Grado,
          attributes: ['nombre_grado'],
        },
      ],
    });
    res.status(200).send(vacantes);
  } catch (error) {
    return next(error);
  }
};

const getVacantesColegio = async (req, res, next) => {
  const { idColegio } = req.params;
  try {
    const vacantes = await Vacante.findAll({
      include: [
        {
          model: Colegio,
          attributes: ['nombre_colegio'],
        },
        {
          model: Grado,
          attributes: ['nombre_grado'],
        },
      ],
      where: {
        ColegioId: idColegio,
      },
    });

    res.status(200).send(vacantes);
  } catch (error) {
    return next(error);
  }
};

const createVacante = async (req, res, next) => {
  const { data } = req.body;
  const tokenUser = req.user;
  try {
    let colegio;
    if (tokenUser.rol === 'Admin') {
      colegio = await Colegio.findByPk(data.idColegio);

      if (!colegio) {
        return next({
          statusCode: 404,
          message: 'No se encontró el colegio especificado',
        });
      }
    } else {
      colegio = await Colegio.findOne({
        where: { idAuth: tokenUser.id },
      });
    }

    const año = data.año;
    delete data.año;
    delete data.idColegio;

    for (const [gradoId, valores] of Object.entries(data)) {
      const grado = await Grado.findByPk(gradoId);
      if (
        !valores.alumnos &&
        !valores.capacidad &&
        !valores.cuota_ingreso &&
        !valores.cuota_pension &&
        !valores.matricula
      ) {
        await Vacante.destroy({
          where: {
            ColegioId: colegio.id,
            GradoId: gradoId,
            año: año,
          },
        });
        continue;
      }
      if (
        !valores.alumnos ||
        !valores.capacidad ||
        !valores.cuota_ingreso ||
        !valores.cuota_pension ||
        !valores.matricula
      ) {
        return next({
          statusCode: 400,
          message: `Faltan datos para el grado ${grado.dataValues.nombre_grado}`,
        });
      }
      const vacante = await Vacante.findOne({
        where: {
          ColegioId: colegio.id,
          GradoId: gradoId,
          año: año,
        },
      });

      if (vacante) {
        await vacante.update({
          alumnos_matriculados: valores.alumnos,
          matricula: valores.matricula,
          cuota_pension: valores.cuota_pension,
          cuota_ingreso: valores.cuota_ingreso,
          capacidad: valores.capacidad,
          año: año,
        });
      } else {
        await Vacante.create({
          alumnos_matriculados: valores.alumnos,
          matricula: valores.matricula,
          cuota_pension: valores.cuota_pension,
          cuota_ingreso: valores.cuota_ingreso,
          capacidad: valores.capacidad,
          año: año,
          ColegioId: colegio.id,
          GradoId: gradoId,
        });
      }
    }
    res
      .status(200)
      .send({ message: 'Los registros se guardaron correctamente' });
  } catch (error) {
    return next(error);
  }
};

const getVacanteById = async (req, res, next) => {
  const { idVacante } = req.params;
  try {
    const vacante = await Vacante.findByPk(idVacante, {
      include: [
        {
          model: Colegio,
          attributes: ['nombre_colegio'],
        },
        {
          model: Grado,
          attributes: ['nombre_grado'],
        },
      ],
    });
    if (!vacante) {
      return next({
        statusCode: 404,
        message: 'La Vacante solicitada no existe',
      });
    }
    res.status(200).send(vacante);
  } catch (error) {
    return next(error);
  }
};

const deleteVacanteById = async (req, res, next) => {
  const { idVacante } = req.params;
  try {
    const vacante = await Vacante.findByPk(idVacante);
    if (!vacante) {
      return next({
        statusCode: 404,
        message: 'El registro ha eliminar no existe',
      });
    }
    await Vacante.destroy({ where: { id: idVacante } });
    res.status(200).send('El registro ha sido eliminado con éxito');
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getVacantes,
  createVacante,
  getVacanteById,
  deleteVacanteById,
  getVacantesColegio,
};
