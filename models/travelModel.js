import { Schema, model } from "mongoose";

const travelSchema = new Schema({
	_id: { type: Number, required: true },
	type: {
		type: String,
		required: [true, "a user must have a name"],
		trim: true,
	},
	location_id: {
		type: Number,
		required: true,
	},
	description: String,
	image: String,
});

// THE MODEL
const TravelMeans = model("TravelMeans", travelSchema);

export default TravelMeans;
