import { Cars } from "../../models";
import { catchAsyncError } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";

export const updateCar = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const car = await Cars.findByIdAndUpdate({ _id: id }, req.body);

  if (!car) {
    return next(new errorHandler(`A car with ID: ${id}, not found`, 404));
  }

  const updatedCar = await Cars.findById(id);
  res.status(200).json({
    message: `A car with ID: ${id}, updated successfully`,
    updatedCar,
  });
});
