import { Schema, model } from "mongoose";

const locationTypeSchema = new Schema({
	_id: { type: Number, required: true },
	country: String,
	region: {
		type: String,
		required: true,
	},
	zone: {
		type: String,
		required: true,
	},
	woreda: {
		type: String,
		required: true,
	},
	image: String,
	description: String
});

// THE MODEL
const LocationType = model("LocationType", locationTypeSchema);

export default LocationType;
