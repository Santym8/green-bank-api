import { sequelize } from "../../../../config/DataBase";
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from "sequelize";

export class DrenajeSuelo extends Model<
  InferAttributes<DrenajeSuelo>,
  InferCreationAttributes<DrenajeSuelo>
> {
  declare drenajeSueloId: CreationOptional<number>;
  declare drenajeSueloNombre: string;
}

DrenajeSuelo.init(
  {
    drenajeSueloId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    drenajeSueloNombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: (data, options) => {
        data.drenajeSueloNombre = data.drenajeSueloNombre.toUpperCase();
      },
      beforeUpdate: (data, options) => {
        data.drenajeSueloNombre = data.drenajeSueloNombre.toUpperCase();
      },
    },
    tableName: "DrenajeSuelo",
    freezeTableName: true,
    paranoid: true,
    sequelize,
  }
);

DrenajeSuelo.sync({ alter: true })
  .catch((e) => {
    console.log(e.message);
  })
  .then(() => {
    console.log("Tabla DrenajeSuelo actualizada");
  });
