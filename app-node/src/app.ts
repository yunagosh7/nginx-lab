import express from "express";
import { sequelize } from "./db.js";
import { setUserRoutes } from "./api/router/user.router.js";
import { setOrderRoutes } from "./api/router/order.router.js";
import { initDb } from "./initDb.js";

const app = express();

app.use(express.json());

const router = express.Router();

initDb();
setUserRoutes(router);
setOrderRoutes(router);


app.get("/health/db", async (_req, res) => {
  const queryRes = await sequelize.query("SELECT 1 + 1 AS solution");

  console.log("/health/db endpoint")
  return res.json({
    res: queryRes
  })
});

app.get("/", (_req, res) => {
  console.log("/ endpoint")
  return res.json({
    message: "Hello World",
  });
});

app.use("/api", router);

app.post("/orders", (req, res) => {
  const body = req.body;

  console.log("/orders endpoint")

  return res.json({
    order: body,
    status: "success",
  });
});

app.listen(3000, "0.0.0.0", () => {
  console.log("Server is running on port 3000");
});
