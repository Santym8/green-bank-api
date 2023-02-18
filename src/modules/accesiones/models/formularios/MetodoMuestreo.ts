import { sequelize } from "../../../../config/DataBase";
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from "sequelize";

export class MetodoMuestreo extends Model<
  InferAttributes<MetodoMuestreo>,
  InferCreationAttributes<MetodoMuestreo>
> {
  declare metodoMuestreoId: CreationOptional<number>;
  declare metodoMuestreoNombre: string;
}

MetodoMuestreo.init(
  {
    metodoMuestreoId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    metodoMuestreoNombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: (data, options) => {
        data.metodoMuestreoNombre = data.metodoMuestreoNombre.toUpperCase();
      },
      beforeUpdate: (data, options) => {
        data.metodoMuestreoNombre = data.metodoMuestreoNombre.toUpperCase();
      },
    },
    tableName: "MetodoMuestreo",
    freezeTableName: true,
    paranoid: true,
    sequelize,
  }
);

MetodoMuestreo.sync({ alter: true })
  .catch((e) => {
    console.log(e.message);
  })
  .then(() => {
    console.log("Tabla MetodoMuestreo actualizada");
  });
