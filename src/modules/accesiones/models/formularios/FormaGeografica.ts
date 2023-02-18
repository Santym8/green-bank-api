import { sequelize } from "../../../../config/DataBase";
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from "sequelize";

export class FormaGeografica extends Model<
  InferAttributes<FormaGeografica>,
  InferCreationAttributes<FormaGeografica>
> {
  declare formaGeograficaId: CreationOptional<number>;
  declare formaGeograficaNombre: string;
}

FormaGeografica.init(
  {
    formaGeograficaId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    formaGeograficaNombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: (data, options) => {
        data.formaGeograficaNombre =
          data.formaGeograficaNombre.toUpperCase();
      },
      beforeUpdate: (data, options) => {
        data.formaGeograficaNombre =
          data.formaGeograficaNombre.toUpperCase();
      },
    },
    tableName: "FormaGeografica",
    freezeTableName: true,
    paranoid: true,
    sequelize,
  }
);

FormaGeografica.sync({ alter: true })
  .catch((e) => {
    console.log(e.message);
  })
  .then(() => {
    console.log("Tabla FormaGeografica actualizada");
  });
