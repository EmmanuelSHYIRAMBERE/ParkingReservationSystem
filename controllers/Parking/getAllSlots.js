import { Parkings } from "../../models";
import { catchAsyncError } from "../../utility";

export const getAllSlots = catchAsyncError(async (req, res, next) => {
  const allSlots = await Parkings.find({});

  const totalSlotsNumber = allSlots.length;

  res.status(200).json({
    totalSlots: totalSlotsNumber,
    allSlots,
  });
});
