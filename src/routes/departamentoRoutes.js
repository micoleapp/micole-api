const { Router } = require("express");
const router = Router();
const { getDepartamentos, createDepartamento, updateDepartamento, deleteDepartamento } = require("../controllers/departamentoController.js");
const cacheMiddleware = require("../middlewares/cache");
//------- PEDIR TODOS LOS DEPARTAMENTOS A LA BD--------
router.get("/", cacheMiddleware, getDepartamentos );
//------- POST A DEPARTAMENTO--------
router.post("/", createDepartamento);
//--------------------PUT  DEPARTAMENTO-------------------
router.put("/:id", updateDepartamento);
//--------------------DELETE DEPARTAMENTO--------------------
router.delete("/:id", deleteDepartamento);

module.exports = router;
