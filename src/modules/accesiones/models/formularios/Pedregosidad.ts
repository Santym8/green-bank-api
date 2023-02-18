import { sequelize } from "../../../../config/DataBase";
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from "sequelize";

export class Pedregosidad extends Model<
  InferAttributes<Pedregosidad>,
  InferCreationAttributes<Pedregosidad>
> {
  declare pedregosidadId: CreationOptional<number>;
  declare pedregosidadNombre: string;
}

Pedregosidad.init(
  {
    pedregosidadId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    pedregosidadNombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: (data, options) => {
        data.pedregosidadNombre = data.pedregosidadNombre.toUpperCase();
      },
      beforeUpdate: (data, options) => {
        data.pedregosidadNombre = data.pedregosidadNombre.toUpperCase();
      },
    },
    tableName: "Pedregosidad",
    freezeTableName: true,
    paranoid: true,
    sequelize,
  }
);

Pedregosidad.sync({ alter: true })
  .catch((e) => {
    console.log(e.message);
  })
  .then(() => {
    console.log("Tabla Pedregosidad actualizada");
  });
