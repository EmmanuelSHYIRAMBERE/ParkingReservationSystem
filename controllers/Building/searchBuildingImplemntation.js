import { Building } from "../../models";
import { catchAsyncError } from "../../utility";

export const searchBuildingImplemntation = catchAsyncError(
  async (req, res, next) => {
    const searchQuery = req.query.search;

    const buildings = await Building.find({
      $or: [
        { buildingName: { $regex: searchQuery, $options: "i" } },
        { District: { $regex: searchQuery, $options: "i" } },
        { Sector: { $regex: searchQuery, $options: "i" } },
        { Street: { $regex: searchQuery, $options: "i" } },
        { Description: { $regex: searchQuery, $options: "i" } },
      ],
    });

    if (!buildings) {
      return next(new errorHandler(`Not found.`, 400));
    }

    res.json(buildings);
  }
);
