import { sequelize } from "../../../../config/DataBase";
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from "sequelize";

export class Luz extends Model<
  InferAttributes<Luz>,
  InferCreationAttributes<Luz>
> {
  declare luzId: CreationOptional<number>;
  declare luzNombre: string;
}

Luz.init(
  {
    luzId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    luzNombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: (data, options) => {
        data.luzNombre = data.luzNombre.toUpperCase();
      },
      beforeUpdate: (data, options) => {
        data.luzNombre = data.luzNombre.toUpperCase();
      },
    },
    tableName: "Luz",
    freezeTableName: true,
    paranoid: true,
    sequelize,
  }
);

Luz.sync({ alter: true })
  .catch((e) => {
    console.log(e.message);
  })
  .then(() => {
    console.log("Tabla Luz actualizada");
  });
