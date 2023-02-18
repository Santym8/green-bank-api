import { sequelize } from "../../../../config/DataBase";
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from "sequelize";

export class TipoMuestraColectada extends Model<
  InferAttributes<TipoMuestraColectada>,
  InferCreationAttributes<TipoMuestraColectada>
> {
  declare tipoMuestraColectadaId: CreationOptional<number>;
  declare tipoMuestraColectadaNombre: string;
}

TipoMuestraColectada.init(
  {
    tipoMuestraColectadaId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    tipoMuestraColectadaNombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: (data, options) => {
        data.tipoMuestraColectadaNombre = data.tipoMuestraColectadaNombre.toUpperCase();
      },
      beforeUpdate: (data, options) => {
        data.tipoMuestraColectadaNombre = data.tipoMuestraColectadaNombre.toUpperCase();
      },
    },
    tableName: "TipoMuestraColectada",
    freezeTableName: true,
    paranoid: true,
    sequelize,
  }
);

TipoMuestraColectada.sync({ alter: true })
  .catch((e) => {
    console.log(e.message);
  })
  .then(() => {
    console.log("Tabla TipoMuestraColectada actualizada");
  });
