const { Router } = require("express");
const router = Router();
const { getProvincias, createProvincia, updateProvincia, deleteProvincia } = require("../controllers/provinciaController.js");
const cacheMiddleware = require("../middlewares/cache");
//------- PEDIR TODOS LOS COLEGIOS A LA BD--------
router.get("/", cacheMiddleware, getProvincias);

//------- POST A PROVINCIA--------
router.post("/", createProvincia);

//--------------------PUT  PROVINCIA-------------------
router.put("/:id", updateProvincia);
//--------------------DELETE PROVINCIA--------------------

router.delete("/:id", deleteProvincia);

module.exports = router;
