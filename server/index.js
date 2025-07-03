import { app } from "./app.js";
import dotenv from "dotenv";
import { connectDb } from "./src/db/index.js";
dotenv.config({});

connectDb()
  .then(() => {
    app.listen(5000, () => {
      console.log(`server is running on http://localhost:${5000}`);
    });
  })
  .catch((error) => {
    console.log("index.js Mongo db connection failed", error);
  });
