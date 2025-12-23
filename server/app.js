import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";

const app = express();

// Middlewares
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS).
app.use(express.json()); // Handles JSON data (like from an API call in React)
app.use(bodyParser.urlencoded({ extended: true })); // Handles URL-encoded data (like from a standard HTML form)
app.use(morgan('dev')); // It automatically logs every incoming HTTP request to your terminal console so you can see what is happening in real-time


app.get("/", (req, res) => {
  console.log("ES Module Backend Running");
  res.send("ES Module Backend Running");
});

export default app;
