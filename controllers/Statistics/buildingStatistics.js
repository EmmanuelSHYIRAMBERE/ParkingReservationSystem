import { Building, Floors, Parkings } from "../../models";
import { catchAsyncError } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";

export const buildingStatistics = catchAsyncError(async (req, res, next) => {
  const managerEmail = req.user.email;

  const building = await Building.findOne({ managerEmail: managerEmail });

  if (!building) {
    return next(
      new errorHandler(`Access Denied. You are not authorized.`, 400)
    );
  }

  const buildingFloors = await Floors.find({ buildingId: building._id });

  if (!buildingFloors || buildingFloors.length === 0) {
    return next(
      new errorHandler(`There's no floor found in this building!`, 401)
    );
  }

  let totalAvailableSlots = 0;
  let totalReservedSlots = 0;

  for (const floor of buildingFloors) {
    const floorSlots = await Parkings.find({ floorID: floor._id });

    if (!floorSlots || floorSlots.length === 0) {
      continue;
    }

    totalAvailableSlots += floorSlots.filter((slot) => !slot.status).length;
    totalReservedSlots += floorSlots.filter((slot) => slot.status).length;
  }

  res.status(200).json({
    message: `Success, the following are the current statistics of this building.`,
    totalAvailableSlots: totalAvailableSlots,
    totalReservedSlots: totalReservedSlots,
  });
});
