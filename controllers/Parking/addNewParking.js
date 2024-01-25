import { Floors } from "../../models/floorModel.js";
import { Building } from "../../models/parkingBuilding.js";
import { Parkings } from "../../models/parkingModel.js";
import { catchAsyncError } from "../../utility/catchSync.js";
import errorHandler from "../../utility/errorHandlerClass.js";
import { changeBookingStatus } from "../Bookings/changeBookingStatus.js";

export const addNewParking = catchAsyncError(async (req, res, next) => {
  const managerEmail = req.user.email;

  const building = await Building.findOne({ managerEmail: managerEmail });

  if (!building) {
    return res.status(400).json({
      message: "You are not authorised!",
    });
  }

  const { id } = req.params;

  changeBookingStatus();

  const floor = await Floors.findById(id);

  if (!floor) {
    return next(new errorHandler(`A floor with ID: ${id} not found!`, 404));
  }

  req.body.Price = floor.Price;
  req.body.floorID = floor._id;
  req.body.buildingId = floor.buildingId;

  const slot = await Parkings.create(req.body);

  floor.totalSlots = parseInt(floor.totalSlots) + 1;
  floor.remainingSlots = parseInt(floor.remainingSlots) + 1;

  await floor.save();

  return res.status(201).json({
    status: "A new slot added successfully",
    slot,
  });
});
