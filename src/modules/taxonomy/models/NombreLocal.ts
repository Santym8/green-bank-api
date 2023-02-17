import { sequelize } from "../../../config/DataBase";
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  ForeignKey,
} from "sequelize";

import { Subespecie } from "./Subespecie";

export class NombreLocal extends Model<
  InferAttributes<NombreLocal>,
  InferCreationAttributes<NombreLocal>
> {
  declare nombreLocalId: CreationOptional<number>;
  declare nombreLocalNombre: string;
  declare subespecieId: ForeignKey<Subespecie["subespecieId"]>;
}

NombreLocal.init(
  {
    nombreLocalId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombreLocalNombre: {
      type: new DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: (data, options) => {
        data.nombreLocalNombre = data.nombreLocalNombre.toUpperCase();
      },
      beforeUpdate: (data, options) => {
        data.nombreLocalNombre = data.nombreLocalNombre.toUpperCase();
      },
    },
    tableName: "NombresLocales",
    freezeTableName: true,
    paranoid: true,
    sequelize,
  }
);

Subespecie.hasMany(NombreLocal, {
  foreignKey: "subespecieId",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
NombreLocal.belongsTo(Subespecie, {
  foreignKey: "subespecieId",
});

NombreLocal.sync({ alter: true })
  .catch((e) => {
    console.log(e.message);
  })
  .then(() => {
    console.log("Tabla NombreLocal actualizada");
  });
