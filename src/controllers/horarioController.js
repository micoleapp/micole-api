const { Horario } = require('../db');

const getHorarioByIdColegio = async (req, res, next) => {
  const { idColegio } = req.params;
  try {
    const Horarios = await Horario.findAll({
      where: { ColegioId: idColegio },
    });
    res.status(200).send(Horarios);
  } catch (error) {
    return next(error);
  }
};

const createHorario = async (req, res, next) => {
  const { horarios, ColegioId } = req.body;
  console.log(horarios)
  console.log(ColegioId)
  try {
    await Horario.destroy({ where: { ColegioId } });

    await Promise.all(
      horarios.map(async (horario) => {
        const horarioExistente = await Horario.findOne({
          where: {
            dia: horario.dia,
            ColegioId,
          },
        });

        if (horarioExistente) {
          await horarioExistente.update({
            horarios: horario.horarios,
          });
        } else {
          await Horario.create({
            dia: horario.dia,
            horarios: horario.horarios,
            ColegioId,
          });
        }
      })
    );
    return res.status(200).send({ message: 'Registros creados correctamente' });
  } catch (error) {
    console.error('Error al crear registros', error);
  }
};

module.exports = {
  getHorarioByIdColegio,
  createHorario,
};
