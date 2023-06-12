const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models").User;

require("dotenv").config();

router.post("/", async (req, res) => {
	try {
		const { username, name, password, email } = req.body;
		const salt = await bcrypt.genSalt(process.env.SALT);
		const hashedPassword = await bcrypt.hash(password, salt);
		const createdUser = await User.create({
			username: username,
			name: name,
			password: hashedPassword,
			email: email,
		});
		return res.sendStatus(200);
	} catch (error) {
        console.log(error)
		return res.status(400).json({ message: "Error while singing up user", error: error });
	}
});

router.patch("/password", async (req, res) => {
	try {
		const { password, email } = req.body;
		const salt = await bcrypt.salt(process.env.SALT);
		const hashedPassword = await bcrypt.hash(password, salt);
		const updatedUser = await User.update(
			{ password: hashedPassword },
			{
				where: { email: email },
			}
		);
		return res.sendStatus(200);
	} catch (error) {
		return res.status(400).json({
			message: "Error while trying to update user password",
		});
	}
});

router.patch("/username", async (req, res) => {
	try {
		const { username, email } = req.body;
		const updatedUser = await User.update(
			{ username: username },
			{
				where: { email: email },
			}
		);
		return res.sendStatus(200);
	} catch (error) {
		return res.status(400).json({
			message: "Error while trying to update user password",
		});
	}
});

module.exports = router;
