import { sequelize } from "../../../../config/DataBase";
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from "sequelize";

export class TexturaSuelo extends Model<
  InferAttributes<TexturaSuelo>,
  InferCreationAttributes<TexturaSuelo>
> {
  declare texturaSueloId: CreationOptional<number>;
  declare texturaSueloNombre: string;
}

TexturaSuelo.init(
  {
    texturaSueloId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    texturaSueloNombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: (data, options) => {
        data.texturaSueloNombre = data.texturaSueloNombre.toUpperCase();
      },
      beforeUpdate: (data, options) => {
        data.texturaSueloNombre = data.texturaSueloNombre.toUpperCase();
      },
    },
    tableName: "TexturaSuelo",
    freezeTableName: true,
    paranoid: true,
    sequelize,
  }
);

TexturaSuelo.sync({ alter: true })
  .catch((e) => {
    console.log(e.message);
  })
  .then(() => {
    console.log("Tabla TexturaSuelo actualizada");
  });
