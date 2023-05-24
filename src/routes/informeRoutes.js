const { Router } = require("express");
const informeRouter = Router();

const { sendInfoEmail } = require("../controllers/informeController");

informeRouter.post("/", sendInfoEmail);

module.exports = informeRouter;
