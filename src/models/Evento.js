const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Evento",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      nombre_evento: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "El campo nombre_evento no puede estar vacío",
          },
        },
      },
      descripcion: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "El campo descripcion no puede estar vacío",
          },
        },
      },
      tipo_evento: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "El campo tipo evento no puede estar vacío",
          },
        },
      },
      fecha_evento: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      hora_evento: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'El campo hora_cita no puede estar vacío',
          },
        },
      },
      capacidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'El campo capacidad no puede estar vacío',
          },
          isNumeric: {
            msg: 'La capacidad debe ser un número',
          },
          isInt: {
            msg: 'La capacidad debe ser un número entero',
          },
        },
      },
      imagen_evento: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
