const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'Vacante',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      alumnos_matriculados: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: 'El campo alumnos_matriculados no puede estar vacío',
          },
          isInt: {
            msg: 'El campo alumnos_matriculados debe ser un número entero',
          },
          min: {
            args: [0],
            msg: 'El campo alumnos_matriculados debe ser un número entero positivo',
          },
        },
      },
      matricula: {
        type: DataTypes.DECIMAL(10, 0),
        validate: {
          notEmpty: {
            msg: 'El campo matricula no puede estar vacío',
          },
          isDecimal: {
            msg: 'El campo matricula debe ser un número decimal',
          },
          min: {
            args: [0],
            msg: 'El campo matricula debe ser un número decimal positivo',
          },
        },
      },
      cuota_pension: {
        type: DataTypes.DECIMAL(10, 0),
        validate: {
          notEmpty: {
            msg: 'El campo cuota_pension no puede estar vacío',
          },
          isDecimal: {
            msg: 'El campo cuota_pension debe ser un número decimal',
          },
          min: {
            args: [0],
            msg: 'El campo cuota_pension debe ser un número decimal positivo',
          },
        },
      },
      cuota_ingreso: {
        type: DataTypes.DECIMAL(10, 0),
        validate: {
          notEmpty: {
            msg: 'El campo cuota_ingreso no puede estar vacío',
          },
          isDecimal: {
            msg: 'El campo cuota_pension debe ser un número decimal',
          },
          min: {
            args: [0],
            msg: 'El campo cuota_pension debe ser un número decimal positivo',
          },
        },
      },
      capacidad: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: 'El campo capacidad no puede estar vacío',
          },
          isNumeric: {
            msg: 'La capacidad debe ser un número',
          },
          isInt: {
            msg: 'La capacidad debe ser un número entero',
          },
          min: {
            args: 1,
            msg: 'La capacidad debe ser al menos 1',
          },
        },
      },
      año: {
        type: DataTypes.INTEGER,
        validate: {
          esAnioValido(value) {
            const anioActual = new Date().getFullYear();
            const anioMaximo = anioActual + 2;
            if (value < anioActual || value > anioMaximo) {
              throw new Error('El campo "Año" debe ser el año actual o hasta dos años posteriores');
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
