import express from "express";
import postCtrl from "../controllers/postCtrl.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.get("/posts", auth, postCtrl.getPosts);
router.post("/posts", auth, postCtrl.createPost);
router.get("/userPosts", auth, postCtrl.getUserPosts);

export default router;
