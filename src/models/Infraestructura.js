const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Infraestructura",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      nombre_infraestructura: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            msg: "El campo nombre_infraestructura no puede estar vacío",
          },
        },
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            msg: "El campo slug no puede estar vacío",
          },
        },
      },
      imagen: {
        type: DataTypes.STRING,
        validate: {
          isUrl: {
            msg: "El campo imagen debe ser una URL válida de una imagen",
          },
        },
      },
    },

    {
      timestamps: false,
    }
  );
};
