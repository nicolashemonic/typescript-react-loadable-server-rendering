import express from "express";
import aboutController from "../controllers/about";

const router = express.Router();

router.get("/about", aboutController);

export default router;
