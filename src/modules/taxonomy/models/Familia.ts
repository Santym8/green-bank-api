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
    hooks: {
      beforeCreate: (familia, options) => {
        familia.familiaNombre = familia.familiaNombre.toUpperCase();
      },
      beforeUpdate: (familia, options) => {
        familia.familiaNombre = familia.familiaNombre.toUpperCase();
        console.log('aaaaaaaaaaaaaaaa')
      },
    },
    tableName: "Familias",
    sequelize,
  }
);
