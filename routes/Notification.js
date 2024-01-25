import express from "express";
const notificationRouter = express.Router();

import { admin, verifyToken } from "../middleware";
import {
  deleteAllNotifications,
  deleteSingleNotification,
  getBuildingNotification,
  getBuildingNotifications,
  getNotifications,
} from "../controllers/Notification";

notificationRouter.get(
  "/getNotifications",
  verifyToken,
  admin,
  getNotifications
);

notificationRouter.get(
  "/getBuildingNotifications",
  verifyToken,
  getBuildingNotifications
);

notificationRouter.delete(
  "/deleteSingleNotification/:id",
  verifyToken,
  deleteSingleNotification
);

notificationRouter.delete(
  "/deleteAllNotifications",
  verifyToken,
  admin,
  deleteAllNotifications
);

export default notificationRouter;
