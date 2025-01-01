import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.routes.js";
import connectDB from "./db/db.js";

const app = express();

dotenv.config();

app.use(express.json()); // to parse req.body

app.use("/api/auth", authRoute);

connectDB()
.then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`\n🛞  Server is running at port:${process.env.PORT}`);
  });
})
.catch((error) => {
  console.log("MONGO db connection failed !!!", error);
});