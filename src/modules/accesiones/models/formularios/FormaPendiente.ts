import { sequelize } from "../../../../config/DataBase";
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from "sequelize";

export class FormaPendiente extends Model<
  InferAttributes<FormaPendiente>,
  InferCreationAttributes<FormaPendiente>
> {
  declare formaPendienteId: CreationOptional<number>;
  declare formaPendienteNombre: string;
}

FormaPendiente.init(
  {
    formaPendienteId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    formaPendienteNombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: (data, options) => {
        data.formaPendienteNombre = data.formaPendienteNombre.toUpperCase();
      },
      beforeUpdate: (data, options) => {
        data.formaPendienteNombre = data.formaPendienteNombre.toUpperCase();
      },
    },
    tableName: "FormaPendiente",
    freezeTableName: true,
    paranoid: true,
    sequelize,
  }
);

FormaPendiente.sync({ alter: true })
  .catch((e) => {
    console.log(e.message);
  })
  .then(() => {
    console.log("Tabla FormaPendiente actualizada");
  });
