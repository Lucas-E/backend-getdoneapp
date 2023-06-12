const express = require("express");
const router = express.Router();
const User = require("../models").User;
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({
			where: {
				email: email,
			},
		});
		const userPassword = user.password;
		const comparation = await bcrypt.compare(password, userPassword);
		if (comparation) {
			const refreshToken = jwt.sign(
				{ id: user.id, email: user.email },
				process.env.REFRESH_SECRET,
				{
					expiresIn: "1m",
				}
			);
			const accessToken = jwt.sign(
				{ id: user.id, email: user.email },
				process.env.ACESS_TOKEN,
				{
					expiresIn: "30s",
				}
			);
			const updatedUser = await User.update(
				{
					token: refreshToken,
				},
				{
					where: {
						email: email,
					},
				}
			);
            res.cookie('refreshToken', refreshToken, {
                maxAge: 60,
                httpOnly: true
            })
            return res.status(200).json(accessToken)

		} else {
			return res.sendStatus(400).json({
				message: "Wrong Password",
			});
		}
	} catch (error) {
		return res.status(400).json({
			message: "Error while logging in",
		});
	}
});

router.post('/logout', async (req, res) => {
    try {
        const {email} = req.body
        const updatedUser = await User.update({
            token: ''
        }, {
            where: {email:email}
        })
        res.clearCookie("refreshToken")
        return res.status(200).json({
            accessToken: ''
        })
    } catch (error) {
        return res.status(400).json({
            message: 'Error while logging out'
        })
    }
})

module.exports = router
