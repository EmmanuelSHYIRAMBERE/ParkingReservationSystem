import { Cars, Notification, Parkings, Reservations } from "../../models";
import { catchAsyncError, validateParkingAccessForDate } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";
import { changeBookingStatus } from "./changeBookingStatus";
import { checkSlotAvailability } from "./checkSlotAvailability";

export const bookParkingSpot = catchAsyncError(async (req, res, next) => {
  const userID = req.user._id;

  const parkingID = req.params.id;

  const parking = await Parkings.findById(parkingID);
  if (!parking) {
    return next(
      new errorHandler(`A parking slot: ${parking.Slot} not found`, 404)
    );
  }

  const carID = req.body.carID;
  const car = await Cars.findById({ _id: carID });
  if (!car) {
    return next(new errorHandler(`A car with ID: ${carID} not found`, 404));
  }
  const userBookedDate = req.body.bookedDate;
  req.body.slotID = parkingID;
  req.body.totalPrice = parking.Price;
  req.body.floorID = parking.floorID;
  req.body.buildingId = parking.buildingId;
  req.body.userID = userID;

  if (!validateParkingAccessForDate(userBookedDate)) {
    return next(new errorHandler(`Date entered not valid!`, 400));
  }

  const totalReservedSlots = await Reservations.find({ slotID: parkingID });

  if (totalReservedSlots.length > 0) {
    for (const reserved of totalReservedSlots) {
      const hours = "23:59";
      const endBookedTime = Date.parse(reserved.bookedDate + "T" + hours);
      const accessDate = Date.parse(userBookedDate + "T" + hours);

      if (accessDate === endBookedTime) {
        return next(
          new errorHandler(
            `Slot reserved for your preferred date; please try another date or slot.`,
            404
          )
        );
      }
    }
  }

  const reserved = await Reservations.create(req.body);

  parking.status = "reserved";
  await parking.save();

  const reservedData = {
    _id: reserved._id,
    bookedDate: reserved.bookedDate,
    totalPrice: reserved.totalPrice,
    Status: reserved.Status,
    Duration: reserved.Duration,
    userID: reserved.userID,
    slotID: reserved.slotID,
    floorID: reserved.floorID,
    buildingId: reserved.buildingId,
    carID: reserved.carID,
    dateSent: reserved.dateSent,
  };

  const actionMade = `User successfully booked a parking slot with the following detais:
  Parking Slot: ${parking.Slot}
  Booked Date: ${reservedData.bookedDate}
  Total Price: ${reservedData.totalPrice}
  Status: ${reservedData.Status}`;

  const buildingId = reserved.buildingId;

  const notificationData = {
    user: req.user.fullNames,
    type: "booking",
    actionMade,
    buildingId,
  };

  await Notification.create(notificationData);

  res.status(201).json({
    message: `A parking slot ${parking.Slot} booked successfully, to proceed complete your payment.`,
    reservedData,
  });
});
