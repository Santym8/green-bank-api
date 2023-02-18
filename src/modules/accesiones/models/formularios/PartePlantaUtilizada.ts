import { sequelize } from "../../../../config/DataBase";
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from "sequelize";

export class PartePlantaUtilizada extends Model<
  InferAttributes<PartePlantaUtilizada>,
  InferCreationAttributes<PartePlantaUtilizada>
> {
  declare partePlantaUtilizadaId: CreationOptional<number>;
  declare partePlantaUtilizadaNombre: string;
}

PartePlantaUtilizada.init(
  {
    partePlantaUtilizadaId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    partePlantaUtilizadaNombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: (data, options) => {
        data.partePlantaUtilizadaNombre =
          data.partePlantaUtilizadaNombre.toUpperCase();
      },
      beforeUpdate: (data, options) => {
        data.partePlantaUtilizadaNombre =
          data.partePlantaUtilizadaNombre.toUpperCase();
      },
    },
    tableName: "PartePlantaUtilizada",
    freezeTableName: true,
    paranoid: true,
    sequelize,
  }
);

PartePlantaUtilizada.sync({ alter: true })
  .catch((e) => {
    console.log(e.message);
  })
  .then(() => {
    console.log("Tabla PartePlantaUtilizada actualizada");
  });
