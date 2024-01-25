import express from "express";

const contactsRouter = express.Router();

import {
  makeContact,
  getContacts,
  getContact,
  deleteContact,
  updateContact,
  replyContacted,
} from "../controllers/Contacts";
import { admin, verifyToken } from "../middleware";

contactsRouter.post("/makecontact", makeContact);

contactsRouter.get("/getcontacts", verifyToken, admin, getContacts);

contactsRouter.get("/getcontact/:id", verifyToken, admin, getContact);

contactsRouter.put("/updatecontact/:id", verifyToken, admin, updateContact);

contactsRouter.delete("/deletecontact/:id", verifyToken, admin, deleteContact);

contactsRouter.post("/replycontact/:id", verifyToken, admin, replyContacted);

export default contactsRouter;
