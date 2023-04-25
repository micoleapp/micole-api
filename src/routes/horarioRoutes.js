const { Router } = require("express");
const horarioRouter = Router();

const { getHorarioByIdColegio, createHorario } = require("../controllers/horarioController");

horarioRouter.get("/:idColegio", getHorarioByIdColegio);
horarioRouter.post("/", createHorario);

module.exports = horarioRouter;
