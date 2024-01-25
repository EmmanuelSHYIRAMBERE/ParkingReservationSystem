import { Building, Floors, Parkings } from "../../models";
import { catchAsyncError } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";

export const getSingleFloor = catchAsyncError(async (req, res, next) => {
  const email = req.user.email;

  const building = await Building.findOne({ managerEmail: email });

  if (!building) {
    return next(
      new errorHandler(
        `You are not authorized to perform this action. Building not found.`,
        401
      )
    );
  }

  const { id } = req.params;

  const floor = await Floors.findOne({ _id: id });

  if (!floor) {
    return next(new errorHandler(`Floor with this ID: ${id} not found!`, 401));
  }

  const floorSlots = await Parkings.find({ floorID: floor._id });

  const slots = {
    _id: floor._id,
    floorName: floor.Name,
    floorPrice: floor.Price,
    slots: floorSlots,
  };

  if (!slots || Object.keys(slots).length === 0) {
    return next(new errorHandler(`No slot found!`, 401));
  }

  res.status(200).json({
    slots,
  });
});
