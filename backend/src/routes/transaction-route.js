import express from "express";
import Transaction from "../controllers/transaction-controller.js";

const TransactionRouter = express.Router();

// get all Transaction
TransactionRouter.get("/", Transaction.index);

// insert Transaction
TransactionRouter.post("/", Transaction.store);

// show Transaction by id
TransactionRouter.get("/:id", Transaction.show);

// update Transaction
TransactionRouter.put("/:id", Transaction.update);

// delete Transaction
TransactionRouter.delete("/:id", Transaction.destroy);

export default TransactionRouter;
