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
  declare fechaSiembra: CreationOptional<Date>;
  declare fechaFloracion: CreationOptional<Date>;
  declare fechaFructificacion: CreationOptional<Date>;
  declare fechaCosechas: CreationOptional<Date>;

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
      type: DataTypes.DATE,
    },
    fechaFloracion: {
      type: DataTypes.DATE,
    },
    fechaFructificacion: {
      type: DataTypes.DATE,
    },
    fechaCosechas: {
      type: DataTypes.DATE,
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
