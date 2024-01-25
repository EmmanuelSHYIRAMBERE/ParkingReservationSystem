import { Building, Reservations, User } from "../../models";
import { catchAsyncError } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";

export const getBuildingsNearByUser = catchAsyncError(
  async (req, res, next) => {
    const userEmail = req.user.email;

    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return next(
        new errorHandler(
          `Dear valued user you must register to perform this action`,
          404
        )
      );
    }

    const totalUserReservedSlots = await Reservations.find({
      userID: user._id,
    }).sort({ dateSent: 1 });

    console.log("*********", totalUserReservedSlots);
    if (!totalUserReservedSlots) {
      return next(
        new errorHandler(`There's no reserved slots for this user`, 404)
      );
    }

    const uniqueBuildingIds = new Set();
    const buildings = [];

    for (const buildingsSlotReservedFrom of totalUserReservedSlots) {
      const buildingId = buildingsSlotReservedFrom.buildingId;

      if (!uniqueBuildingIds.has(buildingId)) {
        const building = await Building.findById(buildingId);
        if (building) {
          buildings.push(building);
          uniqueBuildingIds.add(buildingId);
        }
      }
    }

    res.status(200).json({ buildings });
  }
);
