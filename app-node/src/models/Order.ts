import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db.js";
import type { IOrder } from "../interfaces/IOrder.js";

export const Order = sequelize.define<Model<IOrder>>(
  "Order",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      comment: "User ID from Python service",
    },

    status: {
      type: DataTypes.ENUM(
        "pending",
        "paid",
        "cancelled",
        "shipped"
      ),
      allowNull: false,
      defaultValue: "pending",
    },

    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    currency: {
      type: DataTypes.STRING(3),
      allowNull: false,
      defaultValue: "USD",
    },
  },
  {
    tableName: "orders",
    timestamps: true,
  }
);