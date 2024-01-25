import { comparePwd, generateRandomPassword, hashPwd } from "../../utility";
import { Notification, User } from "../../models";
import { managerEmailMessage, sendEmail } from "../../middleware";
import { catchAsyncError } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";

export const signUp = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (user) {
    return next(
      new errorHandler(
        `user with the email: ${user.email} already exists, try others`,
        409
      )
    );
  }
  let hashedPwd = "";
  let defaultPassword = "";

  if (!req.body.password) {
    defaultPassword = generateRandomPassword(12);
    hashedPwd = await hashPwd(defaultPassword);

    console.log("Manager password ---", defaultPassword);
  } else {
    hashedPwd = await hashPwd(req.body.password);
  }

  req.body.password = hashedPwd;

  let newUser = await User.create(req.body);

  let managerPassword = await comparePwd(defaultPassword, newUser.password);

  if (managerPassword) {
    newUser.status = "inactive";
    newUser.role = "manager";

    await newUser.save();
  }

  const actionMade = `A new user has been registered with the following details:
  Username: ${newUser.fullNames}
  Email: ${newUser.email}
  Phone Number: ${newUser.phoneNo}
  Location: ${newUser.location}`;
  const notificationData = {
    user: newUser.fullNames,
    type: "signup",
    actionMade,
  };

  await Notification.create(notificationData);

  res.status(201).json({
    message: "user registerd successfully.",
    data: {
      userId: newUser._id,
      Names: newUser.fullNames,
      Email: newUser.email,
      phoneNo: newUser.phoneNo,
      location: newUser.location,
      status: newUser.status,
      role: newUser.role,
    },
  });
});
