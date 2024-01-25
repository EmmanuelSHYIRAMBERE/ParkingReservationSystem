import cron from "node-cron";

import { Parkings, Reservations } from "../../models";
import { catchAsyncError } from "../../utility";

export const changeBookingStatus = catchAsyncError(async () => {
  const bookings = await Reservations.find({});

  if (bookings) {
    for (const booking of bookings) {
      const endBookedTime = Date.parse(booking.bookedDate);
      const now = Date.now();

      const parkingSlot = await Parkings.findOne({ _id: booking.slotID });

      if (now >= endBookedTime) {
        booking.Status = "Completed";
        await booking.save();

        if (parkingSlot) {
          parkingSlot.status = "available";
          await parkingSlot.save();
        }
      }
    }
  }
});
