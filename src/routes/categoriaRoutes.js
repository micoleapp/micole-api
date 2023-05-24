const { Router } = require("express");
const router = Router();
const { getCategorias } = require("../controllers/categoriaController.js");
const cacheMiddleware = require("../middlewares/cache");

//------- PEDIR TODOS LAS CATEGORIAS A LA BD--------
router.get("/", cacheMiddleware, getCategorias );

module.exports = router;
