const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Ventas",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      totalprice: {
        type: DataTypes.INTEGER,
      },
      status: {
        type: DataTypes.STRING,
        // type: DataTypes.ENUM("Pending", "Canceled", "Paid"),
        defaultValue: "Pending",
      },
      mp_payment_id: {
        type: DataTypes.BIGINT,
      },
      mp_merchantOrder_id: {
        type: DataTypes.BIGINT,
      },
      months: {
        type: DataTypes.INTEGER,
      },
      accumulated_months: {
        type: DataTypes.INTEGER,
      },
      InicioPlan: {
        type: DataTypes.DATEONLY,
      },
      vencimientoPlan: {
        type: DataTypes.DATEONLY,
      },
      activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
