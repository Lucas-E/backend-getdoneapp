const jwt = require("jsonwebtoken");
require('dotenv').config()

const checkUserAuthentication = async (req, res, next) => {
	const authHeader = req.headers.authorization;
	if (!authHeader) {
		return res.status(400).json({
			message: "Access token not informed",
		});
	}
	const accessToken = authHeader.split(" ")[1];
	if (!accessToken) {
		return res.status(400).json({
			message: "Access token not informed",
		});
	}
    const checking = jwt.verify(accessToken, process.env.ACCESS_SECRET, (err, decoded) => {
        if(err){
            return res.status(401).json({
                message: "Expired access token"
            })
        }
        const user = decoded.user
        req.user = user
        next()
    })
};

module.exports = checkUserAuthentication
