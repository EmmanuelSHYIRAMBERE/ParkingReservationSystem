import express from "express";
import { verifyToken, admin, paginatedResults } from "../middleware";
import profileImagesUpload from "../middleware/profileMulter";
const usersRouter = express.Router();
import { sendEmail } from "../middleware";

import {
  getSingleUser,
  getAllUser,
  updateUser,
  deleteUser,
  updateManagerData,
  updateManagerPassword,
} from "../controllers/Users";
import { signUp, logIn } from "../controllers/Authentication";

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     signUp:
 *       type: object
 *       required:
 *         - email
 *         - fullNames
 *         - phoneNo
 *         - location
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: The email of the user
 *         fullNames:
 *           type: string
 *           description: The fullNames of the user
 *         phoneNo:
 *           type: string
 *           description: The phoneNo of the user
 *         location:
 *           type: string
 *           description: The address of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *       example:
 *         email: email@example.com
 *         fullNames: user names
 *         phoneNo: "+25070000000"
 *         location: myAddress
 *         password: myPassword1
 *     login:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: The email of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *       example:
 *         email: email@example.com
 *         password: myPassword!
 */

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: The user authentication managing API
 */

usersRouter.get("/getusers", verifyToken, admin, getAllUser);

usersRouter.get("/getuser/:id", verifyToken, getSingleUser);

/**
 * @swagger
 * /parking/users/signup:
 *   post:
 *     summary: Create a new user
 *     tags: [Authentication]
 *     requestBody:
 *          required: true
 *          content:
 *            application/json:
 *               schema:
 *                   $ref: '#/components/schemas/signUp'
 *     responses:
 *       201:
 *          description: The user was successfully created
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/signUp'
 *       500:
 *          description: Internal Server Error
 */

usersRouter.post("/signup", signUp);

/**
 * @swagger
 * /parking/users/login:
 *   post:
 *     summary: Log into user account
 *     tags: [Authentication]
 *     requestBody:
 *          required: true
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/login'
 *     responses:
 *       200:
 *          description: The user was successfully authorised
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/signUp'
 *       403:
 *          description: Wrong email or password
 *       500:
 *          description: Internal Server Error
 */

usersRouter.post("/login", logIn);

usersRouter.put("/userupdate", verifyToken, profileImagesUpload, updateUser);

usersRouter.put(
  "/updateManagerData/:id",
  verifyToken,
  admin,
  updateManagerData
);

usersRouter.put(
  "/updateManagerPassword/:id",
  verifyToken,
  admin,
  updateManagerPassword
);

usersRouter.delete("/userdelete/:id", verifyToken, deleteUser);

export default usersRouter;
