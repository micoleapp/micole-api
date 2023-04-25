const { Router } = require("express");
const router = Router();
const { ListaDeEspera, User, Grado, Colegio, Auth } = require("../db.js");

//------- PEDIR TODOS LOSREGISTROS DE LA LISTA--------
router.get("/", async (req, res) => {
  try {
    let lista;
    lista = await ListaDeEspera.findAll({
      include: [
        {
          model: Colegio,
          attributes: ["id", "nombre_colegio"],
        },
        {
          model: Grado,
          attributes: ["id", "nombre_grado"],
        },
        {
          model: User,
          include: [
            {
              model: Auth,
              attributes: ["email"],
            },
          ],
          attributes: [
            "nombre_responsable",
            "apellidos_responsable",
            "telefono",
          ],
        },
      ],
      attributes: ["id", "año"],
    });

    res.json(lista);
  } catch (err) {
    res.json({ err });
  }
});

//------- PEDIR TODOS LOS REGISTROS POR USUARIO DE LA LISTA--------
router.get("/usuario/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let lista;
    lista = await ListaDeEspera.findAll({
      where: { UserId: id },
      attributes: {
        exclude: ["ColegioId", "GradoId", "UserId"],
      },
      include: [
        {
          model: Colegio,
          attributes: ["id", "nombre_colegio"],
        },
        {
          model: Grado,
          attributes: ["id", "nombre_grado"],
        },
        {
          model: User,
          include: [
            {
              model: Auth,
              attributes: ["email"],
            },
          ],
          attributes: [
            "id",
            "nombre_responsable",
            "apellidos_responsable",
            "telefono",
          ],
        },
      ],
    });

    res.json(lista);
  } catch (err) {
    res.json({ err });
  }
});

//------- PEDIR POR FILTRADO DE FECHA O GRADO DE LA LISTA--------
router.get("/filtro", async (req, res) => {
  const { gradoId, fecha, colegioId, order } = req.body;
  let orderBy = null;
  let lista;
  if (order) {
    switch (order) {
      case "gradoASC":
        orderBy = [["GradoId", "ASC"]];
        break;
      case "gradoDESC":
        orderBy = [["GradoId", "DESC"]];
        break;
      case "fechaASC":
        orderBy = [["createdAt", "ASC"]];
          break;
      case "fechaDESC":
        orderBy = [["createdAt", "DESC"]];
        break;
    }
  }

  try {
    lista = await ListaDeEspera.findAll({
      where: {
        ColegioId: colegioId,
        ...(gradoId && { GradoId: gradoId }),
        ...(fecha && { createdAt: fecha }),
      },
      attributes: {
        exclude: ["ColegioId", "GradoId", "UserId"],
      },
      include: [
        {
          model: Colegio,
          attributes: ["id", "nombre_colegio"],
        },
        {
          model: Grado,
          attributes: ["id", "nombre_grado"],
        },
        {
          model: User,
          include: [
            {
              model: Auth,
              attributes: ["email"],
            },
          ],
          attributes: [
            "id",
            "nombre_responsable",
            "apellidos_responsable",
            "telefono",
          ],
        },
      ],
      order: orderBy,
    });
    lista.length !== 0
      ? res.json(lista)
      : res.status(500).send({
          message: "No existen registros con esos parametros",
        });
  } catch (err) {
    res.status(500).send({
      message: "Tu consulta no pudo ser procesada",
    });
  }
});

//------- PEDIR TODOS LOS REGISTROS POR COLEGIO DE LA LISTA--------
router.get("/colegio/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let lista;
    lista = await ListaDeEspera.findAll({
      where: { ColegioId: id },
      attributes: {
        exclude: ["ColegioId", "GradoId", "UserId"],
      },
      include: [
        {
          model: Colegio,
          attributes: ["id", "nombre_colegio"],
        },
        {
          model: Grado,
          attributes: ["id", "nombre_grado"],
        },
        {
          model: User,
          include: [
            {
              model: Auth,
              attributes: ["email"],
            },
          ],
          attributes: [
            "id",
            "nombre_responsable",
            "apellidos_responsable",
            "telefono",
          ],
        },
      ],
    });
    res.json(lista);
  } catch (err) {
    res.json({ err });
  }
});

//------- POST EN LA LISTA--------
router.post("/", async (req, res) => {
  try {
    var today = new Date();
    const { año, colegioId, usuarioId, gradoId } = req.body;
    const validacion = await Colegio.findOne({
      where: { id: usuarioId },
    });
    if (validacion) {
      return res.status(501).json({
        message: "Un Colegio no puede inscribirse en lista de Espera",
      });
    }
    const [lista, created] = await ListaDeEspera.findOrCreate({
      where: {
        año,
        ColegioId: colegioId,
        UserId: usuarioId,
        GradoId: gradoId,
        createdAt: today,
      },
    });
    if (created) {
      await lista.setUser(usuarioId);
      await lista.setGrado(gradoId);
      await lista.setColegio(colegioId);
      res.status(200).json(lista);
    } else {
      res.status(501).json({
        message: "Ya te encuentras en la lista de espera de este Colegio",
      });
    }
  } catch (err) {
    res.status(501).json({
      message: "Error al inscribirte en la lista",
    });
  }
});

//--------------------DELETE DE LA LISTA--------------------

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteRegistro = await ListaDeEspera.findOne({
      where: { id: id },
    });
    await deleteRegistro.destroy();
    res.status(200).send({ message: "Has sido borrado de la lista de espera" });
  } catch (err) {
    res.status(500).send({ err });
  }
});

module.exports = router;
