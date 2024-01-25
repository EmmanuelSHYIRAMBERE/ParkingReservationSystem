import { Building } from "../../models";
import { catchAsyncError } from "../../utility";

export const getBuildingById = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const building = await Building.findOne({ _id: id });

  res.status(200).json({
    message: `Building found successfully.`,
    building,
  });
});
