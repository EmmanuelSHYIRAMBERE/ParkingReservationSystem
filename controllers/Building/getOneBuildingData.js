import { Building } from "../../models/parkingBuilding.js";
import { catchAsyncError } from "../../utility/catchSync.js";
import errorHandler from "../../utility/errorHandlerClass.js";

export const getOneBuildingData = catchAsyncError(async (req, res, next) => {
  const managerEmail = req.user.email;

  console.log(req.user);

  const building = await Building.findOne({ managerEmail: managerEmail });

  if (!building) {
    return next(
      new errorHandler(`Access Denied. You are not authorized.`, 400)
    );
  }

  return res.status(201).json({
    status: "Success",
    building,
  });
});
