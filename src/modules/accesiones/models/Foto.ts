import { sequelize } from "../../../config/DataBase";
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  ForeignKey,
} from "sequelize";

import { Accesion } from "./Accesion";

export class Foto extends Model<
  InferAttributes<Foto>,
  InferCreationAttributes<Foto>
> {
  declare fotoId: CreationOptional<number>;
  declare fotoUrl: string;
  declare accesionId: ForeignKey<Accesion["accesionId"]>;
}

Foto.init(
  {
    fotoId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fotoUrl: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "Foto",
    freezeTableName: true,
    paranoid: true,
    sequelize,
  }
);

Accesion.hasMany(Foto, {
  foreignKey: "accesionId",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
Foto.belongsTo(Accesion, {
  foreignKey: "accesionId",
});

Foto.sync({ alter: true })
  .catch((e) => {
    console.log(e.message);
  })
  .then(() => {
    console.log("Tabla Foto actualizada");
  });
