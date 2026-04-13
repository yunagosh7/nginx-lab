import express from "express";
import { sequelize } from "./db.js";
import { setUserRoutes } from "./api/router/user.router.js";
import { initDb } from "./initDb.js";
import { startTierUpdateConsumer } from "./messaging/consumers/tierUpdate.consumer.js";

const app = express();
app.use(express.json());

const router = express.Router();

initDb();
startTierUpdateConsumer();
setUserRoutes(router);

app.get("/health/db", async (_req, res) => {
  const queryRes = await sequelize.query("SELECT 1 + 1 AS solution");
  return res.json({ res: queryRes });
});

app.use("/", router);

app.listen(3000, "0.0.0.0", () => {
  console.log("Server is running on port 3000");
});
