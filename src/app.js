const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");
const errorHandler = require("./middlewares/errorHandler");
const { authenticate } = require("./middlewares/auth.js");
require("./db.js");

const server = express();

server.name = "MI-COLE";

server.use(bodyParser.urlencoded({ extended: true, limit: "300mb" }));
server.use(bodyParser.json({ limit: "300mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization" // agregamos la cabecera Authorization
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
server.use(authenticate(process.env.JWT_SECRET));
server.use("/", routes);
server.use(errorHandler);
// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
