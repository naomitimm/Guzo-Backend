import { Schema, model } from "mongoose";

const hotelSchema = new Schema({
	_id: { type: Number, required: true },
	name: {
		type: String,
		required: [true, "a role must have a name"],
	},
	description: String,
	location_id: {
		type: Number,
		required: true,
	},
	image:String,
	rating: Number

});

// THE MODEL
const Hotel = model("Hotel", hotelSchema);

export default Hotel;
