const { Router } = require("express");
const eventoRouter = Router();

const { getEventosColegio, registrationEvent, createEvento, getEventoById, deleteEvento, updateEvento } = require("../controllers/eventoController");

eventoRouter.get("/", getEventosColegio);
eventoRouter.post("/", createEvento);
eventoRouter.get("/:idEvento", getEventoById);
eventoRouter.put("/:idEvento", updateEvento);
eventoRouter.delete("/:idEvento", deleteEvento);
eventoRouter.post("/registration", registrationEvent);

module.exports = eventoRouter;