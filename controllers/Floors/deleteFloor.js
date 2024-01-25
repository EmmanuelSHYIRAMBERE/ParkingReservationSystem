import { Building, Floors } from "../../models";
import { catchAsyncError } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";

export const deleteFloor = catchAsyncError(async (req, res, next) => {
  const managerEmail = req.user.email;

  const building = await Building.findOne({ managerEmail: managerEmail });

  if (!building) {
    return res.status(400).json({
      message: "You are not authorised!",
    });
  }

  const { id } = req.params;

  const floor = await Floors.findByIdAndDelete({ _id: id });

  if (!floor) {
    return next(new errorHandler(`A floor with ID: ${id}, not found`, 404));
  }

  res.status(200).json({
    message: `A floor with ID: ${id}, deleted successfully!`,
  });
});
