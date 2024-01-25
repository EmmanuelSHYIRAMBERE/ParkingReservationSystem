import { Cars } from "../../models";
import { catchAsyncError } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";

export const deleteCar = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const deletedCar = await Cars.findByIdAndDelete({ _id: id });

  if (!deletedCar) {
    return next(new errorHandler(`A car with ID: ${id}, not found`, 404));
  }

  res.status(200).json({
    message: `A car with ID: ${id}, deleted successfully!`,
  });
});
