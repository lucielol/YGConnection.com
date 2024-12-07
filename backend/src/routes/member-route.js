import express from "express";
import Member from "../controllers/member-controller.js";
import { UploadMiddlware } from "../utils/middleware.js";

const MemberRouter = express.Router();
const upload = UploadMiddlware();

// get all member
MemberRouter.get("/", Member.index);

// insert member
MemberRouter.post("/", upload, Member.store);

// show member by id
MemberRouter.get("/:id", Member.show);

// update member
MemberRouter.put("/:id", Member.update);

// delete member
MemberRouter.delete("/:id", Member.destroy);

export default MemberRouter;
