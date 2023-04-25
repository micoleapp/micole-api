const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("Review", {
    id: {
      type: DataTypes.UUID, //alfanumerico random
      defaultValue: DataTypes.UUIDV4,
      allowNull: false, // allowNull = Permite un vacio ----> seteamos en falso
      primaryKey: true,
    },
    rating: {
      type: DataTypes.FLOAT,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        is: {
          args: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
          msg: "Nombre solo puede contener letras, acentos, tildes y espacios",
        },
        len: {
          args: [4, 60],
          msg: 'Nombre debe tener entre 4 y 60 letras',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: "Ingresa un email valido",
        },
      },
    },
    comentario: {
      type: DataTypes.STRING,
    }
  }, {
    timestamps: false
  });
};