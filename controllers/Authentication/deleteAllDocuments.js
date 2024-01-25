import {
  Building,
  Cars,
  Contact,
  Floors,
  Notification,
  Parkings,
  Reservations,
  User,
} from "../../models";
import { replyContact } from "../../models/replyModel";

export async function deleteAllDocuments() {
  try {
    await Reservations.deleteMany({});
    await Cars.deleteMany({});
    await Contact.deleteMany({});
    await Floors.deleteMany({});
    await Notification.deleteMany({});
    await Building.deleteMany({});
    await Parkings.deleteMany({});
    await replyContact.deleteMany({});
    await User.deleteMany({});

    console.log("Successfully data deleted");
  } catch (error) {
    console.log("Error", error);
  }
}
