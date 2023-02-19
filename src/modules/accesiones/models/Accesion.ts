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
import { Usuario } from "../../usuarios/models/Usuario";

export class Accesion extends Model<
  InferAttributes<Accesion>,
  InferCreationAttributes<Accesion>
> {
  declare accesionId: CreationOptional<number>;
  declare createdAt: CreationOptional<Date>;

  declare estadoAccesionId: ForeignKey<EstadoAccesion["estadoAccesionId"]>;
  declare nombreLocalId: ForeignKey<NombreLocal["nombreLocalId"]>;
  declare usuarioId: ForeignKey<Usuario["usuarioId"]>;
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
    tableName: "Accesion",
    freezeTableName: true,
    paranoid: true,
    sequelize,
  }
);


EstadoAccesion.hasMany(Accesion, {
  foreignKey: "estadoAccesionId",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
Accesion.belongsTo(EstadoAccesion, {
  foreignKey: "estadoAccesionId",
});


NombreLocal.hasMany(Accesion, {
  foreignKey: "nombreLocalId",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
Accesion.belongsTo(NombreLocal, {
  foreignKey: "nombreLocalId",
});


Usuario.hasMany(Accesion, {
  foreignKey: "usuarioId",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
Accesion.belongsTo(Usuario, {
  foreignKey: "usuarioId",
});

Accesion.sync({ alter: true })
  .catch((e) => {
    console.log(e.message);
  })
  .then(() => {
    console.log("Tabla EstadoAccesion actualizada");
  });
