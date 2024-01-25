import { User } from "../../models";
import { catchAsyncError } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";

export const deleteUser = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findByIdAndDelete({ _id: id });

  if (!user) {
    return next(new errorHandler(`A  user with ID: ${id}, not found`, 404));
  }

  res.status(200).json({
    message: `A user with ID: ${id}, deleted successfully!`,
  });
});

// import { User, Building } from "../../models";
// import { catchAsyncError } from "../../utility";
// import errorHandler from "../../utility/errorHandlerClass";

// export const deleteUser = catchAsyncError(async (req, res, next) => {
//   const { id } = req.params;
//   const { role, buildingId } = req.user; // Assuming you have the user's role and building ID in the request

//   const lowercaseRole = role.toLowerCase(); // Convert the role to lowercase

//   let user;

//   if (lowercaseRole === "super") {
//     // Super admin can delete users in all buildings
//     user = await User.findByIdAndDelete({ _id: id });
//   } else if (lowercaseRole === "admin") {
//     // Admin can only delete users in their building
//     const building = await Building.findById(buildingId);

//     if (!building) {
//       return next(
//         new errorHandler(`Building with ID: ${buildingId} not found`, 404)
//       );
//     }

//     user = await User.findOneAndDelete({ _id: id, building: buildingId });
//   } else {
//     return next(new errorHandler("Unauthorized", 403)); // Handle other roles or unauthorized access
//   }

//   if (!user) {
//     return next(new errorHandler(`A user with ID: ${id} not found`, 404));
//   }

//   res.status(200).json({
//     message: `A user with ID: ${id} deleted successfully!`,
//   });
// });
