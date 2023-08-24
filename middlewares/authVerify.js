const jwt = require("jsonwebtoken")

module.exports = function (req, res, next) {
    const token = req.header("Authorization")
    console.log("проверка"+token)
    if (!token) return res.status(401).send("Access Denied")

    try {
        const verified = jwt.verify(token.replace("Bearer ", ""), process.env.TOKEN_SECRET)
        req.user = JSON.stringify(verified)
        console.log("req.user:", JSON.stringify(verified, null, 2));
        next()
    } catch (error) {
        res.status(401).send("Invalid token or session expired")
    }
}