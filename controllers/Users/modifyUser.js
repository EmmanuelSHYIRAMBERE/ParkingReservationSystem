import { User, Admin } from "../../models";
import { catchAsyncError } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";

export const modifyUser = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  // Check in the User database
  const user = await User.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });

  // If not found in the User database, check in the Admin database
  if (!user) {
    const admin = await Admin.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });

    if (!admin) {
      return next(new errorHandler(`A user with ID: ${id} not found`, 404));
    }

    // You might need to modify the response based on your data structure
    res.status(200).json({
      message: `A user with ID: ${id}, modified successfully to:`,
      ...req.body,
      image: req.file.path,
    });

    return;
  }

  // You might need to modify the response based on your data structure
  res.status(200).json({
    message: `A user with ID: ${id}, modified successfully to:`,
    ...req.body,
    image: req.file.path,
  });
});
