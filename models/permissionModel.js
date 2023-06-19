import { Schema, model } from "mongoose";

const permissionSchema = new Schema({
	_id: { type: Number, required: true },
	name: {
		type: String,
		required: [true, "a role must have a name"],
	},
	description: String
});

// THE MODEL
const Permission = model("PermissionSchema", permissionSchema);

export default Permission;
