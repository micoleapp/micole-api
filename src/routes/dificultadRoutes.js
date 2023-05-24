const { Router } = require("express");
const router = Router();
const { getDificultades, createDificultad, updateDificultad, deleteDificultad } = require("../controllers/dificultadController.js");
const cacheMiddleware = require("../middlewares/cache.js");

//------- PEDIR TODAS LAS DIFICULTADES A LA BD--------
router.get("/", cacheMiddleware, getDificultades);

//------- POST A DIFICULTAD--------
router.post("/", createDificultad);

//--------------------PUT DIFICULTAD-------------------
router.put("/:id", updateDificultad);

//--------------------DELETE DIFICULTAD--------------------
router.delete("/:id", deleteDificultad);

module.exports = router;
