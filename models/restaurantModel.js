import { Schema, model } from "mongoose";

const restaurantSchema = new Schema({
	_id: { type: Number, required: true },
	name: {
		type: String,
		required: [true, "a role must have a name"],
	},
	description: String,
	latitude: {
		type: String,
		required: true,
	},
	longitude: {
		type: String,
		required: true,
	},
	locationtype_id: {
		type: Number,
		required: true,
	},
	image: String,
});

// THE MODEL
const Restaurant = model("Restaurant", restaurantSchema);

export default Restaurant;
