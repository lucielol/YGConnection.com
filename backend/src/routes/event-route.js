import express from "express";
import Event from "../controllers/event-controller.js";
import { RoleMiddleware } from "../utils/middleware.js";

const EventRouter = express.Router();

// get all event
EventRouter.get("/", RoleMiddleware, Event.index);

// insert event
EventRouter.post("/", RoleMiddleware, Event.store);

// show event by id
EventRouter.get("/:id", Event.show);

// update event
EventRouter.put("/:id", RoleMiddleware, Event.update);

// delete event
EventRouter.delete("/:id", Event.destroy);

export default EventRouter;
