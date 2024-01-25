import { User, Building } from "../../models";
import {
  catchAsyncError,
  generateRandomPassword,
  hashPwd,
} from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";

export const updateManagerData = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  let user = await User.findById({ _id: id });

  if (!user) {
    return next(new errorHandler(`This user not found`, 404));
  }

  let building = await Building.findOne({ managerEmail: user.email });

  if (!building) {
    return next(
      new errorHandler(`This manager is not assigned to any building.`, 404)
    );
  }

  const { email, fullNames, phoneNo, status, password } = req.body;

  user.email = email || user.email;
  user.fullNames = fullNames || user.fullNames;
  user.phoneNo = phoneNo || user.phoneNo;
  user.status = status || user.status;
  user.password = password || user.password;
  user.buildingManaged = building.buildingName;
  user.buildingAddress = building.Street;

  if (req.body.email && req.body.email !== building.managerEmail) {
    building.managerEmail = user.email;
    await building.save();
  }

  await user.save();

  const filteredUser = {
    _id: user._id,
    email: user.email,
    fullNames: user.fullNames,
    phoneNo: user.phoneNo,
    status: user.status,
    role: user.role,
  };

  res.status(200).json({
    message: "Manager updated successfully",
    user: filteredUser,
  });
});
