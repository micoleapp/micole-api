const { Router } = require("express");
const pkg = require("../../package.json");

const authRouter = require("./authRoutes.js");
const colegioRouter = require("./colegioRoutes.js");
const departamentoRouter = require("./departamentoRoutes.js");
const provinciaRouter = require("./provinciaRoutes.js");
const distritoRouter = require("./distritoRoutes.js");
const paisRouter = require("./paisRoutes.js");
const userRouter = require("./userRoutes.js");
const categoriaRouter = require("./categoriaRoutes.js");
const vacanteRouter = require("./vacanteRoutes.js");
const horarioRouter = require("./horarioRoutes.js");
const infraestructuraRouter = require("./infraestructuraRoutes.js");
const gradoRouter = require("./gradoRoutes.js");
const nivelRouter = require("./nivelRoutes.js");
const afiliacionRouter = require("./afiliacionRoutes.js");
const citaRouter = require("./citaRoutes.js");
const paymentRouter = require("./payment");
const ventasRouter = require("./ventas");
const reviewRouter = require("./reviewRoutes");
const informeRouter = require("./informeRoutes");
const metodosRouter = require("./metodoRoutes");
const dificultadesRouter = require("./dificultadRoutes");
const eventoRouter = require("./eventoRoutes");
const reportesRouter = require("./reportesRoutes");
const vencidosRouter = require("./vencidos");
const listaRouter = require("./listaDeEspera");
const preciosRouter = require("./precioRoutes");
const idiomasRouter = require("./idiomaRoutes");
const comparadorRouter = require("./comparador");

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
router.use("/comparador", comparadorRouter);

router.get("/", (_, res) =>
  res.json({ name: pkg.name, version: pkg.version })
);
router.use("/auth", authRouter);
router.use("/users", userRouter);

module.exports = router;
