const { DataTypes } = require('sequelize');
const moment = require('moment');

module.exports = (sequelize) => {
  sequelize.define(
    'Cita',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      fecha_cita: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      hora_cita: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'El campo hora_cita no puede estar vacío',
          },
          validarHora: function (hora) {
            if (!moment(hora, 'HH:mm').isValid()) {
              throw new Error(
                'El formato de la hora debe ser HH:mm'
              );
            }
            if (moment(hora, 'HH:mm') < moment().startOf('day')) {
              throw new Error(
                'La hora de la cita debe estar entre 00:00 y 23:59'
              );
            }
          },
        },
      },
      modalidad: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Presencial',
        validate: {
          customValidator: (value) => {
            const enums = ['Presencial', 'Virtual'];
            if (!enums.includes(value)) {
              // Use Array.includes() to validate.
              throw new Error('not a valid option');
            }
          },
        },
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          is: {
            args: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
            msg: 'El nombre solo puede contener letras, acentos, tildes y espacios',
          },
          len: {
            args: [2, 60],
            msg: 'El nombre debe tener entre 2 y 60 letras',
          },
        },
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
      telefono: {
        type: DataTypes.BIGINT,
        validate: {
          isInt: {
            args: true,
            msg: 'El número telefónico solo debe contener números',
          },
        },
      },
      añoIngreso: {
        type: DataTypes.STRING,
      },
      activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      estado: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Solicitud',
        validate: {
          customValidator: (value) => {
            const enums = ['Solicitud', 'Realizada', 'Aplicacion', 'Entrevista', 'VOfrecida', 'VAceptada', 'Cancelado', 'Finalizado'];
            if (!enums.includes(value)) {
              // Use Array.includes() to validate.
              throw new Error('not a valid option');
            }
          },
        },
      },
    },
    {
      timestamps: false,
    }
  );
};
 