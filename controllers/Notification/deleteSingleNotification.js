import { Notification } from "../../models/notificationModel.js";
import { catchAsyncError } from "../../utility/catchSync.js";
import errorHandler from "../../utility/errorHandlerClass.js";

export const deleteSingleNotification = catchAsyncError(
  async (req, res, next) => {
    const { id } = req.params;

    const notification = await Notification.findByIdAndDelete({ _id: id });

    if (!notification) {
      return next(
        new errorHandler(`A notification with ID: ${id}, not found`, 404)
      );
    }

    res.status(200).json({
      message: `A notification with ID: ${id}, deleted successfully!`,
    });
  }
);
