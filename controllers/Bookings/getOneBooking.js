import { Reservations } from "../../models";
import { catchAsyncError } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";
import { changeBookingStatus } from "./changeBookingStatus";

export const getOneBooking = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  changeBookingStatus();

  const reserved = await Reservations.findOne({ _id: id });

  if (!reserved) {
    return next(
      new errorHandler(`A reservation data with ID: ${id}, not found`, 404)
    );
  }

  const reservedData = {
    _id: reserved._id,
    bookedDate: reserved.bookedDate,
    startHour: reserved.replyMessage,
    endHour: reserved.endHour,
    totalPrice: reserved.totalPrice,
    Status: reserved.Status,
    Duration: reserved.Duration,
    userID: reserved.userID,
    slotID: reserved.slotID,
    carID: reserved.carID,
    dateSent: reserved.dateSent,
  };

  res.status(200).json({ reservedData });
});
