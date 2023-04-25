const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      nombre_responsable: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          is: {
            args: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
            msg: 'El campo nombre_responsable solo puede contener letras, acentos, tildes y espacios',
          },
          len: {
            args: [3, 60],
            msg: 'El campo nombre_responsable debe tener entre 3 y 60 letras',
          },
        },
      },
      apellidos_responsable: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          is: {
            args: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
            msg: 'El campo apellidos_responsable solo puede contener letras, acentos, tildes y espacios',
          },
          len: {
            args: [6, 60],
            msg: 'El campo apellidos_responsable debe tener entre 6 y 60 letras',
          },
        },
      },
      telefono: {
        type: DataTypes.BIGINT,
        validate: {
          isInt: {
            args: true,
            msg: 'El campo número telefónico solo debe contener números',
          },
        },
      },
      avatar: {
        type: DataTypes.STRING,
        defaultValue:
          'http://www.elblogdecha.org/wp-content/uploads/2021/06/perfil-vacio.jpg',
      },
      createdAt: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
    },
    {
      timestamps: false,
    }
  );
};