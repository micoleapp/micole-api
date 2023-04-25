const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize) => {
  const Auth = sequelize.define(
    "Auth",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
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
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          check: (value) => {
            const hasUppercase = /[A-Z]/.test(value);
            const hasSign = /[@$!%*#?&]/.test(value);
            if (!hasUppercase || !hasSign) {
              throw new Error(
                "La contraseña debe tener al menos una letra mayúscula y un signo"
              );
            }
          },
        },
      },
      rol: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Usuario",
        validate:{
          customValidator:(value)=>{
            const enums= ["Usuario","Colegio","Admin"]
            if (!enums.includes(value)) { // Use Array.includes() to validate.
            throw new Error('not a valid option')
          }
        }
      },
    },
      isBanned: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      hooks: {
        beforeCreate: async (auth) => {
          const salt = await bcrypt.genSalt(10);
          auth.password = await bcrypt.hash(auth.password, salt);
        },
        beforeUpdate: async (auth) => {
          if (auth.changed("password")) {
            auth.password = await bcrypt.hash(auth.password, 10);
          }
        },
      },
      timestamps: true,
    }
  );

  Auth.prototype.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
  };

  return Auth;
};
