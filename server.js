import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import "dotenv/config";
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

import systemRouter from "./routes";
import morgan from "morgan";

const app = express();
const port = process.env.PORT;

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Smart-Parking-Project API Documentation",
      version: "1.0.0",
      description:
        "This Smart-Parking-Project API Documentation is designed to provide basics of how this API functions.",
    },
    servers: [
      {
        url: "http://localhost:2024",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJSDoc(options);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("dev"));

app.use("/parking", systemRouter);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use("/uploads", express.static("tour_images"));

mongoose
  .connect(process.env.DB_connect_devs)
  .then((res) => {
    console.log(`connected to mongo DB`);
    app.listen(port, () =>
      console.log(
        `Smart Parking project is running on port http://localhost:${port}`
      )
    );
  })
  .catch((error) => {
    console.log(error);
  });
