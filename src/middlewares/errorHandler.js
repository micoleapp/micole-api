const httpErrors = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  500: 'Internal Server Error',
};

const HTTPErrorStatus = (errorCode) => (typeof errorCode === 'number' && Object.keys(httpErrors).indexOf(`${errorCode}`) >= 0);

const validateError = (err, req, res, next) => {
  const statusCode = (HTTPErrorStatus(err))
    ? err
    : err.statusCode || 500;
  const message = err.message || httpErrors[statusCode] || err;

  if (statusCode === 500) {
    console.error(statusCode, message);
  }

  res.status(statusCode).json({ error: message });
  next();
};

module.exports = validateError;
