import { Contact } from "../../models";
import { catchAsyncError } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";

export const deleteContact = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const contact = await Contact.findByIdAndDelete({ _id: id });

  if (!contact) {
    return next(new errorHandler(`A contact with ID: ${id}, not found`, 404));
  }

  res.status(200).json({
    message: `A contact with ID: ${id}, deleted successfully!`,
  });
});
