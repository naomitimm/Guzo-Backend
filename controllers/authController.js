import { create, findOne, findById } from "./../models/userModel";
import { sign, verify } from "jsonwebtoken";
import { promisify } from "util";
//// create new user

const signinToken = (id) => {
	return sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
};
export async function signup(req, res, next) {
	try {
		const newUser = await create({
			_id: req.body._id,
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
			passwordConfirm: req.body.passwordConfirm,
			role_id: req.body.role_id,
		});

		// automatically logging in when the user opens the page by sending the token to the user
		const token = signinToken(newUser._id);

		res.status(201).json({
			status: "success",
			token,
			data: {
				user: newUser,
			},
		});

		next(); // Move the next() function call here
	} catch (err) {
		res.status(404).json({
			data: {
				status: "fail",
				message: err,
			},
		});
		next(err); // Pass the error to the next middleware or error handler
	}
}

/// logging in user

export async function login(req, res, next) {
	const { email, password } = req.body;

	// first check if the email and password exist in the db
	if (!email || !password) {
		return res.status(400).json({
			data: {
				status: "please provide a valid email and password",
			},
		});
	}

	// check if the user exists and the password is correct
	const user = await findOne({ email }).select("+password");

	// checking if the user password is the correct one using the function in the model
	if (!user || !(await user.correctPassword(password, user.password))) {
		return res.status(401).json({
			data: {
				status: "incorrect email or password",
			},
		});
	}

	// if correct then send the token to user
	const token = signinToken(user._id);
	res.status(200).json({
		status: "sucess",
		user,
		token,
	});
	next();
}

// a middleware to protect the resources that are accessed by users
// if all the conditions below are satisfied then the user gets access to resources
export async function protect(req, res, next) {
	// 1) getting token and chech if it's there
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		token = req.headers.authorization.split(" ")[1];
	}

	console.log(token);

	if (!token) {
		return res.status(401).json({
			status: "fail",
			message: "you are not logged in! please log in to get access",
		});
	}

	// 2) verify token - if the token data is manipulated and if it has expired
	const decoded = await promisify(verify)(token, process.env.JWT_SECRET);

	// 3) check if the user still exists
	const currentUser = await findById(decoded.id);
	console.log(currentUser);
	if (!currentUser) {
		return res.status(401).json({
			data: {
				status: "fail",
				message: "the user belonging to this token no longer exist",
			},
		});
	}

	// 4) check if the user changed password after the token was issued
	if (currentUser.changedPasswordAfter(decoded.iat)) {
		return res.status(401).json({
			data: {
				status: "fail",
				message: "user recently changed password",
			},
		});
	}
	req.user = currentUser;
	next();
}

export function restrictTo(...roles) {
	return (req, res, next) => {
		if (!roles.includes(req.user.role_id)) {
			return res.status(403).json({
				data: {
					status: "fail",
					message: "You do not have permission to perform this action",
				},
			});
		}
		next();
	};
}
