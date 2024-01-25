export const catchAsyncError = (asyncFunction) => {
  return (req, res, next) => {
    asyncFunction(req, res, next).catch(next);
  };
};
