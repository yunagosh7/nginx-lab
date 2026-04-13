import type { Router } from "express";
import bcrypt from "bcryptjs";
import { User } from "../../models/index.js";

export const setUserRoutes = (router: Router) => {
  // GET /users
  router.get("/users", async (_req, res) => {
    const users = await User.findAll({ attributes: { exclude: ["password"] } });
    return res.json(users);
  });

  // POST /users — register
  router.post("/users", async (req, res) => {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({ error: "email, password and name are required" });
    }
    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(409).json({ error: "email already in use" });
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashed, name });
    return res.status(201).json({ id: user.id, email: user.email, name: user.name, tier: user.tier });
  });

  // POST /users/login
  router.post("/users/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "email and password are required" });
    }
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ error: "invalid credentials" });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: "invalid credentials" });
    return res.json({ id: user.id, email: user.email, name: user.name, tier: user.tier });
  });

  // GET /users/:id
  router.get("/users/:id", async (req, res) => {
    const user = await User.findByPk(req.params.id, { attributes: { exclude: ["password"] } });
    if (!user) return res.status(404).json({ error: "user not found" });
    return res.json(user);
  });

  // PUT /users/:id
  router.put("/users/:id", async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: "user not found" });
    const { name, email } = req.body;
    await user.update({ name, email });
    return res.json({ id: user.id, email: user.email, name: user.name, tier: user.tier });
  });

  // PATCH /users/:id/tier — internal, called by the payment service
  router.patch("/users/:id/tier", async (req, res) => {
    const { tier } = req.body;
    if (!["free", "premium"].includes(tier)) {
      return res.status(400).json({ error: "tier must be 'free' or 'premium'" });
    }
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: "user not found" });
    await user.update({ tier });
    return res.json({ id: user.id, email: user.email, name: user.name, tier: user.tier });
  });
};
