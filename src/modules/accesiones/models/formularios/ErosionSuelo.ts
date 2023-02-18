import { sequelize } from "../../../../config/DataBase";
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from "sequelize";

export class ErosionSuelo extends Model<
  InferAttributes<ErosionSuelo>,
  InferCreationAttributes<ErosionSuelo>
> {
  declare erosionSueloId: CreationOptional<number>;
  declare erosionSueloNombre: string;
}

ErosionSuelo.init(
  {
    erosionSueloId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    erosionSueloNombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: (data, options) => {
        data.erosionSueloNombre = data.erosionSueloNombre.toUpperCase();
      },
      beforeUpdate: (data, options) => {
        data.erosionSueloNombre = data.erosionSueloNombre.toUpperCase();
      },
    },
    tableName: "ErosionSuelo",
    freezeTableName: true,
    paranoid: true,
    sequelize,
  }
);

ErosionSuelo.sync({ alter: true })
  .catch((e) => {
    console.log(e.message);
  })
  .then(() => {
    console.log("Tabla ErosionSuelo actualizada");
  });
