import express from "express";

const router = express.Router();

router.post("/api/users/signup", (req, res) => {
    res.send("Hi there, from Sign up!");
});

export { router as signupRouter };