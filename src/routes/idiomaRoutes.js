const { Router } = require("express");
const router = Router();
const { getIdiomas, createIdioma, updateIdioma, deleteIdioma } = require("../controllers/idiomaController.js");
const cacheMiddleware = require("../middlewares/cache.js");

//------- PEDIR TODOS LOS IDIOMAS A LA BD--------
router.get("/", cacheMiddleware, getIdiomas);

//------- POST IDIOMA--------
router.post("/", createIdioma);

//--------------------PUT  IDIOMA-------------------
router.put("/:id", updateIdioma);

//--------------------DELETE IDIOMA--------------------
router.delete("/:id", deleteIdioma);

module.exports = router;
