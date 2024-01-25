import { managerEmailMessage } from "../../middleware";
import { Building, User } from "../../models";
import {
  catchAsyncError,
  generateRandomPassword,
  hashPwd,
} from "../../utility";
import cloudinary from "../../utility/cloudinary";
import errorHandler from "../../utility/errorHandlerClass";
import { changeBookingStatus } from "../Bookings";

export const updateBuilding = catchAsyncError(async (req, res, next) => {
  try {
    const { id } = req.params;

    const building = await Building.findOne({ _id: id });

    const managerEmail = building.managerEmail;

    changeBookingStatus();

    if (!building) {
      return next(
        new errorHandler(`Access Denied. You are not authorized.`, 400)
      );
    }

    const oldManagerEmail = building.managerEmail;

    building.buildingName = req.body.buildingName || building.buildingName;
    building.District = req.body.District || building.District;
    building.Sector = req.body.Sector || building.Sector;
    building.Street = req.body.Street || building.Street;
    building.Longitude = req.body.Longitude || building.Longitude;
    building.Latitude = req.body.Latitude || building.Latitude;
    building.Description = req.body.Description || building.Description;
    building.managerNames = req.body.managerNames || building.managerNames;
    building.managerEmail = req.body.managerEmail || building.managerEmail;
    building.managerPhone = req.body.managerPhone || building.managerPhone;
    building.managerAddress =
      req.body.managerAddress || building.managerAddress;

    let profilePicture = building.profilePicture;

    if (req.file) {
      const buildingImage = await cloudinary.uploader.upload(req.file.path);
      profilePicture = buildingImage.secure_url;
    }

    await building.save();

    const manager = await User.findOne({ email: req.body.managerEmail });

    if (manager) {
      manager.fullNames = req.body.managerNames || building.managerNames;
      manager.email = req.body.managerEmail || building.managerEmail;
      manager.phoneNo = req.body.managerPhone || building.managerPhone;
      manager.location = req.body.managerAddress || building.managerAddress;
      manager.buildingManaged = req.body.buildingName;
      manager.buildingAddress = req.body.Street;
      manager.password = req.body.managerPassword || building.managerPassword;
      await manager.save();
    }

    let newManager;

    if (req.body.managerEmail && req.body.managerEmail !== oldManagerEmail) {
      newManager = await User.findOne({ email: req.body.managerEmail });

      if (newManager) {
        newManager.fullNames = req.body.managerNames || building.managerNames;
        newManager.email = req.body.managerEmail || building.managerEmail;
        newManager.phoneNo = req.body.managerPhone || building.managerPhone;
        newManager.location =
          req.body.managerAddress || building.managerAddress;
        newManager.buildingManaged = req.body.buildingName;
        newManager.buildingAddress = req.body.Street;

        const defaultPassword = generateRandomPassword(12);
        const hashedPassword = await hashPwd(defaultPassword);

        req.body.managerPassword = hashedPassword;

        newManager.password = req.body.managerPassword;
        await newManager.save();

        managerEmailMessage(newManager.email, defaultPassword);
      }
    }

    const filteredData = {
      _id: building._id,
      buildingName: building.buildingName,
      District: building.District,
      Sector: building.Sector,
      Street: building.Street,
      Longitude: building.Longitude,
      Latitude: building.Latitude,
      profilePicture: profilePicture,
      Description: building.Description,
      managerNames: building.managerNames,
      managerEmail: building.managerEmail,
      managerPhone: building.managerPhone,
      managerAddress: building.managerAddress,
    };

    res.status(200).json({
      message: `Building ${building.buildingName} updated successfully.`,
      filteredData,
    });
  } catch (error) {
    console.error(error);
    next(new errorHandler("Internal Server Error", 500));
  }
});
