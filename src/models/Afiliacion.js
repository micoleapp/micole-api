const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'Afiliacion',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      nombre_afiliacion: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            msg: 'El campo nombre no puede estar vacío',
          },
        },
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            msg: 'El campo slug no puede estar vacío',
          },
        },
      },
      logo: {
        type: DataTypes.STRING,
        validate: {
          isUrl: {
            msg: 'El campo logo debe ser una URL válida de una imagen',
          },
        },
      },
    },
    {
      timestamps: false,
    }
  );
};
