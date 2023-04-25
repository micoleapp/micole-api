const cache = require('../helpers/cacheGlobalInstance');

const cacheMiddleware = (req, res, next) => {
  const key = req.originalUrl || req.url;
  console.log(key);
  const cachedResponse = cache.get(key);
  if (cachedResponse) {
    console.log("cache");
    return res.send(cachedResponse);
  }
  next();
};

module.exports = cacheMiddleware;