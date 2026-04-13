import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db.js";

export class User extends Model {
  declare id: string;
  declare email: string;
  declare password: string;
  declare name: string;
  declare tier: "free" | "premium";
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tier: {
      type: DataTypes.ENUM("free", "premium"),
      defaultValue: "free",
      allowNull: false,
    },
  },
  { sequelize, tableName: "users" }
);
