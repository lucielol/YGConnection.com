import express from "express";
import Artist from "../controllers/artist-controller.js";
import { UploadMiddlware } from "../utils/middleware.js";

const ArtistRouter = express.Router();
const upload = UploadMiddlware();

// get all artist
ArtistRouter.get("/", Artist.index);

// insert artist
ArtistRouter.post("/", upload, Artist.store);

// show artist by id
ArtistRouter.get("/:name", Artist.show);

// update artist
ArtistRouter.put("/:id", Artist.update);

// delete artist
ArtistRouter.delete("/:id", Artist.destroy);

export default ArtistRouter;
