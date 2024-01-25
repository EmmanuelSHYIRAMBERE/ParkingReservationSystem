import { Notification } from "../../models/notificationModel.js";
import { catchAsyncError } from "../../utility/catchSync.js";
import errorHandler from "../../utility/errorHandlerClass.js";

export const deleteAllNotifications = catchAsyncError(
  async (req, res, next) => {
    const result = await Notification.deleteMany({});

    if (!result) {
      return next(new errorHandler(`There's no notifications`, 404));
    }

    res.status(200).json({ result });
  }
);
