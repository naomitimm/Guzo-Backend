import { Schema, model } from "mongoose";

const resturantBookingSchema = new Schema({
	_id: { type: Number, unique: true },
	name: String,
	date: {
		type: Date,
		required: true,
	},
	checkin: {
		type: String,
		required: true,
	},
	checkout: {
		type: String,
		required: true,
	},
	user_id: {
		type: Number,
		required: [true, "the userId must be provided"],
	},
	restaurant_id: {
		type: Number,
		required: [true, "the restaurantId must be provided"],
	},
	phonenumber: Number,
	review: Object,
}, { _id: false, autoCreate: false } );

resturantBookingSchema.pre("save", async function (next) {
	if (this.isNew) {
		const highestId = await this.constructor
			.aggregate()
			.group({
				_id: null,
				maxId: { $max: "$_id" },
			})
			.project({
				_id: { $add: ["$maxId", 1] },
			});

		if (highestId.length > 0) {
			this._id = highestId[0]._id;
		} else {
			this._id = 1; // If no documents exist, start with 1
		}
	}

	next();
});
// THE MODEL
const ResturantBooking = model("ResturantBooking", resturantBookingSchema);

export default ResturantBooking;
