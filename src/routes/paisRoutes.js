const { Router } = require("express");
const router = Router();
const { deletePais, updatePais, createPais, getPaises } = require("../controllers/paisController.js");
const cacheMiddleware = require("../middlewares/cache.js");


//------- PEDIR TODOS LOS PAISES A LA BD--------
router.get("/", cacheMiddleware, getPaises);

//------- POST PAIS--------
router.post("/", createPais);

//--------------------ACTUALIZAR UN PAIS --------------------
router.put("/:id", updatePais);

//--------------------DELETE UN PAIS--------------------
router.delete("/:id", deletePais);

module.exports = router;
