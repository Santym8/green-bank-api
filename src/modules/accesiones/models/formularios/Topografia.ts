import { sequelize } from "../../../../config/DataBase";
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from "sequelize";

export class Topografia extends Model<
  InferAttributes<Topografia>,
  InferCreationAttributes<Topografia>
> {
  declare topografiaId: CreationOptional<number>;
  declare topografiaNombre: string;
}

Topografia.init(
  {
    topografiaId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    topografiaNombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: (data, options) => {
        data.topografiaNombre = data.topografiaNombre.toUpperCase();
      },
      beforeUpdate: (data, options) => {
        data.topografiaNombre = data.topografiaNombre.toUpperCase();
      },
    },
    tableName: "Topografia",
    freezeTableName: true,
    paranoid: true,
    sequelize,
  }
);

Topografia.sync({ alter: true })
  .catch((e) => {
    console.log(e.message);
  })
  .then(() => {
    console.log("Tabla Topografia actualizada");
  });
