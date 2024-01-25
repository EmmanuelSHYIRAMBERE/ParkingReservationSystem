// export const getBookings = (req, res) => {
//   res.status(200).json(res.paginatedResults);
// };

import { Cars, Parkings, Reservations, User } from "../../models";
import { catchAsyncError } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";
import { changeBookingStatus } from "./changeBookingStatus";

export const getBookings = catchAsyncError(async (req, res, next) => {
  changeBookingStatus();

  try {
    const bookings = await Reservations.find({});

    if (!bookings || bookings.length === 0) {
      return next(new errorHandler(`No bookings found in the database`, 404));
    }

    const floorDetails = [];

    for (const booking of bookings) {
      const user = await User.findOne({ _id: booking.userID });
      const parkingSlot = await Parkings.findOne({ _id: booking.slotID });
      console.log(parkingSlot);
      const cars = await Cars.findOne({ _id: booking.carID });

      floorDetails.push({
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

    res.status(200).json(floorDetails);
  } catch (error) {
    console.error("Error in getBookings:", error);
    next(new errorHandler("Internal Server Error", 500));
  }
});
