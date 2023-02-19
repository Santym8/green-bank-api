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
import { Topografia } from "../formularios/Topografia";
import { Fisiografia } from "../formularios/Fisiografia";
import { VegetacionAlrededor } from "../formularios/VegetacionAlrededor";
import { FormaGeografica } from "../formularios/FormaGeografica";
import { FormaPendiente } from "../formularios/FormaPendiente";

export class Terreno extends Model<
  InferAttributes<Terreno>,
  InferCreationAttributes<Terreno>
> {
  declare terrenoId: CreationOptional<number>;
  declare terrenoDetallesTopografia: CreationOptional<string>;
  declare terrenoDetallesFisiografia: CreationOptional<string>;
  declare terrenoDetallesVegetacion: CreationOptional<string>;
  declare terrenoDetallesFormaGeografica: CreationOptional<string>;
  declare terrenoAspectoPendienteNorte: CreationOptional<number>;
  declare terrenoAspectoPendienteSur: CreationOptional<number>;
  declare terrenoAspectoPendienteEste: CreationOptional<number>;
  declare terrenoAspectoPendienteOeste: CreationOptional<number>;

  declare topografiaId: ForeignKey<Topografia["topografiaId"]>;
  declare fisiografiaId: ForeignKey<Fisiografia["fisiografiaId"]>;
  declare vegetacionAlrededorId: ForeignKey<
    VegetacionAlrededor["vegetacionAlrededorId"]
  >;
  declare formaGeograficaId: ForeignKey<FormaGeografica["formaGeograficaId"]>;
  declare formaPendienteId: ForeignKey<FormaPendiente["formaPendienteId"]>;
  declare accesionId: ForeignKey<Accesion["accesionId"]>;
}

Terreno.init(
  {
    terrenoId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    terrenoDetallesTopografia: {
      type: DataTypes.STRING(50),
    },
    terrenoDetallesFisiografia: {
      type: DataTypes.STRING(50),
    },
    terrenoDetallesVegetacion: {
      type: DataTypes.STRING(50),
    },
    terrenoDetallesFormaGeografica: {
      type: DataTypes.STRING(50),
    },
    terrenoAspectoPendienteNorte: {
      type: DataTypes.FLOAT,
    },
    terrenoAspectoPendienteSur: {
      type: DataTypes.FLOAT,
    },
    terrenoAspectoPendienteEste: {
      type: DataTypes.FLOAT,
    },
    terrenoAspectoPendienteOeste: {
      type: DataTypes.FLOAT,
    },
  },
  {
    tableName: "Terreno",
    freezeTableName: true,
    paranoid: true,
    sequelize,
  }
);

Accesion.hasOne(Terreno, {
  foreignKey: "accesionId",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
Terreno.belongsTo(Accesion, {
  foreignKey: "accesionId",
});

Topografia.hasMany(Terreno, {
  foreignKey: "topografiaId",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
Terreno.belongsTo(Topografia, {
  foreignKey: "topografiaId",
});

Fisiografia.hasMany(Terreno, {
  foreignKey: "fisiografiaId",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
Terreno.belongsTo(Fisiografia, {
  foreignKey: "fisiografiaId",
});


VegetacionAlrededor.hasMany(Terreno, {
  foreignKey: "vegetacionAlrededorId",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
Terreno.belongsTo(VegetacionAlrededor, {
  foreignKey: "vegetacionAlrededorId",
});

FormaGeografica.hasMany(Terreno, {
  foreignKey: "formaGeograficaId",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
Terreno.belongsTo(FormaGeografica, {
  foreignKey: "formaGeograficaId",
});

FormaPendiente.hasMany(Terreno, {
  foreignKey: "formaPendienteId",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
Terreno.belongsTo(FormaPendiente, {
  foreignKey: "formaPendienteId",
});

Terreno.sync({ alter: true })
  .catch((e) => {
    console.log(e.message);
  })
  .then(() => {
    console.log("Tabla Luz actualizada");
  });
