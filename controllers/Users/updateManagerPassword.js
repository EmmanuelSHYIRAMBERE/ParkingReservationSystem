import { managerEmailMessage } from "../../middleware";
import { User, Building } from "../../models";
import { catchAsyncError, hashPwd } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";

export const updateManagerPassword = catchAsyncError(async (req, res, next) => {
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

  const { password } = req.body;

  user.email = user.email;
  user.fullNames = user.fullNames;
  user.phoneNo = user.phoneNo;
  user.status = user.status;
  user.password = password;
  user.buildingManaged = building.buildingName;
  user.buildingAddress = building.Street;

  const hashedPwd = await hashPwd(password);

  managerEmailMessage(user.email, password);

  user.password = hashedPwd;

  await user.save();

  const filteredUser = {
    _id: user._id,
    email: user.email,
    fullNames: user.fullNames,
    phoneNo: user.phoneNo,
    status: user.status,
    password: user.password,
    role: user.role,
  };

  res.status(200).json({
    message: "Manager updated successfully",
    user: filteredUser,
  });
});
