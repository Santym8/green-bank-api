import { sequelize } from "../../../../config/DataBase";
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from "sequelize";

export class UsoMaterial extends Model<
  InferAttributes<UsoMaterial>,
  InferCreationAttributes<UsoMaterial>
> {
  declare usoMaterialId: CreationOptional<number>;
  declare usoMaterialNombre: string;
}

UsoMaterial.init(
  {
    usoMaterialId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    usoMaterialNombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: (data, options) => {
        data.usoMaterialNombre = data.usoMaterialNombre.toUpperCase();
      },
      beforeUpdate: (data, options) => {
        data.usoMaterialNombre = data.usoMaterialNombre.toUpperCase();
      },
    },
    tableName: "UsoMaterial",
    freezeTableName: true,
    paranoid: true,
    sequelize,
  }
);

UsoMaterial.sync({ alter: true })
  .catch((e) => {
    console.log(e.message);
  })
  .then(() => {
    console.log("Tabla UsoMaterial actualizada");
  });
