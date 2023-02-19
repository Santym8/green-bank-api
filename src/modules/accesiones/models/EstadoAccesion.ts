import { sequelize } from "../../../config/DataBase";
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from "sequelize";

export class EstadoAccesion extends Model<
  InferAttributes<EstadoAccesion>,
  InferCreationAttributes<EstadoAccesion>
> {
  declare estadoAccesionId: CreationOptional<number>;
  declare estadoAccesionNombre: string;
}

EstadoAccesion.init(
  {
    estadoAccesionId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    estadoAccesionNombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: (data, options) => {
        data.estadoAccesionNombre = data.estadoAccesionNombre.toUpperCase();
      },
      beforeUpdate: (data, options) => {
        data.estadoAccesionNombre = data.estadoAccesionNombre.toUpperCase();
      },
    },
    tableName: "EstadoAccesion",
    freezeTableName: true,
    paranoid: true,
    sequelize,
  }
);

EstadoAccesion.sync({ alter: true })
  .catch((e) => {
    console.log(e.message);
  })
  .then(() => {
    console.log("Tabla EstadoAccesion actualizada");
  });
