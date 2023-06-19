const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

// used for the databae that is hosted on mongo atlas
const DB = process.env.DATABASE.replace(
	"<PASSWORD>",
	process.env.DATABASE_PASSWORD
);

//////////////////////////////////////////////////
mongoose
	.connect(process.env.DATABASE_LOCAL, {
		useNewUrlParser: true, // corrected option name
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(() => console.log("DB connection successful"))
	.catch((err) => console.error("DB connection error:", err));
const app = require("./app");

const port = 5000;
app.listen(port, () => {
	console.log(`Running on port ${port}....`);
});
