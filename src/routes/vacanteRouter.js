const { Router } = require("express");
const vacanteRouter = Router();

const { getVacantes, getVacantesColegio, getVacanteById, deleteVacanteById, createVacante } = require("../controllers/vacanteController");
const { requireAdmin, requireAuth } = require("../middlewares/auth");

vacanteRouter.get("/", getVacantes);
vacanteRouter.get("/colegio/:idColegio", getVacantesColegio);
vacanteRouter.post("/", requireAuth, createVacante);
vacanteRouter.get("/:idVacante", requireAuth, getVacanteById);
vacanteRouter.delete("/:idVacante", requireAuth,  deleteVacanteById);

module.exports = vacanteRouter;