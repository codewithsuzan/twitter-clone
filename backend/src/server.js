import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.routes.js";
import connectDB from "./db/db.js";
import cookieParser from "cookie-parser";

const app = express();

dotenv.config();

app.use(express.json()); // to parse req.body
app.use(cookieParser())

app.use("/api/auth", authRoute);

app.use(express.urlencoded({ extended: true })); // to parse x-www-form-urlencoded
connectDB()
.then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`\n🛞  Server is running at port:${process.env.PORT}`);
  });
})
.catch((error) => {
  console.log("MONGO db connection failed !!!", error);
});
