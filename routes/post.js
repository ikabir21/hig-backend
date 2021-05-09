import express from "express";
import { createPost, getPost, getSortedPost, getRankedPost, getTopThree } from "../controllers/post.js";
const router = express.Router();
import { isLoggedIn, isAdmin } from "../middleware/verifyToken.js";

router.post("/posts/create/", createPost);
router.get("/posts/get", getPost);
router.get("/posts/sort", isLoggedIn, getSortedPost);
router.get("/posts/rank", isLoggedIn, getRankedPost);
router.get("/posts/top3", isLoggedIn, getTopThree);

export default router;