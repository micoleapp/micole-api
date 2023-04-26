const { Evento, Colegio, User, Auth } = require('../db');
const moment = require('moment');
const {Sequelize} = require('sequelize');

const getEventosColegio = async (req, res, next) => {
  const tokenUser = req.user;
  const { order } = req.query;
  let orderBy = null;
  if (order) {
    switch (order) {
      case 'ASC':
        orderBy = [['fecha_evento', 'ASC']];
        break;
      case 'DESC':
        orderBy = [['fecha_evento', 'DESC']];
        break;
      default:
        orderBy = null;
        break;
    }
  }
  try {
    const authInstance = await Auth.findByPk(tokenUser.id);
    if (!authInstance) {
      return next({
        statusCode: 400,
        message: 'El usuario no tiene permisos para crear un evento.',
      });
    }
    if (authInstance.rol === 'Colegio') {
      const colegio = await Colegio.findOne({
        where: { idAuth: authInstance.id },
      });
      if (!colegio) {
        return next({
          statusCode: 400,
          message: 'El usuario no existe.',
        });
      }
      const eventos = await Evento.findAll({
        where: {
          ColegioId: colegio.id,
        },
        include: [{
          model: User,
        }],
        order: orderBy || [['fecha_evento', 'ASC']],
      });

      const sanitiziedEventos = eventos.map((evento) => {
        const cantidadUsuarios = evento.Users.length;
        return {
          ...evento.toJSON(),
          Users: { 
            cantidadInscritos: cantidadUsuarios, 
          }
        };
      });

      res.status(200).send(sanitiziedEventos);
    } else {
      const user = await User.findOne({ where: { idAuth: authInstance.id } });
      if (!user) {
        return next({
          statusCode: 400,
          message: 'El usuario no existe.',
        });
      }
      const eventos = await Evento.findAll({
        include: [
          {
            model: User,
            where: { id: user.id },
            attributes: [],
            through: { attributes: [] },
          },
          {
            model: Colegio,
            attributes: ['nombre_colegio', 'direccion'],
          },
        ],
        order: orderBy || [['fecha_evento', 'ASC']],
      });
      res.status(200).json(eventos);
    }
  } catch (error) {
    return next(error);
  }
};

const registrationEvent = async (req, res, next) => {
  const { idEvento, idUser } = req.body;
  try {
    const user = await User.findByPk(idUser);
    if (!user) {
      throw new Error('No se encontró al usuario con ese correo electrónico');
    }

    const evento = await Evento.findByPk(idEvento);
    if (!evento) {
      throw new Error('No se encontró el evento con ese ID');
    }
    await evento.addUser(user);
    res.status(201).json({ message: 'Inscripción exitosa' });
  } catch (error) {
    return next(error);
  }
};

const getEventoById = async (req, res, next) => {
  const { idEvento } = req.params;
  try {
    const evento = await Evento.findByPk(idEvento, {
      include: [
        {
          model: Colegio,
        },
      ],
    });
    if (!evento) {
      return next({
        statusCode: 400,
        message: 'El registro no existe.',
      });
    }
    res.status(200).send(evento);
  } catch (error) {
    return next(error);
  }
};

const createEvento = async (req, res, next) => {
  const {
    nombreEvento,
    descripcionEvento,
    fechaEvento,
    horaEvento,
    tipoEvento,
    capacidadEvento,
    image,
    idColegio,
  } = req.body;
  try {
    const fechaEventoF = moment(fechaEvento, ['DD/MM/YYYY', 'YYYY-MM-DD']);
    const newEvento = await Evento.create({
      fecha_evento: fechaEventoF,
      descripcion: descripcionEvento,
      hora_evento: horaEvento,
      nombre_evento: nombreEvento,
      tipo_evento: tipoEvento,
      capacidad: capacidadEvento,
      imagen_evento: image,
      ColegioId: idColegio,
    });
    res.status(200).json(newEvento);
  } catch (error) {
    return next(error);
  }
};

const updateEvento = async (req, res, next) => {
  const { idEvento } = req.params;
  const {
    nombreEvento,
    descripcionEvento,
    fechaEvento,
    horaEvento,
    tipoEvento,
    capacidadEvento,
    image,
  } = req.body;
  const updateEvento = {
    nombre_evento: nombreEvento ? nombreEvento : undefined,
    descripcion: descripcionEvento ? descripcionEvento : undefined,
    fecha_evento: fechaEvento
      ? moment(fechaEvento, ['DD/MM/YYYY', 'YYYY-MM-DD'])
      : undefined,
    hora_evento: horaEvento ? horaEvento : undefined,
    tipo_evento: tipoEvento ? tipoEvento : undefined,
    capacidad: capacidadEvento ? capacidadEvento : undefined,
    imagen_evento: image ? image : undefined,
  };

  try {
    const evento = await Evento.findByPk(idEvento);
    if (!evento) {
      return next({
        statusCode: 400,
        message: 'El registro no existe.',
      });
    }
    await Evento.update(updateEvento, { where: { id: idEvento } });
    res.status(200).send('El evento se ha modificado.');
  } catch (error) {
    return next(error);
  }
};

const deleteEvento = async (req, res, next) => {
  const { idEvento } = req.params;
  try {
    const evento = await Evento.findByPk(idEvento);
    if (!evento) {
      return next({
        statusCode: 400,
        message: 'El registro no existe.',
      });
    }
    await Evento.destroy({ where: { id: idEvento } });
    res.status(200).send('Se eliminó el evento.');
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getEventosColegio,
  getEventoById,
  createEvento,
  deleteEvento,
  updateEvento,
  registrationEvent,
};
