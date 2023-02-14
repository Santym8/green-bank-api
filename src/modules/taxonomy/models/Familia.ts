import { sequelize } from "../../../config/DataBase";
const { Sequelize } = require("sequelize");
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from "sequelize";



export class Familia extends Model<
  InferAttributes<Familia>,
  InferCreationAttributes<Familia>
> {
  declare familiaId: CreationOptional<number>;
  declare familiaNombre: string;
}

Familia.init(
  {
    familiaId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    familiaNombre: {
      type: new DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    tableName: "Familias",
    sequelize,
  }
);
