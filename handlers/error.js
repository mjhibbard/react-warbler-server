function errorHandler(error, request, response, next) {
  return response.status(error.status || 500).json({
    error: {
      messege: error.messege || "Oops! Something went horribly wrong. Clean up on isle 404!"
    }
  });
}

module.exports = errorHandler;