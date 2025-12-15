import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    console.log("ES Module Backend Running");
  res.send("ES Module Backend Running");
});

export default app;
