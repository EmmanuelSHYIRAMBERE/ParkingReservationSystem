import { contactReceivedEmail } from "../../middleware";
import { Contact } from "../../models";
import { catchAsyncError } from "../../utility";

export const makeContact = catchAsyncError(async (req, res, next) => {
  const contact = await Contact.create(req.body);

  contactReceivedEmail(req.body.email, req.body.fullNames);

  const actionMade = `A user has sent a feedback with the following detais:
  User Names: ${contact.fullNames}
  User email: ${contact.email}
  User message: ${contact.message}
  `;

  const notificationData = {
    user: req.user.fullNames,
    type: "contact",
    actionMade,
  };

  await Notification.create(notificationData);

  res.status(201).json({
    message:
      "Dear valued user, your feedback has receiced. Thank you for connect with us.",
    data: { contact },
  });
});
