import express from "express";
import { addNewBuilding } from "../controllers/Building/addNewBuilding";
import { admin, verifyToken } from "../middleware";
import { deleteBuilding } from "../controllers/Building/deleteBuilding";
import { getAllBuildings } from "../controllers/Building/getAllBuildings";
import { updateBuilding } from "../controllers/Building/updateBuilding";
import profileImagesUpload from "../middleware/profileMulter";
import {
  getBuildingById,
  getBuildingsNearByUser,
  getOneBuildingData,
  searchBuildingImplemntation,
} from "../controllers/Building";
const buildingRouter = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Buildings:
 *       type: object
 *       required:
 *         - managerEmail
 *         - buildingName
 *         - District
 *         - Sector
 *         - Street
 *         - Longitude
 *         - Latitude
 *         - profilePicture
 *         - Description
 *       properties:
 *         managerEmail:
 *           type: string
 *           description: The manager's email
 *         buildingName:
 *           type: string
 *           description: The name of the building containing parkings
 *         District:
 *           type: string
 *           description: The district of the building
 *         Sector:
 *           type: string
 *           description: The sector of the building
 *         Street:
 *           type: string
 *           description: The street number of the building
 *         Longitude:
 *           type: string
 *           description: The longitude of the building
 *         Latitude:
 *           type: string
 *           description: The latitude of the building
 *         profilePicture:
 *           type: string
 *           format: binary
 *           description: The profile image of the building
 *         Description:
 *           type: string
 *           description: The description of the building
 *       example:
 *         managerEmail: "manager@building_park_zone.com"
 *         buildingName: "Park Zone"
 *         District: "Kicukiro"
 *         Sector: "Gahanga"
 *         Street: "KK 095 St"
 *         Longitude: "30.0474° E"
 *         Latitude: "-1.9706° S"
 *         profilePicture: "park_zone.jpg"
 *         Description: "Park Zone is a modern commercial and residential building located in the heart of Gahanga. It offers state-of-the-art facilities, including office spaces, apartments, and retail spaces. The building provides a stunning view of the surrounding area and is equipped with the latest amenities for a comfortable and convenient lifestyle."
 *     updateBuildings:
 *       type: object
 *       properties:
 *         managerEmail:
 *           type: string
 *           description: The manager's email
 *         buildingName:
 *           type: string
 *           description: The name of the building containing parkings
 *         District:
 *           type: string
 *           description: The district of the building
 *         Sector:
 *           type: string
 *           description: The sector of the building
 *         Street:
 *           type: string
 *           description: The street number of the building
 *         Longitude:
 *           type: string
 *           description: The longitude of the building
 *         Latitude:
 *           type: string
 *           description: The latitude of the building
 *         profilePicture:
 *           type: string
 *           format: binary
 *           description: The profile image of the building
 *         Description:
 *           type: string
 *           description: The description of the building
 *       example:
 *         managerEmail: "manager@building_park_zone.com"
 *         buildingName: "Park Zone"
 *         District: "Kicukiro"
 *         Sector: "Gahanga"
 *         Street: "KK 095 St"
 *         Longitude: "30.0474° E"
 *         Latitude: "-1.9706° S"
 *         Price: "800"
 *         profilePicture: "kigali_tower_image.jpg"
 *         Floors: "15"
 *         Description: "Park Zone is a modern commercial and residential building located in the heart of Gahanga. It offers state-of-the-art facilities, including office spaces, apartments, and retail spaces. The building provides a stunning view of the surrounding area and is equipped with the latest amenities for a comfortable and convenient lifestyle."
 */

/**
 * @swagger
 * tags:
 *   name: Buildings
 *   description: The buildings managing API
 */

/**
 * @swagger
 * /parking/buildings/getAllBuildingData:
 *   get:
 *     summary: Returns the details of all the buildings
 *     tags: [clientAccess]
 *     responses:
 *       200:
 *          description: The buildings found successfully
 *          content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Buildings'
 *       204:
 *          description: No content found.
 *       500:
 *          description: Internal Server Error
 */

buildingRouter.get("/getAllBuildingData", getAllBuildings);

/**
 * @swagger
 * /parking/buildings/addNewBuilding:
 *   post:
 *     summary: Create a new building data
 *     tags: [Buildings]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *          required: true
 *          content:
 *            multipart/form-data:
 *               schema:
 *                   $ref: '#/components/schemas/Buildings'
 *     responses:
 *       201:
 *          description: The new building data was successfully created
 *          content:
 *             multipart/form-data:
 *               schema:
 *                   $ref: '#/components/schemas/Buildings'
 *       409:
 *          description: A user already exists
 *       500:
 *          description: Internal Server Error
 */

buildingRouter.post(
  "/addNewBuilding",
  profileImagesUpload,
  verifyToken,
  admin,
  addNewBuilding
);

buildingRouter.get(
  "/getBuildingsNearByUser",
  verifyToken,
  getBuildingsNearByUser
);

/**
 * @swagger
 * /parking/buildings/searchBuildingImplemntation:
 *   get:
 *     summary: Return buildings near to the user
 *     tags: [clientAccess]
 *     parameters:
 *       - in: query
 *         name: search
 *         required: true
 *         schema:
 *           type: string
 *         description: The search query to filter buildings
 *     responses:
 *       200:
 *          description: The success
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/updateBuildings'
 *       404:
 *          description: Not found
 *       500:
 *          description: Internal Server Error
 */

buildingRouter.get("/searchBuildingImplemntation", searchBuildingImplemntation);

buildingRouter.delete(
  "/deleteBuilding/:id",
  verifyToken,
  admin,
  deleteBuilding
);

buildingRouter.get("/getOneBuildingData", verifyToken, getOneBuildingData);

buildingRouter.get("/getBuildingById/:id", verifyToken, admin, getBuildingById);

buildingRouter.put(
  "/updateBuilding/:id",
  profileImagesUpload,
  verifyToken,
  admin,
  updateBuilding
);

export default buildingRouter;
