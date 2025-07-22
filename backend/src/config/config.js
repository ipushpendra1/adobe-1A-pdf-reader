import dotenv from "dotenv";

dotenv.config();

const config = {

    MONGODB_URL: process.env.MONGODB_URL,
    JWT_SECRET: process.env.JWT_SECRET,

}

export default config;
