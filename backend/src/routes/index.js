import express from "express";
import AuthRouter from "./auth-route.js";
import ProductRouter from "./product-route.js";
import ArtistRouter from "./artist-route.js";
import EventRouter from "./event-route.js";
import UserRouter from "./user-route.js";
import MemberRouter from "./member-route.js";

const router = express.Router();

// autentication route
router.use("/api/auth", AuthRouter);

// products route
router.use("/api/products", ProductRouter);

// artists route
router.use("/api/artist", ArtistRouter);

// events route
router.use("/api/event", EventRouter);

// member route
router.use("/api/member", MemberRouter);

// users router
router.use("/api/profile", UserRouter);

export default router;
