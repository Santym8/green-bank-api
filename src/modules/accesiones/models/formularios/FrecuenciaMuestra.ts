import { sequelize } from "../../../../config/DataBase";
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from "sequelize";

export class FrecuenciaMuestra extends Model<
  InferAttributes<FrecuenciaMuestra>,
  InferCreationAttributes<FrecuenciaMuestra>
> {
  declare frecuenciaMuestraId: CreationOptional<number>;
  declare frecuenciaMuestraNombre: string;
}

FrecuenciaMuestra.init(
  {
    frecuenciaMuestraId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    frecuenciaMuestraNombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: (data, options) => {
        data.frecuenciaMuestraNombre =
          data.frecuenciaMuestraNombre.toUpperCase();
      },
      beforeUpdate: (data, options) => {
        data.frecuenciaMuestraNombre =
          data.frecuenciaMuestraNombre.toUpperCase();
      },
    },
    tableName: "FrecuenciaMuestra",
    freezeTableName: true,
    paranoid: true,
    sequelize,
  }
);

FrecuenciaMuestra.sync({ alter: true })
  .catch((e) => {
    console.log(e.message);
  })
  .then(() => {
    console.log("Tabla FrecuenciaMuestra actualizada");
  });
