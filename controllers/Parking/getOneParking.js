import { Parkings } from "../../models";
import { catchAsyncError } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";
import { changeBookingStatus } from "../Bookings";

export const getOneParking = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  changeBookingStatus();

  const parkingSlot = await Parkings.findOne({ _id: id });

  if (!parkingSlot) {
    return next(
      new errorHandler(`A parking slot with ID: ${id}, not found`, 404)
    );
  }

  res.status(200).json({ parkingSlot });
});
