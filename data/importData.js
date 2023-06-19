const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Tour = require("./../models/activityModel");

dotenv.config({ path: "./../config.env" });

console.log(process.env.DATABASE_LOCAL);

mongoose
	.connect(process.env.DATABASE_LOCAL, {
		useNewUrlParser: true, // corrected option name
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(() => console.log("DB connection successful"));

const tours = JSON.parse(
	fs.readFileSync(`${__dirname}/activity.json`, "utf-8")
);

// import data
const importData = async () => {
	try {
		await Tour.create(tours);
		console.log("data loaded");
	} catch (err) {
		console.log(err);
	}
	process.exit();
};

// delete data

const deleteData = async () => {
	try {
		await Tour.deleteMany();
		console.log("data deleted");
	} catch (err) {
		console.log(err);
	}
	process.exit();
};

// console.log(process.argv);
// console.log(to)

if (process.argv[2] === "--import") {
	importData();
} else if (process.argv[2] === "--delete") {
	deleteData();
}
