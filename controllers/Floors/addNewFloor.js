import { Floors } from "../../models/floorModel.js";
import { Building } from "../../models/parkingBuilding.js";
import { catchAsyncError } from "../../utility/catchSync.js";
import errorHandler from "../../utility/errorHandlerClass.js";

export const addNewFloor = catchAsyncError(async (req, res, next) => {
  const managerEmail = req.user.email;

  const building = await Building.findOne({ managerEmail: managerEmail });

  if (!building) {
    return next(
      new errorHandler(`Access Denied. You are not authorized.`, 400)
    );
  }

  req.body.buildingId = building._id;

  const floor = await Floors.create(req.body);

  return res.status(201).json({
    status: "A new floor added successfully",
    floor,
  });
});
