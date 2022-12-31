import express from "express"
import mongoose from "mongoose"
import cors from 'cors';
import globalErrHandler from "./utils/errorController.js";
import path from "path";
import dotenv from "dotenv";
import AppError from "./utils/appError.js";

dotenv.config();


const PORT = 5000;

const app = express();
app.use(express.json())

// import { fileURLToPath } from 'url';
mongoose.connect(process.env.DATABASE)
// import listingRoutes from "./routes/listing.routes.js"


// import userRoutes from "./routes/user.routes.js"

const corsOptions = {

    origin: "http://localhost:3000",
    credentials: true,

}
app.use(cors())
// app.use("/api/user", userRoutes)


app.use("/*", (req, res, next) => {
    const err = new AppError(404, "fail", "undefined route");
    next(err, req, res, next);
});

app.use(globalErrHandler);
app.listen(process.env.PORT || PORT, () => {
    console.log("Server start on port " + PORT);
})