import { sequelize } from "../../../config/DataBase";
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from "sequelize";

export class Rol extends Model<
  InferAttributes<Rol>,
  InferCreationAttributes<Rol>
> {
  declare rolId: CreationOptional<number>;
  declare rolNombre: string;
}

Rol.init(
  {
    rolId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    rolNombre: {
      type: new DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: (familia, options) => {
        familia.rolNombre = familia.rolNombre.toUpperCase();
      },
      beforeUpdate: (familia, options) => {
        familia.rolNombre = familia.rolNombre.toUpperCase();
      },
    },
    tableName: "Roles",
    freezeTableName: true,
    paranoid: true,
    sequelize,
  }
);

Rol.sync({ alter: true })
  .catch((e) => {
    console.log(e.message);
  })
  .then(() => {
    console.log("Tabla Roles actualizada");
  });
