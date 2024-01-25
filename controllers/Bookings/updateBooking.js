import { Booking } from "../../models";
import { catchAsyncError } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";
import { changeBookingStatus } from "./changeBookingStatus";

export const updateBooking = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  changeBookingStatus();

  const booking = await Booking.findByIdAndUpdate({ _id: id });

  if (!booking) {
    return next(new errorHandler(`A booking with ID: ${id}, not found`, 404));
  }

  booking.Status = "Approved";
  booking.isPlayed = "True";
  booking.approvedDate = new Date();

  await booking.save();

  const updatedBooking = await Booking.findById(id);
  res.status(200).json({
    message: `A booking with ID: ${id}, updated successfully to;`,
    updatedBooking,
  });
});
