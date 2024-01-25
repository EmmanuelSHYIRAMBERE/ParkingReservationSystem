import { Building, Floors, Parkings, User } from "../../models";
import { catchAsyncError } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";

export const getAllFloors = catchAsyncError(async (req, res, next) => {
  try {
    const manager = req.user.email;

    const building = await Building.findOne({ managerEmail: manager });

    if (!building) {
      return next(new errorHandler(`No floors found!`, 404));
    }

    const floors = await Floors.find({ buildingId: building._id });

    if (!floors || floors.length === 0) {
      return next(new errorHandler(`Floors not found!`, 404));
    }

    const floorDetails = [];

    for (const floor of floors) {
      const slots = await Parkings.find({ floorID: floor._id });

      let remainingSlots = 0;
      let reservedSlots = 0;

      for (const slot of slots) {
        if (slot.status === false) {
          remainingSlots++;
        } else {
          reservedSlots++;
        }
      }

      const totalSlots = remainingSlots + reservedSlots;

      floorDetails.push({
        _id: floor._id,
        Name: floor.Name,
        Price: floor.Price,
        buildingId: floor.buildingId,
        totalSlots,
        remainingSlots,
        bookedSlots: reservedSlots,
      });
    }

    res.status(200).json({
      floors: floorDetails,
    });
  } catch (error) {
    next(new errorHandler(error.message, 500));
  }
});
