import { Schema, model } from "mongoose";

const mealSchema = new Schema({
	_id: { type: Number, required: true },
	name: {
		type: String,
		required: [true, "a meal must have a name"],
	},
    price: {
        type: Number,
        required: true
    },
    restaurant_id: {
        type: Number,
        required: true
    },
	image: String,
    description:  String
});

// THE MODEL
const Meal = model("Meal", mealSchema);

export default Meal;
