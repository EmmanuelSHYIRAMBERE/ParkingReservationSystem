import express from "express";
import authenticate from "./aauthentication";
import bookingsRouter from "./Bookings";
import buildingRouter from "./Buildings";
import carRouter from "./cars";
import contactsRouter from "./Contacts";
import errorHandler from "../utility/errorHandlerClass";
import floorRouter from "./floors";
import { globalErrorController } from "../controllers/Errors";
import packRouter from "./payPack";
import parkingRouter from "./accessParkings";
import stripeRoute from "./payRoute";
import usersRouter from "./accessUsers";
import notificationRouter from "./Notification";

const systemRouter = express.Router();

systemRouter.use("/slots", parkingRouter);
systemRouter.use("/buildings", buildingRouter);
systemRouter.use("/contacts", contactsRouter);
systemRouter.use("/users", usersRouter);
systemRouter.use("/floor", floorRouter);
systemRouter.use("/cars", carRouter);
systemRouter.use("/notification", notificationRouter);
systemRouter.use("/reservations", bookingsRouter);
systemRouter.use("/password", authenticate);
systemRouter.use("/payment", stripeRoute);
systemRouter.use("/momo", packRouter);

systemRouter.all("*", (req, res, next) => {
  next(new errorHandler(`Failure connecting to the server!`, 404));
});

systemRouter.use(globalErrorController);

export default systemRouter;
