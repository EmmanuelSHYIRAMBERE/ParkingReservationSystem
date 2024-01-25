import { Building } from "../../models";
import { catchAsyncError } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";

export const deleteBuilding = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const building = await Building.findByIdAndDelete({ _id: id });

  if (!building) {
    return next(new errorHandler(`A building with ID: ${id}, not found`, 404));
  }

  res.status(200).json({
    message: `A building with ID: ${id}, deleted successfully!`,
  });
});
