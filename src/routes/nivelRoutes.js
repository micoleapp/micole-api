const { Router } = require("express");
const router = Router();
const { deleteNivel, updateNivel, createNivel, getNiveles } = require("../controllers/nivelController.js");
const cacheMiddleware = require("../middlewares/cache.js");

//------- PEDIR TODOS LOS NIVELES A LA BD--------
router.get("/", cacheMiddleware, getNiveles);

//------- POST A NIVEL--------
router.post("/", createNivel);

//--------------------PUT  NIVEL-------------------
router.put("/:id", updateNivel);

//--------------------DELETE NIVEL--------------------
router.delete("/:id", deleteNivel);

module.exports = router;
