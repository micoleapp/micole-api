const { Router } = require("express");
const router = Router();
const { deleteInfraestructura, updateInfraestructura, createInfraestructura, getInfraestructuras } = require("../controllers/infraestructuraController.js");
const cacheMiddleware = require("../middlewares/cache.js");

//------- PEDIR TODOS LAS INFRAESTRUCTURAS A LA BD--------
router.get("/", cacheMiddleware, getInfraestructuras);

//------- POST A INFRAESTRUCTURA-------
router.post("/", createInfraestructura);

//--------------------PUT  INFRAESTRUCTURA--------------------
router.put("/:id", updateInfraestructura);

//--------------------DELETE UNA INFRAESTRUCTURA--------------------
router.delete("/:id", deleteInfraestructura);

module.exports = router;
