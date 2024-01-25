import express from "express";

const stripeRoute = express.Router();

import {
  addNewCard,
  createCharges,
  createCustomer,
} from "../controllers/payment";

stripeRoute.post("/createCustomer", createCustomer);
stripeRoute.post("/addCard", addNewCard);
stripeRoute.post("/createCharges", createCharges);

export default stripeRoute;
