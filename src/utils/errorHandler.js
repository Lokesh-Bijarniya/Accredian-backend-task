import createHttpError from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  
  if (err instanceof createHttpError.HttpError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors,
    });
  }

  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
  });
};