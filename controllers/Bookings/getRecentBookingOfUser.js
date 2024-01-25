import { Building, Cars, Floors, Parkings, Reservations } from "../../models";
import { catchAsyncError } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";
import { changeBookingStatus } from "./changeBookingStatus";

export const getRecentBookingOfUser = catchAsyncError(
  async (req, res, next) => {
    const userID = req.user._id;

    changeBookingStatus();

    const bookings = await Reservations.find({ userID }).sort({ dateSent: -1 });

    if (!bookings || bookings.length === 0) {
      return next(new errorHandler(`You do not have any reserved slot.`, 404));
    }

    const reservationDataArray = [];

    for (const booking of bookings) {
      const slot = await Parkings.findOne({ _id: booking.slotID });
      const car = await Cars.findOne({ _id: booking.carID });
      const building = await Building.findOne({ _id: booking.buildingId });

      const reservationData = {
        slotName: slot.Slot,
        carPlarteNo: car.platNumber,
        buildingName: building.buildingName,
        bookedDate: booking.bookedDate,
        startHour: booking.startHour,
        endHour: booking.endHour,
        Duration: booking.Duration,
        Status: booking.Status,
        totalPrice: booking.totalPrice,
        paymentRef: booking.paymentRef,
      };
      reservationDataArray.push(reservationData);
    }

    res.status(200).json(reservationDataArray);
  }
);
