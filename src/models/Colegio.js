const { DataTypes, Sequelize } = require("sequelize");
// Exportamos una funcion que define el modelo y le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Colegio",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      nombre_responsable: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: {
            args: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
            msg: "El nombre solo puede contener letras, acentos, tildes y espacios",
          },
          len: {
            args: [2, 60],
            msg: "El nombre debe tener entre 3 y 60 letras",
          },
        },
      },
      apellidos_responsable: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: {
            args: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
            msg: "El apellido solo puede contener letras, acentos, tildes y espacios",
          },
          len: {
            args: [2, 60],
            msg: "El apellido debe tener entre 6 y 60 letras",
          },
        },
      },

      nombre_colegio: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: {
            args: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
            msg: "El nombre del colegio solo puede contener letras, acentos, tildes y espacios",
          },
          len: {
            args: [2, 60],
            msg: "El nombre debe tener entre 2 y 60 letras",
          },
        },
      },

      slug: {
        type: DataTypes.STRING,
        validate: {
          is: {
            args: /^[a-zA-Z-]+$/,
            msg: "El slug solo puede contener letras y guiones",
          },
          len: {
            args: [2, 60],
            msg: "El slug debe tener entre 2 y 60 letras",
          },
        },
      },

      direccion: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      ruc: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },

      numero_estudiantes: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      fecha_fundacion: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      nombre_director: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          is: {
            args: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
            msg: "El nombre del director solo puede contener letras, acentos, tildes y espacios",
          },
          len: {
            args: [2, 60],
            msg: "El nombre debe tener entre 2 y 60 letras",
          },
        },
      },
      logo: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      visualizaciones: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },

      primera_imagen: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      galeria_fotos: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      video_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      area: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      ugel: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },

      ubicacion: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [0, 200],
        },
      },

      referencia_ubicacion: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      telefono: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },

      propuesta_valor: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      descripcion: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      horas_idioma_extranjero: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      rating: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      mes_prueba: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      createdAt: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    },

    {
      timestamps: false,
    }
  );
};
