import { sequelize } from "../../../config/DataBase";
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  ForeignKey,
} from "sequelize";
import { EstadoAccesion } from "./EstadoAccesion";
import { NombreLocal } from "../../taxonomy/models/NombreLocal";

export class Accesion extends Model<
  InferAttributes<Accesion>,
  InferCreationAttributes<Accesion>
> {
  declare accesionId: CreationOptional<number>;
  declare estadoAccesionId: ForeignKey<EstadoAccesion["estadoAccesionId"]>;
  declare nombreLocalId: ForeignKey<NombreLocal["nombreLocalId"]>;
  declare createdAt: CreationOptional<Date>;
}

Accesion.init(
  {
    accesionId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    createdAt: DataTypes.DATEONLY,
  },
  {
    tableName: "EstadoAccesion",
    freezeTableName: true,
    paranoid: true,
    sequelize,
  }
);

Accesion.sync({ alter: true })
  .catch((e) => {
    console.log(e.message);
  })
  .then(() => {
    console.log("Tabla EstadoAccesion actualizada");
  });
