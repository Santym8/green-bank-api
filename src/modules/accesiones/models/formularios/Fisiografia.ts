import { sequelize } from "../../../../config/DataBase";
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from "sequelize";

export class Fisiografia extends Model<
  InferAttributes<Fisiografia>,
  InferCreationAttributes<Fisiografia>
> {
  declare fisiografiaId: CreationOptional<number>;
  declare fisiografiaNombre: string;
}

Fisiografia.init(
  {
    fisiografiaId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fisiografiaNombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: (data, options) => {
        data.fisiografiaNombre = data.fisiografiaNombre.toUpperCase();
      },
      beforeUpdate: (data, options) => {
        data.fisiografiaNombre = data.fisiografiaNombre.toUpperCase();
      },
    },
    tableName: "Fisiografia",
    freezeTableName: true,
    paranoid: true,
    sequelize,
  }
);

Fisiografia.sync({ alter: true })
  .catch((e) => {
    console.log(e.message);
  })
  .then(() => {
    console.log("Tabla Fisiografia actualizada");
  });
