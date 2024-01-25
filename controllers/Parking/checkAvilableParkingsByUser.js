import { Floors, Parkings } from "../../models";
import { catchAsyncError } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";
import { changeBookingStatus } from "../Bookings";

export const checkAvailableParkingsByUser = catchAsyncError(
  async (req, res, next) => {
    const { id } = req.params;

    changeBookingStatus();

    const buildingFloors = await Floors.find({ buildingId: id });

    if (!buildingFloors || buildingFloors.length === 0) {
      return next(new errorHandler(`No floors found!`, 401));
    }

    const floors = await Promise.all(
      buildingFloors.map(async (floor) => {
        const floorSlots = await Parkings.find({ floorID: floor._id });
        return { _id: floor._id, floorName: floor.Name, floorSlots };
      })
    );

    if (!floors || floors.length === 0) {
      return next(new errorHandler(`No slots found!`, 401));
    }

    res.status(200).json({
      floors,
    });
  }
);
