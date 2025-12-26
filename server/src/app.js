import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
console.log(process.env.CORS_ORIGIN);



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

import authRoutes from './routes/user/auth.routes.js'

app.use('/api/v1/auth', authRoutes)


export { app };