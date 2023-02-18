import { sequelize } from "../../../../config/DataBase";
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from "sequelize";

export class VegetacionAlrededor extends Model<
  InferAttributes<VegetacionAlrededor>,
  InferCreationAttributes<VegetacionAlrededor>
> {
  declare vegetacionAlrededorId: CreationOptional<number>;
  declare vegetacionAlrededorNombre: string;
}

VegetacionAlrededor.init(
  {
    vegetacionAlrededorId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    vegetacionAlrededorNombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: (data, options) => {
        data.vegetacionAlrededorNombre =
          data.vegetacionAlrededorNombre.toUpperCase();
      },
      beforeUpdate: (data, options) => {
        data.vegetacionAlrededorNombre =
          data.vegetacionAlrededorNombre.toUpperCase();
      },
    },
    tableName: "VegetacionAlrededor",
    freezeTableName: true,
    paranoid: true,
    sequelize,
  }
);

VegetacionAlrededor.sync({ alter: true })
  .catch((e) => {
    console.log(e.message);
  })
  .then(() => {
    console.log("Tabla VegetacionAlrededor actualizada");
  });
