import { Schema, model } from "mongoose";

const roleSchema = new Schema({
	_id: { type: Number, required: true },
	name: {
		type: String,
		required: [true, "a role must have a name"],
	},
	description: String,
});

// THE MODEL
const Role = model("Role", roleSchema);

export default Role;
