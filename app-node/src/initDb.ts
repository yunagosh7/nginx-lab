import bcrypt from "bcryptjs";
import { sequelize } from "./db.js";
import "./models/index.js";
import { User } from "./models/index.js";

export const initDb = async () => {
  await sequelize.authenticate();
  await sequelize.sync({ alter: true });
  console.log("Database initialized");

  const count = await User.count();
  if (count === 0) {
    const hashed = await bcrypt.hash("password123", 10);
    await User.bulkCreate([
      {
        id: "11111111-1111-1111-1111-111111111111",
        email: "juan@example.com",
        password: hashed,
        name: "Juan",
        tier: "premium",
      },
      {
        id: "22222222-2222-2222-2222-222222222222",
        email: "ana@example.com",
        password: hashed,
        name: "Ana",
        tier: "free",
      },
    ]);
  }
};
