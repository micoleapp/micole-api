const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Idioma",
    {
      id: {
        type: DataTypes.INTEGER, 
        allowNull: false,
        primaryKey: true,
      },
      nombre_idioma: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
};
