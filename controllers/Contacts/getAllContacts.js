// export const getContacts = (req, res) => {
//   res.status(200).json(res.paginatedResults);
// };

import { Contact } from "../../models";
import { catchAsyncError } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";

export const getContacts = catchAsyncError(async (req, res, next) => {
  const contact = await Contact.find({});

  if (!contact) {
    return next(new errorHandler(`No any contact us data in our records`, 404));
  }

  res.status(200).json(contact);
});
