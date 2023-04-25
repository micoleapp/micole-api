const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'Horario',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      dia: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      horarios: {
        type: DataTypes.JSON,
        allowNull: true,
      },
    },
    {
      timestamps: false,
    }
  );
};

