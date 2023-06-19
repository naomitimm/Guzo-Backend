import { Schema, model } from "mongoose";

const travelBookingSchema = new Schema({
	_id: { type: Number, required: true },
	user_id: {
		type: Number,
		required: true,
	},
	travelmeans_id: {
		type: Number,
		required: true,
	},
	price: Number,
	rating: Number,
});

// THE MODEL
const TravelMeansBooking = model(
	"TravelMeansBooking",
	travelBookingSchema
);

export default TravelMeansBooking;
