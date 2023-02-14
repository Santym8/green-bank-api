import { sequelize } from "../../../config/DataBase";
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from "sequelize";

// const sequelize = DataBase.sequelize;

class Genero extends Model<
  InferAttributes<Genero>,
  InferCreationAttributes<Genero>
> {
  declare generoId: CreationOptional<number>;
  declare generoNombre: string;
}

Genero.init(
  {
    generoId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    generoNombre: {
      type: new DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    tableName: "Generos",
    sequelize
  }
);
