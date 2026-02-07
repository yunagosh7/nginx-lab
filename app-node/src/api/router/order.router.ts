import type { Router } from "express";
import { Order } from "../../models/Order.js";

export const setOrderRoutes = (router: Router) => {

  router.get("/orders", async (req, res) => {
    const dbRes = await Order.findAll();
    return res.json({
      res: dbRes,
    })
  })
  router.post("/orders", async (req, res) => {
    console.log("order body: ", req.body);

    const dbRes = await Order.create(req.body);

    return res.json({
      res: req.body,
      dbRes,
    })
  })
}