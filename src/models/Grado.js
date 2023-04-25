const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Grado",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      nombre_grado: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            msg: "El campo nombre_grado no puede estar vacío",
          },
        },
      },
    },
    {
      timestamps: false,
    }
  );
};
