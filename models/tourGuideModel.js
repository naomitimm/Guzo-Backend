import { Schema, model } from "mongoose";

const tourGuideSchema = new Schema({
	_id: { type: Number, required: true },
	name: {
		type: String,
		required: true,
	},
	location_id: {
		type: Number,
		required: true,
	},
	featuring: String,
	rating: Number,
	image: String,

});

// THE MODEL
const TourGuide = model("TourGuide", tourGuideSchema);

export default TourGuide;
