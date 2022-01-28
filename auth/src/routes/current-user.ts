import express from "express";

const router = express.Router();

router.get("/api/users/currentuser", (req, res) => {
    res.send("Hi there, from Current User!");
});

export { router as currentUserRouter };