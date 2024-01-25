import { Building, Notification } from "../../models";
import { catchAsyncError } from "../../utility";

export const getBuildingNotifications = catchAsyncError(
  async (req, res, next) => {
    const managerEmail = req.user.email;

    const building = await Building.findOne({ managerEmail: managerEmail });

    if (!building) {
      return next(
        new errorHandler(`Access Denied. You are not authorized.`, 400)
      );
    }
    const notifications = await Notification.find({ buildingId: building._id });

    res.status(200).json({ notifications });
  }
);
