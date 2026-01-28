import express from "express";

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "Hello World",
  });
});

app.post("/orders", (req, res) => {
  const body = req.body;

  res.json({
    order: body,
    status: "success",
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
