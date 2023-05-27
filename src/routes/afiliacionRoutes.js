const { Router } = require('express');
const afiliacionRouter = Router();

const {
  getAfiliacion,
  createAfiliacion,
  getAfiliacion_tipo,
  createAfiliacion_tipo,
  updateAfiliacion,
  getAfiliacionById,
  deleteAfiliacionById,
  getTipoAfiliacionById,
  updateTipoAfiliacion,
  deleteTipoAfiliacionById
} = require('../controllers/afiliacionController');

afiliacionRouter.get('/', getAfiliacion);
afiliacionRouter.post('/', createAfiliacion);
afiliacionRouter.get('/:idAfiliacion', getAfiliacionById);
afiliacionRouter.put('/:idAfiliacion', updateAfiliacion);
afiliacionRouter.delete('/:idAfiliacion', deleteAfiliacionById);
// Afiliacion Tipos
afiliacionRouter.get('/tipo', getAfiliacion_tipo);
afiliacionRouter.post('/tipo', createAfiliacion_tipo);
afiliacionRouter.get('/tipo/:idTipoAfiliacion', getTipoAfiliacionById);
afiliacionRouter.put('/tipo/:idTipoAfiliacion', updateTipoAfiliacion);
afiliacionRouter.delete('/tipo/:idTipoAfiliacion', deleteTipoAfiliacionById);

module.exports = afiliacionRouter;
