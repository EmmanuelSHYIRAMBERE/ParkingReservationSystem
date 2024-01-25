import { User } from "../models";

export const admin = async (req, res, next) => {
  try {
    const { UserId } = req;
    const user = await User.findById(UserId);
    if (user?.role !== "admin") {
      return res.status(403).json({
        message: "You are not authorised!",
      });
    }
    next();
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
