import { Building } from "../../models";
import { catchAsyncError } from "../../utility";

export const getAllBuildings = catchAsyncError(async (req, res, next) => {
  const allBuildings = await Building.find({});

  const totalBuilding = allBuildings.length;

  res.status(200).json({
    Buildings: totalBuilding,
    allBuildings,
  });
});
