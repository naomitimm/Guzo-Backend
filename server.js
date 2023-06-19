import { connect } from "mongoose";

import { config } from "dotenv";
config({ path: ".config/config.env" });

// used for the databae that is hosted on mongo atlas
const DB = process.env.DATABASE.replace(
	"<PASSWORD>",
	process.env.DATABASE_PASSWORD
);

//////////////////////////////////////////////////
connect(process.env.DATABASE_LOCAL, {
	useNewUrlParser: true, // corrected option name
	useUnifiedTopology: true,
	useCreateIndex: true,
})
	.then(() => console.log("DB connection successful"))
	.catch((err) => console.error("DB connection error:", err));
import { listen } from "./app";

const port = 5000;
listen(port, () => {
	console.log(`Running on port ${port}....`);
});
