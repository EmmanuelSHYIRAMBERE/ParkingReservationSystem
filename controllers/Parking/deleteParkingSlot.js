import { Building, Floors, Parkings } from "../../models";
import { catchAsyncError } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";
import { changeBookingStatus } from "../Bookings";

export const deleteParkingSlot = catchAsyncError(async (req, res, next) => {
  const managerEmail = req.user.email;

  changeBookingStatus();

  const building = await Building.findOne({ managerEmail: managerEmail });

  if (!building) {
    return res.status(400).json({
      message:
        "You are not authorized to perform this action. Building not found.",
    });
  }

  const { id } = req.params;

  const parkingSlot = await Parkings.findByIdAndDelete({ _id: id });

  if (!parkingSlot) {
    return next(new errorHandler(`A slot with ID: ${id}, not found`, 404));
  }

  const floor = await Floors.findOne({ _id: parkingSlot.floorID });

  if (!floor) {
    return next(
      new errorHandler(
        `Floor associated with parking slot ${id} not found.`,
        404
      )
    );
  }

  floor.totalSlots = parseInt(floor.totalSlots) - 1;
  floor.remainingSlots = parseInt(floor.remainingSlots) - 1;

  await floor.save();

  res.status(200).json({
    message: `A parking slot with ID: ${id}, deleted successfully!`,
  });
});
