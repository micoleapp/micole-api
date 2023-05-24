const { Router } = require("express");
const router = Router();
const { getGradosByNivel, getGrados, createGrado, updateGrado, deleteGrado } = require("../controllers/gradoController.js");
const cacheMiddleware = require("../middlewares/cache.js");

//------- PEDIR TODOS LOS GRADOS A LA BD--------
router.get("/", cacheMiddleware, getGrados);

//------- POST A GRADO--------
router.post("/", createGrado);

//--------------------PUT  GRADO-------------------
router.put("/:id", updateGrado);

//--------------------DELETE GRADO--------------------
router.delete("/:id", deleteGrado);

router.post("/vacantes", getGradosByNivel);

module.exports = router;
