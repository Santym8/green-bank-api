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
import { Usuario } from "../../usuarios/models/Usuario";

export class Protocolo extends Model<
  InferAttributes<Protocolo>,
  InferCreationAttributes<Protocolo>
> {
  declare protocoloId: CreationOptional<number>;
  declare protocoloUrl: string;
  declare createdAt: CreationOptional<Date>;

  declare accesionId: ForeignKey<Accesion["accesionId"]>;
  declare usuarioId: ForeignKey<Usuario["usuarioId"]>;
}

Protocolo.init(
  {
    protocoloId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    protocoloUrl: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdAt: { type: DataTypes.DATEONLY },
  },
  {
    tableName: "Protocolo",
    freezeTableName: true,
    paranoid: true,
    sequelize,
  }
);

Accesion.hasMany(Protocolo, {
  foreignKey: "accesionId",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
Protocolo.belongsTo(Accesion, {
  foreignKey: "accesionId",
});

Usuario.hasMany(Protocolo, {
  foreignKey: "usuarioId",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
Protocolo.belongsTo(Usuario, {
  foreignKey: "usuarioId",
});

Protocolo.sync({ alter: true })
  .catch((e) => {
    console.log(e.message);
  })
  .then(() => {
    console.log("Tabla Protocolo actualizada");
  });
