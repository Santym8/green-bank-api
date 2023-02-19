import { sequelize } from "../../../../config/DataBase";
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  ForeignKey,
} from "sequelize";

import { Accesion } from "../Accesion";

export class Fechas extends Model<
  InferAttributes<Fechas>,
  InferCreationAttributes<Fechas>
> {
  declare fechasId: CreationOptional<number>;
  declare fechaSiembra: Date;
  declare fechaFloracion: Date;
  declare fechaFructificacion: Date;
  declare fechaCosechas: Date;

  declare accesionId: ForeignKey<Accesion["accesionId"]>;
}

Fechas.init(
  {
    fechasId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fechaSiembra: {
      type: DataTypes.DATEONLY,
    },
    fechaFloracion: {
      type: DataTypes.DATEONLY,
    },
    fechaFructificacion: {
      type: DataTypes.DATEONLY,
    },
    fechaCosechas: {
      type: DataTypes.DATEONLY,
    },
  },
  {
    tableName: "Fechas",
    freezeTableName: true,
    paranoid: true,
    sequelize,
  }
);

Accesion.hasOne(Fechas, {
  foreignKey: "accesionId",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
Fechas.belongsTo(Accesion, {
  foreignKey: "accesionId",
});

Fechas.sync({ alter: true })
  .catch((e) => {
    console.log(e.message);
  })
  .then(() => {
    console.log("Tabla Fechas actualizada");
  });
