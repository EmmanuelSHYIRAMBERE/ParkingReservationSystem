import { Notification } from "../../models/notificationModel.js";
import { catchAsyncError } from "../../utility/catchSync.js";

export const addNotification = catchAsyncError(
  async (req, res, next, user, actionMade) => {
    req.body.user = user;
    req.body.actionMade = actionMade;

    try {
      const result = await Notification.create(req.body);
      console.log(result);
      next();
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);
