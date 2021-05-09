import express from "express";
const router = express.Router();

import { login, signup } from "../controllers/auth.js";

router.post('/user/register', signup);
router.post('/user/login', login);

export default router;