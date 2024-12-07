import express from "express";
import { Register, Login } from "../utils/auth.js";

const AuthRouter = express.Router();

AuthRouter.post("/register", Register);
AuthRouter.post("/login", Login);

export default AuthRouter;
