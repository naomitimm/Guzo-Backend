import express from "express";
import morgan from "morgan";
import cors from "cors";
import { user } from "./routes/user";
import { adventures } from "./routes/adventures";
import { hotels } from "./routes/hotels";
import { hotelBooking } from "./routes/hotelBooking";
import { hotelRoom } from "./routes/hotelRoom";
import { locations } from "./routes/location";
import { locationType } from "./routes/locationType";
import { food } from "./routes/food";
import { permissions } from "./routes/permission";
import { resources } from "./routes/resource";
import { restaurants } from "./routes/restaurants";
import { restaurantBooking } from "./routes/restaurantBooking";
import { roles } from "./routes/role";
import { tourGuides } from "./routes/tourGuide";
import { travel } from "./routes/travel";
import { travelBooking } from "./routes/travelBooking";

const app = express();

console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

app.use(json());
const corsOptions = {
	origin: "http://localhost:3000", // Replace with your frontend origin
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Mount our route middlewares
app.use("/api/v1/users", user);
app.use("/api/v1/activities", adventures);
app.use("/api/v1/hotels", hotels);
app.use("/api/v1/hotelBooking", hotelBooking);
app.use("/api/v1/hotelRoom", hotelRoom);
app.use("/api/v1/locations", locations);
app.use("/api/v1/locationtype", locationType);
app.use("/api/v1/meals", food);
app.use("/api/v1/permissions", permissions);
app.use("/api/v1/resources", resources);
app.use("/api/v1/restaurants", restaurants);
app.use("/api/v1/restaurantBooking", restaurantBooking);
app.use("/api/v1/roles", roles);
app.use("/api/v1/tourGuides", tourGuides);
app.use("/api/v1/travel", travel);
app.use("/api/v1/travelBooking", travelBooking);

// read operation

export default app;
