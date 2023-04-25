const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "Metodos",
    {
      id_metodo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      nombre_metodo: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
};
