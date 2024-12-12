import express from "express";
import Point from "../controllers/point-controller.js";

const PointRouter = express.Router();

PointRouter.get("/:userId", Point.index);

export default PointRouter;
