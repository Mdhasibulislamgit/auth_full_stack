const express = require("express");
const ensureAuthentication = require("../Middlewares/EnsureAuth");

const router = express.Router();
router.get("/", ensureAuthentication, (req, res) => {
    res.status(200).json([
        {
            name: "Mobile",
            Price: 10000
        },
        {
            name: "Tv",
            Price: 300000
        }
    ])
})

module.exports = router