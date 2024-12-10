import express from "express";
import Category from "../controllers/category-controller.js";

const CategoryRouter = express.Router();

// get all category
CategoryRouter.get("/", Category.index);

// insert category
CategoryRouter.post("/", Category.store);

// show category by id
CategoryRouter.get("/:name", Category.show);

// update category
CategoryRouter.put("/:id", Category.update);

// delete category
CategoryRouter.delete("/:id", Category.destroy);

export default CategoryRouter;
