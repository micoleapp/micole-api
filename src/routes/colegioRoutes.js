const { Router } = require('express');
const router = Router();
const {
  getColegiosAdmin,
  getColegioInfraestructuras,
  getColegioAfiliaciones,
  getColegioComparador,
  getColegioById,
  getColegiosFilter,
  updateColegio,
  updateMultimedia,
  changeStatusColegio,
} = require('../controllers/colegioController');
// const getComponentData = require("../funciones/getComponentData.js");
// const ratingProm = require("../funciones/ratingProm.js");

//------- PEDIR TODOS LOS COLEGIOS A LA BD--------
router.get('/', getColegiosAdmin);

//------- PEDIR LAS INFRAESTRUCTURAS DE UNO DE LOS COLEGIOS POR ID--------
router.get('/infraestructuras/:Colegio_id', getColegioInfraestructuras);

//------- PEDIR LAS AFILIACIONES DE UNO DE LOS COLEGIOS POR ID--------
router.get('/afiliacion/:Colegio_id', getColegioAfiliaciones);

//------- PEDIR UNO DE LOS COLEGIOS POR ID PARA EL COMPARADOR--------
router.get('/comparador/:Colegio_id', getColegioComparador);

//------- PEDIR UNO DE LOS COLEGIOS POR ID--------
router.get('/:Colegio_id', getColegioById);

//------- PEDIR COLEGIOS PARA EL LISTING --------
router.post('/filter', getColegiosFilter);

//--------------------PUT  UN COLEGIO POR ID-------
router.put('/:id', updateColegio );

//--------------------PUT  MULTIMEDIA POR ID-------
router.put('/multimedia/:id', updateMultimedia);

//--------------------CAMBIAR ESTADO DE COLEGIO -------
router.put('/activo/:id', changeStatusColegio );

module.exports = router;
