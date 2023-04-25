require("dotenv").config();
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const insertDistritos = require("./src/utils/insertDistritos");
const CronJob = require("cron").CronJob;
const { jobs } = require("./src/controllers/vencimientoController");

const validacion = new CronJob(process.env.CRON_TIME, jobs);
validacion.start();

conn.sync({ force: false }).then(() => {
  insertDistritos();
  server.listen(process.env.PORT, () => {
    console.log(`⇒ listening at port ${process.env.PORT}`);
  });
});
