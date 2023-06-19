import { Schema, model } from "mongoose";

const activitySchema = new Schema({
	_id: { type: Number, required: true },
	name: {
		type: String,
		required: [true, "a activity must have a name"],
	},
    description: String,
    location_id: {
		type:Number,
		required: true
	},
    rating: Number,
    price: Number,
	image:String
});

// THE MODEL
const Activity = model("Activity", activitySchema);

export default Activity;
