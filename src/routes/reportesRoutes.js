const { Router } = require("express");
const reportesRouter = Router();

const { reportesPanelAdmin } = require("../controllers/graficos/ReportesColegio");

reportesRouter.get("/admin", reportesPanelAdmin);

module.exports = reportesRouter;