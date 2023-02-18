import { sequelize } from "../../../../config/DataBase";
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from "sequelize";

export class ColorSuelo extends Model<
  InferAttributes<ColorSuelo>,
  InferCreationAttributes<ColorSuelo>
> {
  declare colorSueloId: CreationOptional<number>;
  declare colorSueloNombre: string;
}

ColorSuelo.init(
  {
    colorSueloId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    colorSueloNombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: (data, options) => {
        data.colorSueloNombre = data.colorSueloNombre.toUpperCase();
      },
      beforeUpdate: (data, options) => {
        data.colorSueloNombre = data.colorSueloNombre.toUpperCase();
      },
    },
    tableName: "ColorSuelo",
    freezeTableName: true,
    paranoid: true,
    sequelize,
  }
);

ColorSuelo.sync({ alter: true })
  .catch((e) => {
    console.log(e.message);
  })
  .then(() => {
    console.log("Tabla ColorSuelo actualizada");
  });
