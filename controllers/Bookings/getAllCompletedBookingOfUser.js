import { Cars, Parkings, Reservations, User } from "../../models";
import { catchAsyncError } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";
import { changeBookingStatus } from "./changeBookingStatus";

export const getAllCompletedBookingOfUser = catchAsyncError(
  async (req, res, next) => {
    changeBookingStatus();

    const userID = req.user._id;

    const bookings = await Reservations.find({ userID, Status: "Completed" });

    if (!bookings || bookings.length === 0) {
      return next(
        new errorHandler(`You do not have any completed reserved slot.`, 404)
      );
    }

    const completedReservedSlot = [];

    for (const booking of bookings) {
      const user = await User.findOne({ _id: booking.userID });
      const parkingSlot = await Parkings.findOne({ _id: booking.slotID });
      const cars = await Cars.findOne({ _id: booking.carID });

      completedReservedSlot.push({
        _id: booking._id,
        slotName: parkingSlot ? parkingSlot.Slot : booking.slotID,
        userName: user ? user.fullNames : booking.userID,
        carPlateNo: cars ? cars.platNumber : booking.carID,
        bookedDate: booking.bookedDate,
        startHour: booking.startHour,
        endHour: booking.endHour,
        Status: booking.Status,
        dateSent: booking.dateSent,
      });
    }

    res.status(200).json(completedReservedSlot);
  }
);
