import express from "express";
import {
  changePwd,
  forgotPassword,
  resetPassword,
} from "../controllers/Authentication";
import { verifyToken } from "../middleware";

const authenticate = express.Router();

authenticate.patch("/changepassword", verifyToken, changePwd);

authenticate.post("/forgotpassword", forgotPassword);

authenticate.patch("/resetpassword", resetPassword);

export default authenticate;
