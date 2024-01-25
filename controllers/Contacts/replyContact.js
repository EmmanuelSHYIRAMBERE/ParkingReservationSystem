import { Contact } from "../../models";
import { replyEmail } from "../../middleware";
import { replyContact } from "../../models/replyModel";
import { catchAsyncError } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";

export const replyContacted = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const contact = await Contact.findById({ _id: id });

  if (!contact) {
    return next(
      new errorHandler(`A contact with this id: ${id} not found`, 404)
    );
  }

  req.body.contactID = id;
  req.body.replyEmail = req.user.email;
  const emailRepliedTo = contact.email;

  if (!req.body.replyMessage || req.body.replyMessage == "") {
    return next(new errorHandler(`Can't send an empty response message`, 404));
  }

  replyEmail(emailRepliedTo, req.body.replyMessage);

  let repliedData = await replyContact.create(req.body);

  const repliedMessageData = {
    _id: repliedData._id,
    replyEmail: repliedData.replyEmail,
    repliedMessage: repliedData.replyMessage,
    dateSent: repliedData.dateSent,
    emailSentTo: emailRepliedTo,
    messageRepliedTo: contact.message,
  };

  res.status(201).json({
    message: "Your reply message sent successfully",
    repliedMessageData,
  });
});
