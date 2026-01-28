import express from "express";

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  console.log("/ endpoint")
  return res.json({
    message: "Hello World",
  });
});

app.get("/users", async (_req, res) => {
  const apiRes = await fetch("http:app-python:8000/users");
  const apiData = await apiRes.json();
  console.log("/users endpoint")
  return res.json({
    res: apiData,
  })
});

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
