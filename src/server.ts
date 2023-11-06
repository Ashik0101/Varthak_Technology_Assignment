import express from "express";
import dotenv from "dotenv";
import connection from "./config/db";
import UserRouter from "./routes/UserRoutes";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/auth", UserRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.log(`Error Connecting to MongoDB: ${error}`);
  }
  console.log(`Server is listening on PORT ${process.env.PORT}!`);
});
