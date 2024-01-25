import { catchAsyncError } from "../utility";
import errorHandler from "../utility/errorHandlerClass";

export const paginatedResults = (model) => {
  return catchAsyncError(async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    // Query the database to get the total count
    const totalCount = await model.countDocuments();

    if (endIndex < totalCount) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    results.results = await model.find().limit(limit).skip(startIndex).exec();

    if (results.results.length === 0) {
      return next(new errorHandler(`There is no data here`, 404));
    }

    res.paginatedResults = results;

    next();
  });
};
