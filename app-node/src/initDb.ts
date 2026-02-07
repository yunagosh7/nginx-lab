import { sequelize } from "./db.js";
import "./models/index.js";
import { Order } from "./models/index.js";

export const initDb = async () => {
  await sequelize.authenticate();
  await sequelize.sync({ alter: true });
  console.log("Database initialized");
  const count = await Order.count();
  if (count === 0) {
    await Order.bulkCreate([
      {
        userId: "11111111-1111-1111-1111-111111111111",
        totalAmount: 49.99,
        currency: "USD",
        id: "11111111-1111-1111-1111-111111111111",
        status: 'paid'
      },
      {
        userId: "22222222-2222-2222-2222-222222222222",
        status: "pending",
        totalAmount: 129.5,
        currency: "USD",
        id: "22222222-2222-2222-2222-222222222222",
      },
    ]);
  }
};
