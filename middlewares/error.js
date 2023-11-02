export const errorMiddleware = (err, req, res, next) => {
   err.message = err.message || 'Internal Server Error';
   err.statusCode = err.status || 500;

   return res.status(err.statusCode).json({
      success: false,
      message: err.message,
   });
};

class ErrorHandler extends Error {
   constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
   }
}

export default ErrorHandler;
