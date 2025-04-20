const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 3600 }); // Cache valid for 1 hour

const cacheMiddleware = (req, res, next) => {
    const key = req.originalUrl;

    const cachedData = cache.get(key);
    if (cachedData) {
        return res.status(200).json(cachedData);
    }

    res.sendResponse = res.json;
    res.json = (body) => {
        cache.set(key, body);
        res.sendResponse(body);
    };

    next();
};

module.exports = { cacheMiddleware };
