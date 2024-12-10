import express from "express";
import Checkout from "../controllers/checkout-controller.js";

const CheckoutRouter = express.Router();

// get all checkout
CheckoutRouter.get("/:userId", Checkout.index);

// insert checkout
CheckoutRouter.post("/", Checkout.store);

// show checkout by id
CheckoutRouter.get("/:name", Checkout.show);

// update checkout
CheckoutRouter.put("/:id", Checkout.update);

// delete checkout
CheckoutRouter.delete("/:id", Checkout.destroy);

export default CheckoutRouter;
