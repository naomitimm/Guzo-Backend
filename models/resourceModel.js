import { Schema, model } from 'mongoose';

const resourceModel = new Schema({
	_id: { type: Number, required: true },
    name:{
        type: String,
		required: [true, "a role must have a name"],
    },
    url:{
        type: String,
		required: [true, "a role must have a name"],
    }
});

const Resource = model("Resource", resourceModel);

export default Resource;