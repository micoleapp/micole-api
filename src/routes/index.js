const { Router } = require("express");
const pkg = require("../../package.json");

const authRouter = require("./authRoutes.js");
const colegioRouter = require("./colegio.js");
const departamentoRouter = require("./departamento.js");
const provinciaRouter = require("./provincia.js");
const distritoRouter = require("./distritoRouter.js");
const paisRouter = require("./pais.js");
const userRouter = require("./userRoutes.js");
const categoriaRouter = require("./categoria.js");
const vacanteRouter = require("./vacanteRouter.js");
const horarioRouter = require("./horarioRoutes.js");
const infraestructuraRouter = require("./infraestructura.js");
const gradoRouter = require("./grado.js");
const nivelRouter = require("./nivel.js");
const afiliacionRouter = require("./AfiliacionRoutes.js");
const citaRouter = require("./citaRouter");
const paymentRouter = require("./payment");
const ventasRouter = require("./ventas");
const reviewRouter = require("./reviewRouter");
const informeRouter = require("./informeRouter");
const metodosRouter = require("./metodos");
const dificultadesRouter = require("./dificultades");
const eventoRouter = require("./eventoRoutes");
const reportesRouter = require("./reportesRoutes");
const vencidosRouter = require("./vencidos");
const listaRouter = require("./listaDeEspera");
const preciosRouter = require("./PreciosRoutes");
const idiomasRouter = require("./idiomas");

const router = Router();

router.use("/colegios", colegioRouter);
router.use("/departamentos", departamentoRouter);
router.use("/provincias", provinciaRouter);
router.use("/distritos", distritoRouter);
router.use("/paises", paisRouter);
router.use("/categorias", categoriaRouter);
router.use("/vacantes", vacanteRouter);
router.use("/horarios", horarioRouter);
router.use("/infraestructuras", infraestructuraRouter);
router.use("/grados", gradoRouter);
router.use("/niveles", nivelRouter);
router.use("/afiliaciones", afiliacionRouter);
router.use("/citas", citaRouter);
router.use("/reviews", reviewRouter);
router.use("/payments", paymentRouter);
router.use("/ventas", ventasRouter);
router.use("/metodos", metodosRouter);
router.use("/dificultades", dificultadesRouter);
router.use("/informes", informeRouter);
router.use("/eventos", eventoRouter);
router.use("/reportes", reportesRouter);
router.use("/vencidos", vencidosRouter);
router.use("/lista", listaRouter);
router.use("/precios", preciosRouter);
router.use("/idiomas", idiomasRouter);

router.get("/", (req, res) =>
  res.json({ name: pkg.name, version: pkg.version })
);
router.use("/auth", authRouter);
router.use("/users", userRouter);

module.exports = router;
