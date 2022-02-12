const dotenv = require("dotenv");

try {
	dotenv.config({
		path: "../.env",
	});
} catch (err) {
	console.log(err);
}

console.log(process.env.PORT)

module.exports = {
	host: process.env.DB_HOSTNAME,
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	database_url : process.env.DATABASE_URL,
	node_env : process.env.NODE_ENV,
	dialect: "mysql",
};
