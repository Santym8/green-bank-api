import { sequelize } from "../../../../config/DataBase";
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from "sequelize";

export class FuenteColeccion extends Model<
  InferAttributes<FuenteColeccion>,
  InferCreationAttributes<FuenteColeccion>
> {
  declare fuenteColeccionId: CreationOptional<number>;
  declare fuenteColeccionNombre: string;
}

FuenteColeccion.init(
  {
    fuenteColeccionId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fuenteColeccionNombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: (data, options) => {
        data.fuenteColeccionNombre = data.fuenteColeccionNombre.toUpperCase();
      },
      beforeUpdate: (data, options) => {
        data.fuenteColeccionNombre = data.fuenteColeccionNombre.toUpperCase();
      },
    },
    tableName: "FuenteColeccion",
    freezeTableName: true,
    paranoid: true,
    sequelize,
  }
);

FuenteColeccion.sync({ alter: true })
  .catch((e) => {
    console.log(e.message);
  })
  .then(() => {
    console.log("Tabla FuenteColeccion actualizada");
  });
