const express = require("express");
const router = express.Router();

//Index route
router.get("/", (req, res) =>
{
    res.send("GET for users");
});

//Show routes
router.get("/:id", (req, res) =>
{
    res.send("GET for user id");
});

//Post routes
router.post("/", (req, res) =>
{
    res.send("POST for users");
});

//Delete routes
router.delete("/:id", (req, res) =>
{
    res.send("DELETE for user id");
});

module.exports = router;