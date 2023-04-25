const { Router } = require("express");
const distritoRouter = Router();

const { getDistritos, getDistritoById, createDistrito, deleteDistritoById, updateDistrito } = require("../controllers/distritoController");
const cacheMiddleware = require("../middlewares/cache");

distritoRouter.get("/", cacheMiddleware, getDistritos);
distritoRouter.post("/", createDistrito);
distritoRouter.get("/:id", getDistritoById);
distritoRouter.put("/:id", updateDistrito);
distritoRouter.delete("/:id", deleteDistritoById);

module.exports = distritoRouter;