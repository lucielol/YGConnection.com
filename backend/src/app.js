import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import router from "./routes/index.js";

dotenv.config();

const app = express();

// static route
app.use("/static", express.static("static"));

// CORS configuration
app.use(express.json());

app.use(
  cors({
    origin: "*", // allowed all origin/domain, you can change this to your frontend URL to spesific origin/domain
    methods: ["GET", "POST", "PUT", "DELETE"], // allawed methods
    allowedHeaders: ["Content-Type", "Authorization"], // allowed headers
  })
);

// declaration router
app.use(router);

// start the server
const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
