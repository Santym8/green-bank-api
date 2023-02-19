import { sequelize } from "../../../../config/DataBase";
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  ForeignKey,
} from "sequelize";
import { Accesion } from "../Accesion";
import { DrenajeSuelo } from "../formularios/DrenajeSuelo";
import { ColorSuelo } from "../formularios/ColorSuelo";
import { Pedregosidad } from "../formularios/Pedregosidad";
import { TexturaSuelo } from "../formularios/TexturaSuelo";
import { ErosionSuelo } from "../formularios/ErosionSuelo";

export class Suelo extends Model<
  InferAttributes<Suelo>,
  InferCreationAttributes<Suelo>
> {
  declare sueloId: CreationOptional<number>;
  declare sueloDetalleTextura: string;
  declare sueloDetallePedregosidad: string;

  declare drenajeSueloId: ForeignKey<DrenajeSuelo["drenajeSueloId"]>;
  declare colorSueloId: ForeignKey<ColorSuelo["colorSueloId"]>;
  declare pedregosidadId: ForeignKey<Pedregosidad["pedregosidadId"]>;
  declare texturaSueloId: ForeignKey<TexturaSuelo["texturaSueloId"]>;
  declare erosionSueloId: ForeignKey<ErosionSuelo["erosionSueloId"]>;
}

Suelo.init(
  {
    sueloId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    sueloDetalleTextura: {
      type: DataTypes.STRING(50),
    },
    sueloDetallePedregosidad: {
      type: DataTypes.STRING(50),
    },
  },
  {
    hooks: {
      beforeCreate: (data, options) => {
        data.sueloDetalleTextura = data.sueloDetalleTextura.toUpperCase();
        data.sueloDetallePedregosidad =
          data.sueloDetallePedregosidad.toUpperCase();
      },
      beforeUpdate: (data, options) => {
        data.sueloDetalleTextura = data.sueloDetalleTextura.toUpperCase();
        data.sueloDetallePedregosidad =
          data.sueloDetallePedregosidad.toUpperCase();
      },
    },
    tableName: "Suelo",
    freezeTableName: true,
    paranoid: true,
    sequelize,
  }
);

Accesion.hasOne(Suelo, {
  foreignKey: "accesionId",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
Suelo.belongsTo(Accesion, {
  foreignKey: "accesionId",
});

DrenajeSuelo.hasMany(Suelo, {
  foreignKey: "drenajeId",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
Suelo.belongsTo(DrenajeSuelo, {
  foreignKey: "drenajeId",
});

ColorSuelo.hasMany(Suelo, {
  foreignKey: "colorSueloId",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
Suelo.belongsTo(ColorSuelo, {
  foreignKey: "colorSueloId",
});

Pedregosidad.hasMany(Suelo, {
  foreignKey: "pedregosidadId",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
Suelo.belongsTo(Pedregosidad, {
  foreignKey: "pedregosidadId",
});

TexturaSuelo.hasMany(Suelo, {
  foreignKey: "texturaSueloId",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
Suelo.belongsTo(TexturaSuelo, {
  foreignKey: "texturaSueloId",
});

ErosionSuelo.hasMany(Suelo, {
  foreignKey: "erosionSueloId",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
Suelo.belongsTo(ErosionSuelo, {
  foreignKey: "erosionSueloId",
});

Suelo.sync({ alter: true })
  .catch((e) => {
    console.log(e.message);
  })
  .then(() => {
    console.log("Tabla Suelo actualizada");
  });
