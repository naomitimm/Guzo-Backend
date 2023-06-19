import mongoose, { Schema, model } from "mongoose";
import { isEmail } from "validator";
import { hash, compare } from "bcryptjs";

const userSchema = new Schema({
	_id: {
		type: Number,
		unique: true,
	  },
	name: {
		type: String,
		required: [true, "Please provide your name"],
		trim: true,
	},
	password: {
		type: String,
		required: [true, "Please provide a password"],
		minlength: 8,
		select: false,
	},
	email: {
		type: String,
		required: [true, "Please provide your email"],
		unique: true,
		lowercase: true,
		validate: [isEmail, "Please provide a valid email"],
	},
	imageCover: String,
	passwordConfirm: {
		type: String,
		required: [true, "Please provide matching password"],
		validate: {
			validator: function (el) {
				return el === this.password;
			},
			message: "The password doesn't match",
		},
	},
	passwordChangedAt: Date,
	active: Boolean,
	role_id: {
		type: Number,
		default:2,
		required: [true, "Please provide a role_id"],
	},
},   { _id: false, autoCreate: false });


// password encryption
userSchema.pre("save", async function (next) {
	if (this.isNew) {
		const highestId = await this.constructor.aggregate()
		  .group({
			_id: null,
			maxId: { $max: '$_id' },
		  })
		  .project({
			_id: { $add: ['$maxId', 1] },
		  });
	
		if (highestId.length > 0) {
		  this._id = highestId[0]._id;
		} else {
		  this._id = 1; // If no documents exist, start with 1
		}
	  }


	if (!this.isModified("password")) return next();

	this.password = await hash(this.password, 12);
	this.passwordConfirm = undefined;
	next();
});

// a function to check the user's password is valid by comparing the hashed password when the user logs in
userSchema.methods.correctPassword = async function (
	candidatePassword,
	userPassword
) {
	return await compare(candidatePassword, userPassword);
};

// a function to check if the user's password has changed after the token was issued
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
	if (this.passwordChangedAt) {
		const changedTimeStamp = parseInt(
			this.passwordChangedAt.getTime() / 1000,
			10
		);
		return JWTTimestamp < passwordChangedAt;
	}
	return false;
};

// THE MODEL
const User = model("User", userSchema);

export default User;
