import { Building, Floors, Parkings } from "../../models";
import { catchAsyncError } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";
import { changeBookingStatus } from "../Bookings";

export const getReservedSlots = catchAsyncError(async (req, res, next) => {
  const email = req.user.email;

  changeBookingStatus();

  const building = await Building.findOne({ managerEmail: email });

  if (!building) {
    return next(
      new errorHandler(
        `You are not authorized to perform this action. Building not found.`,
        401
      )
    );
  }

  const { id } = req.params;

  const floor = await Floors.findOne({ _id: id });

  if (!floor || floor.length === 0) {
    return next(new errorHandler(`No floor found!`, 401));
  }

  const floorSlots = await Parkings.find({ floorID: floor._id, status: true });

  if (!floorSlots || floorSlots.length === 0) {
    return next(new errorHandler(`No reserved slot found!`, 404));
  }

  res.status(200).json({
    floorSlots,
  });
});
