const { Router } = require("express");
const router = Router();
const { deleteMetodo, updateMetodo, createMetodo, getMetodos } = require("../controllers/metodoController.js");
const cacheMiddleware = require("../middlewares/cache.js");

//------- PEDIR TODOS LOS METODOS A LA BD--------
router.get("/", cacheMiddleware, getMetodos);

//------- POST A METODO--------
router.post("/", createMetodo);

//--------------------PUT  UN PRODUCTO DEL METODO--------------------
router.put("/:id", updateMetodo);

//--------------------DELETE METODO--------------------
router.delete("/:id", deleteMetodo);

module.exports = router;
