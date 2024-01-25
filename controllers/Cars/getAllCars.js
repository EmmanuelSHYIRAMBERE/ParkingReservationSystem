import { Cars } from "../../models";
import { catchAsyncError } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";

export const getAllCars = catchAsyncError(async (req, res, next) => {
  const ownerID = req.user._id;

  const cars = await Cars.find({ ownerID: ownerID });

  if (!cars || cars.length === 0) {
    return next(new errorHandler(`You don't have any cars registered`, 404));
  }

  res.status(200).json(cars);
});
