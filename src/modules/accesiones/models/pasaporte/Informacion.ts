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
import { EstadoGermoplasma } from "../formularios/EstadoGermoplasma";
import { FuenteColeccion } from "../formularios/FuenteColeccion";
import { TipoMuestraColectada } from "../formularios/TipoMuestraColectada";
import { PartePlantaUtilizada } from "../formularios/PartePlantaUtilizada";
import { MetodoMuestreo } from "../formularios/MetodoMuestreo";
import { PracticaCultural } from "../formularios/PracticaCultural";
import { FrecuenciaMuestra } from "../formularios/FrecuenciaMuestra";
import { EstadoFenologicoPoblacion } from "../formularios/EstadoFenologicoPoblacion";
import { UsoMaterial } from "../formularios/UsoMaterial";

export class Informacion extends Model<
  InferAttributes<Informacion>,
  InferCreationAttributes<Informacion>
> {
  declare informacionId: CreationOptional<number>;
  declare informacionDetallesEstado: string;
  declare informacionDetallesFuenteColeccion: string;
  declare informacionDetallesTipoMuestraColectada: string;
  declare informacionPoblacionAislada: boolean;
  declare informacionCultivosCerca: boolean;
  declare informacionPlantasMuestradas: number;
  declare informacionAreaMuestrada: number;
  declare informacionUsoMaterial: string;
  declare informacionDetallePartePlantaUtilizada: string;
  declare informacionEjemplarHerbario: boolean;
  declare informacionDetallePracticaCultural: string;
  declare informacionAsociasionEspeciesSilvestres: string;
  declare informacionPlagasEnfermedades: string;

  declare estadoGermoplasmaId: ForeignKey<
    EstadoGermoplasma["estadoGermoplasmaId"]
  >;
  declare fuenteColeccionId: ForeignKey<FuenteColeccion["fuenteColeccionId"]>;
  declare tipoMuestraColectadaId: ForeignKey<
    TipoMuestraColectada["tipoMuestraColectadaId"]
  >;
  declare partePlantaUtilizadaId: ForeignKey<
    PartePlantaUtilizada["partePlantaUtilizadaId"]
  >;
  declare metodoMuestreoId: ForeignKey<MetodoMuestreo["metodoMuestreoId"]>;
  declare practicaCulturalId: ForeignKey<
    PracticaCultural["practicaCulturalId"]
  >;
  declare frecuenciaMuestraId: ForeignKey<
    FrecuenciaMuestra["frecuenciaMuestraId"]
  >;
  declare estadoFenologicoPoblacionId: ForeignKey<
    EstadoFenologicoPoblacion["estadoFenologicoPoblacionId"]
  >;
  declare usoMaterialId: ForeignKey<UsoMaterial["usoMaterialId"]>;
}

Informacion.init(
  {
    informacionId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    informacionDetallesEstado: {
      type: DataTypes.STRING(50),
    },
    informacionDetallesFuenteColeccion: {
      type: DataTypes.STRING(50),
    },
    informacionDetallesTipoMuestraColectada: {
      type: DataTypes.STRING(50),
    },
    informacionPoblacionAislada: {
      type: DataTypes.BOOLEAN,
    },
    informacionCultivosCerca: {
      type: DataTypes.BOOLEAN,
    },
    informacionPlantasMuestradas: {
      type: DataTypes.INTEGER,
    },
    informacionAreaMuestrada: {
      type: DataTypes.FLOAT,
    },
    informacionUsoMaterial: {
      type: DataTypes.STRING(50),
    },
    informacionDetallePartePlantaUtilizada: {
      type: DataTypes.STRING(50),
    },
    informacionEjemplarHerbario: {
      type: DataTypes.BOOLEAN,
    },
    informacionDetallePracticaCultural: {
      type: DataTypes.STRING(50),
    },
    informacionAsociasionEspeciesSilvestres: {
      type: DataTypes.STRING(50),
    },
    informacionPlagasEnfermedades: {
      type: DataTypes.STRING(50),
    },
  },
  {
    tableName: "Informacion",
    freezeTableName: true,
    paranoid: true,
    sequelize,
  }
);

Accesion.hasOne(Informacion, {
  foreignKey: "accesionId",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
Informacion.belongsTo(Accesion, {
  foreignKey: "accesionId",
});

EstadoGermoplasma.hasMany(Informacion, {
  foreignKey: "estadoGermoplasmaId",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
Informacion.belongsTo(EstadoGermoplasma, {
  foreignKey: "estadoGermoplasmaId",
});

FuenteColeccion.hasMany(Informacion, {
  foreignKey: "fuenteColeccionId",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
Informacion.belongsTo(FuenteColeccion, {
  foreignKey: "fuenteColeccionId",
});

TipoMuestraColectada.hasMany(Informacion, {
  foreignKey: "tipoMuestraColectadaId",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
Informacion.belongsTo(TipoMuestraColectada, {
  foreignKey: "tipoMuestraColectadaId",
});

PartePlantaUtilizada.hasMany(Informacion, {
  foreignKey: "partePlantaUtilizadaId",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
Informacion.belongsTo(PartePlantaUtilizada, {
  foreignKey: "partePlantaUtilizadaId",
});

MetodoMuestreo.hasMany(Informacion, {
  foreignKey: "metodoMuestreoId",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
Informacion.belongsTo(MetodoMuestreo, {
  foreignKey: "metodoMuestreoId",
});

PracticaCultural.hasMany(Informacion, {
  foreignKey: "practicaCulturalId",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
Informacion.belongsTo(PracticaCultural, {
  foreignKey: "practicaCulturalId",
});

FrecuenciaMuestra.hasMany(Informacion, {
  foreignKey: "frecuenciaMuestraId",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
Informacion.belongsTo(FrecuenciaMuestra, {
  foreignKey: "frecuenciaMuestraId",
});

EstadoFenologicoPoblacion.hasMany(Informacion, {
  foreignKey: "estadoFenologicoPoblacionId",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
Informacion.belongsTo(EstadoFenologicoPoblacion, {
  foreignKey: "estadoFenologicoPoblacionId",
});

UsoMaterial.hasMany(Informacion, {
  foreignKey: "usoMaterialId",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
Informacion.belongsTo(UsoMaterial, {
  foreignKey: "usoMaterialId",
});

Informacion.sync({ alter: true })
  .catch((e) => {
    console.log(e.message);
  })
  .then(() => {
    console.log("Tabla Luz actualizada");
  });
