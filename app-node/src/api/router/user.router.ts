import type { Router } from "express";

export const setUserRoutes = (router: Router) => {
  router.get("/users", async (req, res) => {
    const apiRes = await fetch("http:app-python:8000/users");
    const apiData = await apiRes.json();
    return res.json({
      res: apiData,
    })
  });
  

router.post("/users", async (req, res) => {
  // const apiRes = await fetch("http:app-python:8000/users");
  // const apiData = await apiRes.json();
  // console.log("/users endpoint")
  console.log("users body: ", req.body)
  return res.json({
    res: req.body,
  })
});
}