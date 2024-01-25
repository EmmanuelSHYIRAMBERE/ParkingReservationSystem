import express from "express";
const carRouter = express.Router();

import { verifyToken } from "../middleware";
import {
  addNewCar,
  deleteCar,
  getAllCars,
  updateCar,
} from "../controllers/Cars";

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     cars:
 *       type: object
 *       required:
 *         - carModel
 *         - platNumber
 *       properties:
 *         carModel:
 *           type: string
 *           description: The model of the car
 *         platNumber:
 *           type: string
 *           description: The plate number of the car
 *       example:
 *         carModel: "Toyota"
 *         platNumber: "v6-8392z"
 *     updateCars:
 *       type: object
 *       properties:
 *         carModel:
 *           type: string
 *           description: The model of the car
 *         platNumber:
 *           type: string
 *           description: The plate number of the car
 *       example:
 *         carModel: "Toyota"
 *         platNumber: "v6-8392z"
 */

/**
 * @swagger
 * tags:
 *   name: Cars
 *   description: The cars managing API
 */

// carRouter.get("/checkAvailableSlots/:id", checkAvailableParkingsByUser);

/**
 * @swagger
 * /parking/cars/addNewCar:
 *   post:
 *     summary: Add a new car
 *     tags: [Cars]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *          required: true
 *          content:
 *            application/json:
 *               schema:
 *                   $ref: '#/components/schemas/cars'
 *     responses:
 *       201:
 *          description: The new car created successfully
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/cars'
 *       500:
 *          description: Internal Server Error
 */

carRouter.post("/addNewCar", verifyToken, addNewCar);

/**
 * @swagger
 * /parking/cars/getYourCars:
 *   get:
 *     summary: Returns all cars of the user
 *     tags: [Cars]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *          description: Cars found successfully
 *          content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/cars'
 *       204:
 *          description: No content found.
 *       500:
 *          description: Internal Server Error
 */

carRouter.get("/getYourCars", verifyToken, getAllCars);

/**
 * @swagger
 * /parking/cars/deleteCar/{id}:
 *   delete:
 *     summary: Delete a car
 *     tags: [Cars]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *             type: string
 *          required: true
 *          description: The car id
 *     responses:
 *       200:
 *          description: A car deleted successfully
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/cars'
 *       404:
 *          description: Not found
 *       500:
 *          description: Internal Server Error
 */

carRouter.delete("/deleteCar/:id", verifyToken, deleteCar);

/**
 * @swagger
 * /parking/cars/updateCar/{id}:
 *   put:
 *     summary: Update a car
 *     tags: [Cars]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *             type: string
 *          required: true
 *          description: The car id
 *     requestBody:
 *          required: true
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/updateCars'
 *     responses:
 *       200:
 *          description: The car's data updated successfully
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/updateCars'
 *       404:
 *          description: Not found
 *       500:
 *          description: Internal Server Error
 */

carRouter.put("/updateCar/:id", verifyToken, updateCar);

export default carRouter;
