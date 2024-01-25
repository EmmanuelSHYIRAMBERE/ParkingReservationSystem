import { Cars } from "../../models/carModel.js";
import { User } from "../../models/userModel.js";
import { catchAsyncError } from "../../utility/catchSync.js";

export const addNewCar = catchAsyncError(async (req, res, next) => {
  const userId = req.user._id;

  const user = await User.findById(userId);

  if (!user) {
    return res.status(400).json({
      message: "User not found!",
    });
  }

  req.body.ownerID = userId;

  const car = await Cars.create(req.body);

  return res.status(201).json({
    status: "A new car added successfully",
    car,
  });
});
