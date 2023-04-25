const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'Informe',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      nombre_colegio: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: {
            args: true,
            msg: 'Ingresa un email valido',
          },
        },
      },
      ruc: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      telefono: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );
};
