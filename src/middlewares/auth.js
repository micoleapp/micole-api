const { Auth } = require('../db');
const jwt = require('jsonwebtoken');

const verifyToken = (token, secret) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        reject(err);
      } else {
        resolve(decodedToken);
      }
    });
  });
};

const authenticate = (secret) => async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next();
  }

  const [type, token] = authorization.split(' '); // "Bearer 15f6sa1f651asf651asf5"
  if (type.toLowerCase() !== 'bearer') {
    return next();
  }

  try {
    const decodedToken = await verifyToken(token, secret);
    const ifUserExists = await Auth.findByPk(decodedToken.uid);
    if (!ifUserExists) {
      return next({
        statusCode: 404,
        message: 'El token brindado no es de un usuario registrado',
      });
    }
    req.user = ifUserExists;
    return next();
  } catch (err) {
    return next({
      statusCode: 403,
      message: 'Token Inválido o Vencido',
    });
  }
};

const isAuthenticated = (req) => !!req.user;
const isAdmin = (req) => req.user && req.user.rol === 'Admin';

const requireAuth = (req, res, next) =>
  !isAuthenticated(req)
    ? next({
        statusCode: 401,
        message: 'Necesitas estar Autentificado.',
      })
    : next();

const requireAdmin = (req, res, next) =>
  !isAuthenticated(req)
    ? next({
        statusCode: 401,
        message: 'Necesitas estar Autentificado.',
      })
    : !isAdmin(req)
    ? next({
        statusCode: 401,
        message: 'Necesitas permisos de Administrador.',
      })
    : next();

module.exports = {
  authenticate,
  requireAuth,
  requireAdmin,
};
