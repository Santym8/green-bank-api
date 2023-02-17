import { sequelize } from "../../../config/DataBase";
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  ForeignKey,
} from "sequelize";
import { Genero } from "./Genero";

export class Especie extends Model<
  InferAttributes<Especie>,
  InferCreationAttributes<Especie>
> {
  declare especieId: CreationOptional<number>;
  declare especieNombre: string;
  declare generoId: ForeignKey<Genero["generoId"]>;
}

Especie.init(
  {
    especieId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    especieNombre: {
      type: new DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: (familia, options) => {
        familia.especieNombre = familia.especieNombre.toUpperCase();
      },
      beforeUpdate: (familia, options) => {
        familia.especieNombre = familia.especieNombre.toUpperCase();
      },
    },
    tableName: "Especies",
    paranoid: true,
    sequelize,
  }
);

Genero.hasMany(Especie);
Especie.belongsTo(Genero, { foreignKey: "generoId" });

Especie.sync({ alter: true })
  .catch((e) => {
    console.log(e.message);
  })
  .then(() => {
    console.log("Tabla Especies actualizada");
  });
