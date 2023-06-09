const fs = require("fs");
const path = require("path");
require("dotenv").config();

const sequelizeConfig = {
	development: {
		username: process.env.DATABASE_USERNAME,
		password: process.env.DATABASE_PASSWORD,
		database: process.env.DATABASE,
		host: process.env.HOST,
		dialect: process.env.DIALECT,
	},
	test: {
		username: "",
		password: "",
		database: "",
		host: "",
		dialect: "",
	},
	production: {
		username: "",
		password: "",
		database: "",
		host: "",
		dialect: "",
	},
};

const sequelizeConfigJson = JSON.stringify(sequelizeConfig);
const filePath = path.join(__dirname, "../../config/config.json");

try {
	fs.writeFileSync(filePath, sequelizeConfigJson);
} catch (error) {
	console.log(error);
}
