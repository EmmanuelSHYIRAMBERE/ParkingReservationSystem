import { Parkings, Reservations } from "../../models";
import { catchAsyncError } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";

export const sytemStatistics = catchAsyncError(async (req, res, next) => {
  const dayOfWeekBookings = await Reservations.aggregate([
    {
      $group: {
        _id: { $dayOfWeek: { $toDate: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        dayOfWeek: "$_id",
        count: 1,
        _id: 0,
      },
    },
    {
      $sort: { dayOfWeek: 1 },
    },
  ]);

  if (!dayOfWeekBookings || dayOfWeekBookings.length === 0) {
    return next(new errorHandler(`There's no bookings found!`, 404));
  }

  const result = dayOfWeekBookings.map((entry) => {
    let dayOfWeek = entry.dayOfWeek;
    const dayName = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
    }).format(new Date(dayOfWeek));
    if (dayOfWeek === 0) {
      dayOfWeek = dayOfWeek + 8;
    }
    if (dayOfWeek === 6) {
      dayOfWeek = dayOfWeek + 1;
    }
    return {
      dayOfWeek: dayOfWeek - 1,
      dayName,
      totalReservations: entry.count,
    };
  });

  if (!result || result.length === 0) {
    return next(new errorHandler(`There's no bookings found!`, 404));
  }

  res.json({ result });
});
