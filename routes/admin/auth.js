import express from "express";
const router = express.Router();

import { login, signup } from "../../controllers/admin/auth.js";

router.post('/admin/register', signup);
router.post('/admin/login', login);

export default router;