import { Building, User } from "../../models";
import { catchAsyncError } from "../../utility";
import cloudinary from "../../utility/cloudinary";
import errorHandler from "../../utility/errorHandlerClass";
import { changeBookingStatus } from "../Bookings";

export const addNewBuilding = catchAsyncError(async (req, res, next) => {
  let {
    buildingName,
    District,
    Sector,
    Street,
    Longitude,
    Latitude,
    Description,
    managerEmail,
  } = req.body;
  const user = await User.findOne({ email: managerEmail });

  if (!user) {
    return next(
      new errorHandler(
        `User with the email: ${user.email} doesn't exists. Please choose another email.`,
        409
      )
    );
  }

  let profilePicture = "";

  if (req.file) {
    const buildingImage = await cloudinary.uploader.upload(req.file.path);
    profilePicture = buildingImage.secure_url;
  }

  const newBuilding = await Building.create({
    buildingName,
    District,
    Sector,
    Street,
    Longitude,
    Latitude,
    profilePicture,
    Description,
    managerEmail,
  });

  const { availableSpots, bookedSlots, ...buildingData } =
    newBuilding.toObject();

  user.status = "active";
  user.buildingManaged = newBuilding.buildingName;
  user.buildingAddress = newBuilding.Street;
  await user.save();

  res.status(201).json({
    message: "The new building data successfully created",
    buildingData,
  });
});
