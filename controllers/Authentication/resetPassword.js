import { resetPasswordEmail } from "../../middleware";
import { User } from "../../models";
import { catchAsyncError, getToken, hashPwd } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";

import crypto from "crypto";

export const generateOTP = (expiryMinutes = 5) => {
  const otp = crypto.randomInt(100000, 999999);
  const expiryTime = new Date();
  expiryTime.setMinutes(expiryTime.getMinutes() + expiryMinutes);

  return {
    code: otp.toString(),
    expiresAt: expiryTime,
  };
};

export const forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(
      new errorHandler(
        `We could not find the user with email: ${req.body.email}`,
        404
      )
    );
  }

  const resetPasswordOTP = generateOTP().code;

  user.otp = resetPasswordOTP;
  user.otpExpiry = generateOTP().expiresAt;

  resetPasswordEmail(user.email, user.fullNames, resetPasswordOTP);

  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    status: "success",
    message: "Password reset OTP sent to your email",
    OTP: resetPasswordOTP,
  });
});

export const resetPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new errorHandler.NotFoundError("User not found"));
  }

  const OTP = req.body.OTP;

  if (user.otp !== OTP) {
    return next(
      new errorHandler(`Dear user the otp entered  ${OTP} is not correct`, 401)
    );
  }

  const currentDateTime = new Date();
  if (currentDateTime > user.otpExpiry) {
    return next(
      new errorHandler(
        `The provided otp has been expired, please try again.`,
        401
      )
    );
  }

  let hashedPwd = await hashPwd(req.body.password);

  user.password = hashedPwd;
  user.otp = undefined;
  user.otpExpiry = undefined;
  user.passwordChangedAt = Date.now();

  await user.save();

  let token = getToken({ _id: user._id, email: user.email });

  res.status(200).json({
    message: "Success, password updated!",
    access_token: token,
  });
});
