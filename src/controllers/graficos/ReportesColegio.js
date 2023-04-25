const { Colegio, Cita, Plan_Pago, Grado, Review } = require('../../db');
const { Sequelize } = require('sequelize');

const reportesPanelAdmin = async (req, res, next) => {
  try {
    const meses = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];
    const grados = [
      'Cuna Jardin (0 año)',
      'Cuna Jardi­n (1 año)',
      'Cuna Jardi­n (2 años)',
      'Inicial Jardin (3 años)',
      'Inicial Jardi­n (4 años)',
      'Inicial Jardi­n (5 años)',
      '1er grado - Primaria',
      '2do grado - Primaria',
      '3er grado - Primaria',
      '4to grado - Primaria',
      '5to grado - Primaria',
      '6to grado - Primaria',
      '1er grado - Secundaria',
      '2do grado - Secundaria',
      '3er grado - Secundaria',
      '4to grado - Secundaria',
      '5to grado - Secundaria',
    ];
    const planPago = ['Free', 'Básico', 'Estandar', 'Premium'];
    // Acumulado colegios por mes
    const dataColegios = await Colegio.findAll({
      attributes: [
        [
          Sequelize.fn('DATE_TRUNC', 'month', Sequelize.col('createdAt')),
          'month',
        ],
        [Sequelize.fn('COUNT', '*'), 'count'],
      ],
      group: 'month',
      order: Sequelize.literal('date_trunc(\'month\', "createdAt") ASC'),
    });

    const dataCitas = await Cita.findAll({
      attributes: [
        [
          Sequelize.fn('DATE_TRUNC', 'month', Sequelize.col('fecha_cita')),
          'month',
        ],
        [Sequelize.fn('COUNT', '*'), 'count'],
      ],
      group: 'month',
      order: Sequelize.literal('date_trunc(\'month\', "fecha_cita") ASC'),
    });

    const colegiosPorMes = dataColegios.map((item) => {
      const date = new Date(item.dataValues.month);
      const monthName = meses[date.getUTCMonth()];
      return {
        mes: monthName,
        total: item.dataValues.count,
      };
    });

    const citasPorMes = dataCitas.map((item) => {
      const date = new Date(item.dataValues.month);
      const monthName = meses[date.getUTCMonth()];
      return {
        mes: monthName,
        total: item.dataValues.count,
      };
    });

    const colegioPorPlanRegistrado = await Colegio.findAll({
      attributes: [
        'PlanPagoId',
        [Sequelize.fn('COUNT', '*'), 'count'],
        [Sequelize.col('Plan_Pago.id'), 'PlanPagoId'],
      ],
      include: [
        {
          model: Plan_Pago,
        },
      ],
      group: ['PlanPagoId', 'Plan_Pago.id'],
    });

    const colegiosPorPlan = colegioPorPlanRegistrado.map((item) => ({
      planPago: planPago[item.dataValues.PlanPagoId - 1],
      total: item.dataValues.count,
    }));

    const citasPorGradoRegistrado = await Cita.findAll({
      attributes: [
        'GradoId',
        [Sequelize.fn('COUNT', '*'), 'count'],
        [Sequelize.col('Grado.id'), 'GradoId'],
      ],
      include: [
        {
          model: Grado,
        },
      ],
      group: ['GradoId', 'Grado.id'],
    });

    const citasPorGrado = citasPorGradoRegistrado.map((item) => ({
      grado: grados[item.dataValues.GradoId - 1],
      total: item.dataValues.count,
    }));

    const citasTotales = await Cita.count();
    const colegiosTotales = await Colegio.count();
    const reviewsTotales = await Review.count();
    const totalVisualizaciones = await Colegio.sum('visualizaciones');
    
    res.status(200).send({
      acumuladoMesColegios: colegiosPorMes,
      acumuladoMesCitas: citasPorMes,
      colegiosPorPlan: colegiosPorPlan,
      citasPorGrado,
      citasTotales,
      totalVisualizaciones,
      colegiosTotales,
      reviewsTotales
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  reportesPanelAdmin,
};
