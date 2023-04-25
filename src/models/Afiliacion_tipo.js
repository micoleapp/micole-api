const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'Afiliacion_tipo',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      afiliacion_tipo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
