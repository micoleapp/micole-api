require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT } = process.env;

const sequelize =
  process.env.NODE_ENV === "production"
    ? new Sequelize({
        database: DB_NAME,
        dialect: "postgres",
        host: DB_HOST,
        port: DB_PORT,
        username: DB_USER,
        password: DB_PASSWORD,
        pool: {
          max: 3,
          min: 1,
          idle: 10000,
        },
        dialectOptions: {
          ssl: {
            require: true,
            // Ref.: https://github.com/brianc/node-postgres/issues/2009
            rejectUnauthorized: false,
          },
          keepAlive: true,
        },
        ssl: true,
      })
    : new Sequelize(
        `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
        {
          logging: false, // set to console.log to see the raw SQL queries
          native: false, // lets Sequelize know we can use pg-native for ~30% more speed
        }
      );

//postgres://tupcideal_api_user:KFHE3ZJeeTdvfEcBS14GUrEwYtAzsv3E@dpg-cd8u5lqrrk0a86rqejpg-a/tupcideal_api

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const {
  Afiliacion,
  Afiliacion_tipo,
  Auth,
  Categoria,
  Cita,
  Colegio,
  Departamento,
  Dificultades,
  Distrito,
  Evento,
  Grado,
  Horario,
  Idioma,
  Infraestructura,
  Infraestructura_tipo,
  ListaDeEspera,
  Metodos,
  Nivel,
  Pais,
  Plan_Pago,
  Provincia,
  Review,
  Trafico,
  User,
  Vacante,
  Ventas,
} = sequelize.models;

// Aca vendrian las relaciones
Colegio.belongsToMany(Idioma, { through: "Colegio_Idioma", timestamps: false });
Idioma.belongsToMany(Colegio, { through: "Colegio_Idioma", timestamps: false });

//------RELACION DE AUTENTICACION-----
User.belongsTo(Auth, { foreignKey: "idAuth" });
Colegio.belongsTo(Auth, { foreignKey: "idAuth" });

//------RELACIONES DE UBICACION------
Pais.hasMany(Colegio, {
  foreignKey: "PaisId",
});
Colegio.belongsTo(Pais, {
  foreignKey: "PaisId",
});

Departamento.hasMany(Colegio, {
  foreignKey: "DepartamentoId",
});
Colegio.belongsTo(Departamento, {
  foreignKey: "DepartamentoId",
});

Provincia.hasMany(Colegio, {
  foreignKey: "ProvinciaId",
});
Colegio.belongsTo(Provincia, {
  foreignKey: "ProvinciaId",
});

Distrito.hasMany(Colegio, {
  foreignKey: "DistritoId",
});
Colegio.belongsTo(Distrito, {
  foreignKey: "DistritoId",
});
//------RELACIONES DE DIVISIÓN POLITICA------

Pais.hasMany(Departamento, {
  foreignKey: "PaisId",
});
Departamento.belongsTo(Pais, {
  foreignKey: "PaisId",
});

Departamento.hasMany(Provincia, {
  foreignKey: "DepartamentoId",
});
Provincia.belongsTo(Departamento, {
  foreignKey: "DepartamentoId",
});

Provincia.hasMany(Distrito, {
  foreignKey: "ProvinciaId",
});
Distrito.belongsTo(Provincia, {
  foreignKey: "ProvinciaId",
});

Nivel.hasMany(Grado, {
  foreignKey: "NivelId",
});
Grado.belongsTo(Nivel, {
  foreignKey: "NivelId",
});

Colegio.belongsToMany(Nivel, {
  through: "Colegio_Nivel",
  timestamps: false,
});
Nivel.belongsToMany(Colegio, {
  through: "Colegio_Nivel",
  timestamps: false,
});

Colegio.belongsToMany(Infraestructura, {
  through: "Colegio_Infraestructura",
  timestamps: false,
});
Infraestructura.belongsToMany(Colegio, {
  through: "Colegio_Infraestructura",
  timestamps: false,
});

Colegio.belongsToMany(Nivel, {
  through: "Colegio_Nivel",
  timestamps: false,
});
Nivel.belongsToMany(Colegio, {
  through: "Colegio_Nivel",
  timestamps: false,
});

Colegio.belongsToMany(Afiliacion, {
  through: "Colegio_Afiliacion",
  timestamps: false,
});
Afiliacion.belongsToMany(Colegio, {
  through: "Colegio_Afiliacion",
  timestamps: false,
});

Nivel.hasMany(Grado, {
  foreignKey: "NivelId",
});
Grado.belongsTo(Nivel, {
  foreignKey: "NivelId",
});

//------RELACIONES ADMINISTRATIVAS------

Plan_Pago.hasMany(Colegio, {
  foreignKey: "PlanPagoId",
});
Colegio.belongsTo(Plan_Pago, {
  foreignKey: "PlanPagoId",
});

Colegio.hasMany(Horario, {
  foreignKey: "ColegioId",
});
Horario.belongsTo(Colegio, {
  foreignKey: "ColegioId",
});

Colegio.belongsToMany(Categoria, {
  through: "Colegio_Categoria",
  timestamps: false,
});
Categoria.belongsToMany(Colegio, {
  through: "Colegio_Categoria",
  timestamps: false,
});

Colegio.belongsToMany(Metodos, {
  through: "Colegio_Metodos",
  timestamps: false,
});
Metodos.belongsToMany(Colegio, {
  through: "Colegio_Metodos",
  timestamps: false,
});

Colegio.belongsToMany(Dificultades, {
  through: "Colegio_Dificultades",
  timestamps: false,
});
Dificultades.belongsToMany(Colegio, {
  through: "Colegio_Dificultades",
  timestamps: false,
});

Colegio.hasMany(Vacante, {
  foreignKey: "ColegioId",
});
Vacante.belongsTo(Colegio, {
  foreignKey: "ColegioId",
});
Grado.hasMany(Vacante, {
  foreignKey: "GradoId",
});
Vacante.belongsTo(Grado, {
  foreignKey: "GradoId",
});

Afiliacion_tipo.hasMany(Afiliacion, {
  foreignKey: "Afiliacion_tipo_Id",
});
Afiliacion.belongsTo(Afiliacion_tipo, {
  foreignKey: "Afiliacion_tipo_Id",
});

Colegio.hasMany(Ventas, {
  foreignKey: "ColegioId",
});
Ventas.belongsTo(Colegio, {
  foreignKey: "ColegioId",
});

Plan_Pago.hasMany(Ventas, {
  foreignKey: "PlanPagoId",
});
Ventas.belongsTo(Plan_Pago, {
  foreignKey: "PlanPagoId",
});

Colegio.hasMany(Cita, {
  foreignKey: "ColegioId",
});
Cita.belongsTo(Colegio, {
  foreignKey: "ColegioId",
});

Grado.hasMany(Cita, {
  foreignKey: "GradoId",
});
Cita.belongsTo(Grado, {
  foreignKey: "GradoId",
});

Colegio.hasMany(Review, {
  foreignKey: "ColegioId",
});
Review.belongsTo(Colegio, {
  foreignKey: "ColegioId",
});

Colegio.hasMany(Evento, {
  foreignKey: "ColegioId",
});
Evento.belongsTo(Colegio, {
  foreignKey: "ColegioId",
});

Colegio.hasMany(Trafico, {
  foreignKey: "ColegioId",
});
Trafico.belongsTo(Colegio, {
  foreignKey: "ColegioId",
});

Colegio.hasMany(ListaDeEspera, {
  foreignKey: "ColegioId",
});
ListaDeEspera.belongsTo(Colegio, {
  foreignKey: "ColegioId",
});

User.hasMany(ListaDeEspera, {
  foreignKey: "UserId",
});
ListaDeEspera.belongsTo(User, {
  foreignKey: "UserId",
});

Grado.hasMany(ListaDeEspera, {
  foreignKey: "GradoId",
});
ListaDeEspera.belongsTo(Grado, {
  foreignKey: "GradoId",
});

User.belongsToMany(Evento, { through: "Evento_Usuario", timestamps: false });
Evento.belongsToMany(User, { through: "Evento_Usuario", timestamps: false });

Infraestructura_tipo.hasMany(Infraestructura);
Infraestructura.belongsTo(Infraestructura_tipo);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
