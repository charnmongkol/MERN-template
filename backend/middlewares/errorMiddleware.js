//this file is to handle an error

//1. when the route is not found
const notFound = (req, res, next) => {
  const error = new Error(`Notttt Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

//2.
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = { notFound, errorHandler };
