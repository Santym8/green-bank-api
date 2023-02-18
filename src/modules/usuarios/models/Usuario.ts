import { sequelize } from "../../../config/DataBase";
import bcrypt from "bcryptjs";
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  ForeignKey,
} from "sequelize";
import { Rol } from "./Rol";

export class Usuario extends Model<
  InferAttributes<Usuario>,
  InferCreationAttributes<Usuario>
> {
  declare usuarioId: CreationOptional<number>;
  declare usuarioNombres: string;
  declare usuarioApellidos: string;
  declare usuarioEmail: string;
  declare usuarioTelefono: string;
  declare usuarioContrasenia: string;
  declare rolId: ForeignKey<Rol["rolId"]>;
  declare createdAt: CreationOptional<Date>;
}

Usuario.init(
  {
    usuarioId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    usuarioNombres: {
      type: new DataTypes.STRING(50),
      allowNull: false,
    },
    usuarioApellidos: {
      type: new DataTypes.STRING(50),
      allowNull: false,
    },
    usuarioEmail: {
      type: new DataTypes.STRING(50),
      allowNull: false,
    },
    usuarioTelefono: {
      type: new DataTypes.STRING(50),
      allowNull: false,
    },
    usuarioContrasenia: {
      type: new DataTypes.TEXT(),
      allowNull: false,
    },
    createdAt: DataTypes.DATEONLY,
  },
  {
    hooks: {
      beforeCreate: (data, options) => {
        data.usuarioNombres = data.usuarioNombres.toUpperCase();
        data.usuarioApellidos = data.usuarioApellidos.toUpperCase();
      },
      beforeUpdate: (data, options) => {
        data.usuarioNombres = data.usuarioNombres.toUpperCase();
        data.usuarioApellidos = data.usuarioApellidos.toUpperCase();
      },
    },
    tableName: "Usuarios",
    freezeTableName: true,
    paranoid: true,
    sequelize,
  }
);

Rol.hasMany(Usuario, {
  foreignKey: "rolId",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
Usuario.belongsTo(Rol, {
  foreignKey: "rolId",
});

Usuario.sync({ alter: true })
  .catch((e) => {
    console.log(e.message);
  })
  .then(() => {
    console.log("Tabla Usuario actualizada");
  });
