const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Provincia",
    {
      id: {
        type: DataTypes.INTEGER, //alfanumerico random
        allowNull: false, // allowNull = Permite un vacio ----> seteamos en falso
        primaryKey: true,
      },
      nombre_provincia: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
