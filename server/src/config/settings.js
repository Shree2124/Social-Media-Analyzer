import dotenv from "dotenv";


dotenv.config();

const databaseUrl = process.env.MONGODB_URL;
const databaseName = process.env.DB_NAME;
const PORT = process.env.PORT;
const corsOrigin = process.env.CORS_ORIGIN;
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const accessTokenExpiry = process.env.ACCESS_TOKEN_EXPIRY;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
const refreshTokenExpiry = process.env.REFRESH_TOKEN_EXPIRY;
const jwtSecret = process.env.JWT_SECRET;
const email = process.env.EMAIL_ADDRESS;
const password = process.env.EMAIL_PASSWORD;
const frontend_url = process.env.FRONTEND_URL;

// cloudinary: -
const cloud_name = process.env.CLOUDINARY_CLOUD_NAME;
const cloudinary_api_key = process.env.CLOUDINARY_API_KEY;
const cloudinary_api_secret = process.env.CLOUDINARY_API_SECRET;

// cashfree

// const CASHFREE_APP_ID = process.env.CASHFREE_APP_ID;
// const CASHFREE_SECRET = process.env.CASHFREE_SECRET;
// const CASHFREE_BASE_URL = process.env.CASHFREE_BASE_URL;

console.log(process.env.NODE_ENV);

const options = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "development",
  sameSite: process.env.NODE_ENV === "development" ? "none" : "strict",
  path: "/",
};

export {
  databaseName,
  databaseUrl,
  PORT,
  corsOrigin,
  accessTokenExpiry,
  accessTokenSecret,
  refreshTokenExpiry,
  refreshTokenSecret,
  jwtSecret,
  options,
  email,
  password,
  frontend_url,
  cloud_name,
  cloudinary_api_key,
  cloudinary_api_secret,
};
