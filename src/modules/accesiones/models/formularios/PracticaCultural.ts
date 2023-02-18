import { sequelize } from "../../../../config/DataBase";
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from "sequelize";

export class PracticaCultural extends Model<
  InferAttributes<PracticaCultural>,
  InferCreationAttributes<PracticaCultural>
> {
  declare practicaCulturalId: CreationOptional<number>;
  declare practicaCulturalNombre: string;
}

PracticaCultural.init(
  {
    practicaCulturalId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    practicaCulturalNombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: (data, options) => {
        data.practicaCulturalNombre = data.practicaCulturalNombre.toUpperCase();
      },
      beforeUpdate: (data, options) => {
        data.practicaCulturalNombre = data.practicaCulturalNombre.toUpperCase();
      },
    },
    tableName: "PracticaCultural",
    freezeTableName: true,
    paranoid: true,
    sequelize,
  }
);

PracticaCultural.sync({ alter: true })
  .catch((e) => {
    console.log(e.message);
  })
  .then(() => {
    console.log("Tabla PracticaCultural actualizada");
  });
