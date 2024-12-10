import express from "express";
import Order from "../controllers/order-controller.js";

const OrderRouter = express.Router();

// get all Order
OrderRouter.get("/:userId", Order.index);

// insert Order
OrderRouter.post("/", Order.store);

// show Order by id
OrderRouter.get("/:name", Order.show);

// update Order
OrderRouter.put("/:id", Order.update);

// delete Order
OrderRouter.delete("/:id", Order.destroy);

export default OrderRouter;
