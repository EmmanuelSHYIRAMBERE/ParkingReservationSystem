import { Contact } from "../../models";
import { catchAsyncError } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";

export const updateContact = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const contact = await Contact.findByIdAndUpdate({ _id: id }, req.body);

  if (!contact) {
    return next(new errorHandler(`A contact with ID: ${id}, not found`, 404));
  }

  const updatedContact = await Contact.findById(id);

  res.status(200).json({
    message: `The current contact with ID: ${id} was successfully updated`,
    updatedContact,
  });
});
