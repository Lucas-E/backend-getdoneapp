const express = require("express");
const router = express.Router();
const User = require("../models").User;
require("dotenv").config();
const bcrypt = require("bcrypt");

const taskRouter = require("./task");

const checkJwt = require("../middleware/checkJwt");

router.get("/", checkJwt, async (req, res) => {
	try {
		const userId = Number(req.user.id);
		const foundUser = await User.findOne({
			where: {
				id: userId,
			},
		});
		return res.status(200).json({
			user: foundUser,
		});
	} catch (error) {
		return res.status(401).json({
			message: "Error while getting user",
		});
	}
});

router.delete("/", checkJwt, async (req, res) => {
	try {
		const userId = Number(req.user.id);
		const userEmail = req.user.email;
		await User.destroy({
			where: {
				id: userId,
				email: userEmail,
			},
		});
		return res.sendStatus(200);
	} catch (error) {
		return res.status(401).json({
			message: "Error while deleting user",
		});
	}
});

router.patch("/", checkJwt, async (req, res) => {
	try {
		const userId = Number(req.user.id);
		const userEmail = req.user.email;
		const { username, name, email, password } = req.body;
		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashedPassword = await bcrypt.hash(password, salt);
		await User.update(
			{
				username: username,
				name: name,
				email: email,
				password: hashedPassword,
			},
			{
				where: {
					id: userId,
					email: userEmail,
				},
			}
		);
		return res.sendStatus(200);
	} catch (error) {
		return res.status(401).json({
			message: "Error while deleting user",
		});
	}
});

router.get("/confirm", checkJwt, async (req, res) => {
	try {
		const userId = Number(req.user.id);
		const foundUser = await User.findOne({
			where: {
				id: userId,
			},
		});
		const password = req.body.password;
		const userPassword = foundUser.password;
		const compare = await bcrypt.compare(password, userPassword);
		if (compare) {
			return res.status(200);
		} else {
			return res.status(401);
		}
	} catch (error) {
		return res.status(400).json({
			message: "Error while confirming the current user",
		});
	}
});

router.use("/task", taskRouter);

module.exports = router;
