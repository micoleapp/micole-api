const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Distrito",
    {
      id: {
        type: DataTypes.INTEGER, 
        allowNull: false, 
        primaryKey: true,
      },
      nombre_distrito: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
