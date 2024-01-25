import { Building, Floors, Parkings } from "../../models";
import { catchAsyncError } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";

export const updateFloor = catchAsyncError(async (req, res, next) => {
  const managerEmail = req.user.email;

  const buildingData = await Building.findOne({ managerEmail: managerEmail });

  if (!buildingData) {
    return res.status(400).json({
      message: "You are not authorised!",
    });
  }

  const { id } = req.params;

  const floor = await Floors.findById(id);

  if (!floor) {
    return next(new errorHandler(`A floor with ID: ${id}, not found`, 404));
  }

  floor.Name = req.body.Name || floor.Name;
  floor.Price = req.body.Price || floor.Price;
  floor.buildingId = floor.buildingId;

  await floor.save();

  const filteredData = {
    _id: floor._id,
    Name: floor.Name,
    Price: floor.Price,
    buildingID: floor.buildingId,
  };

  res.status(200).json({
    message: `A floor with ID: ${id}, updated successfully`,
    filteredData,
  });
});
