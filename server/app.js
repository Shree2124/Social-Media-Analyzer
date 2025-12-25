import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
  })
);


app.use(
    express.json({
      // Middleware
      limit: "16kb",
    })
  );

// if data is comming from URL
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(express.static("public"));

// to perform CRUD operation on cookies:-
app.use(cookieParser());


export { app };