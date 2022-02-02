import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import mongoose from "mongoose";
import cookieSession from "cookie-session"

import { currentUserRouter, signinRouter, signupRouter, signoutRouter } from "./routes";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors";

const app = express();
app.set("trust proxy", true)
app.use(json());
app.use(
    cookieSession({
        signed: false,
        secure: true
    })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all("*", async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
    if(!process.env.JWT_KEY){
        throw new Error("JWT_KEY must be defined!")
    }
    
    try {
        await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
        console.log("Connected to MongoDB on GCP")
    }catch(err) {
        console.log(err);
        console.error(err);
    }

    app.listen(3000, () => {
        console.log("Listening on port 3000!!");
    });
}

start();

