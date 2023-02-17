import { sequelize } from "../../../config/DataBase";
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  ForeignKey,
} from "sequelize";
import { Especie } from "./Especie";

export class Subespecie extends Model<
  InferAttributes<Subespecie>,
  InferCreationAttributes<Subespecie>
> {
  declare subespecieId: CreationOptional<number>;
  declare subespecieNombre: string;
  declare especieId: ForeignKey<Especie["especieId"]>;
}

Subespecie.init(
  {
    subespecieId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    subespecieNombre: {
      type: new DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: (data, options) => {
        data.subespecieNombre = data.subespecieNombre.toUpperCase();
      },
      beforeUpdate: (data, options) => {
        data.subespecieNombre = data.subespecieNombre.toUpperCase();
      },
    },
    tableName: "Subespecies",
    paranoid: true,
    sequelize,
  }
);

Especie.hasMany(Subespecie);
Subespecie.belongsTo(Especie, { foreignKey: "especieId" });

Subespecie.sync({ alter: true })
  .catch((e) => {
    console.log(e.message);
  })
  .then(() => {
    console.log("Tabla Subespecies actualizada");
  });
