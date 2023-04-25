const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "Dificultades",
    {
      id_dificultad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      nombre_dificultad: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
};
