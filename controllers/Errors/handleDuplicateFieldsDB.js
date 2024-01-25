import errorHandler from "../../utility/errorHandlerClass";

export const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];

  const message = `Duplicate field value: ${value}`;
  return new errorHandler(message, 400);
};
