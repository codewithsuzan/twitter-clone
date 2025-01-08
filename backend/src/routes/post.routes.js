import express from "express";
import { protectRoute } from "../middlewares/protectRoute.js";
import {
    createPost
} from "../controllers/post.controller.js"

const router = express.Router();

router.post("/create",protectRoute,createPost)
// router.delete("/delete",protectRoute,deletePost)
// router.post("/like/:id",protectRoute,likeUnlikePost)
// router.post("/comment/:id",protectRoute,commentPost)


export default router