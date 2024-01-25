import { Reservations } from "../../models";
import { changeBookingStatus } from "./changeBookingStatus";

export async function checkSlotAvailability(id, bookedDate) {
  changeBookingStatus();

  const userEndTime = Date.parse(bookedDate + "T" + endHour);
  const userStartTime = Date.parse(bookedDate + "T" + startHour);

  const totalReservedSlots = await Reservations.find({ slotID: id });

  const reservedSlots = totalReservedSlots.filter(
    (reserved) => reserved.Status === "Completed"
  );

  if (reservedSlots.length > 0) {
    for (const reserved of reservedSlots) {
      const endBookedTime = Date.parse(
        reserved.bookedDate + "T" + reserved.endHour
      );
      const startBookedTime = Date.parse(
        reserved.bookedDate + "T" + reserved.startHour
      );

      if (
        (userStartTime >= startBookedTime && userStartTime < endBookedTime) ||
        (userEndTime > startBookedTime && userEndTime <= endBookedTime) ||
        (userStartTime <= startBookedTime && userEndTime >= endBookedTime)
      ) {
        const conflictingReservation = {
          bookedDate: reserved.bookedDate,
          startHour: reserved.startHour,
          endHour: reserved.endHour,
        };

        console.log("Conflict Detected:", conflictingReservation);

        return {
          available: false,
          reason: "Time slot is already booked",
          conflictingReservation,
        };
      }
    }

    console.log("No conflict detected. Slot is available");
    return true;
  }
}
