import { Schema, model } from "mongoose";

const hotelRoomSchema = new Schema({
	_id: { type: Number, required: true },
	type: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	hotel_id: {
		type: Number,
		required: [true, "the hotelId must be provided"],
	},
	image: String,

});

// THE MODEL
const HotelRoom = model("HotelRoom", hotelRoomSchema);

export default HotelRoom;
