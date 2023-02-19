import { sequelize } from "../../../../config/DataBase";
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from "sequelize";
import { Accesion } from "../Accesion";

export class Observacion extends Model<
  InferAttributes<Observacion>,
  InferCreationAttributes<Observacion>
> {
  declare observacionId: CreationOptional<number>;
  declare observacionContenido: string;
}

Observacion.init(
  {
    observacionId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    observacionContenido: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: "Observacion",
    freezeTableName: true,
    paranoid: true,
    sequelize,
  }
);

Accesion.hasOne(Observacion, {
  foreignKey: "accesionId",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
Observacion.belongsTo(Accesion, {
  foreignKey: "accesionId",
});

Observacion.sync({ alter: true })
  .catch((e) => {
    console.log(e.message);
  })
  .then(() => {
    console.log("Tabla Observacion actualizada");
  });
