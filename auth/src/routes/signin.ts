import express from "express";

const router = express.Router();

router.post("/api/users/signin", (req, res) => {
    res.send("Hi there, from Sign in!");
});

export { router as signinRouter };