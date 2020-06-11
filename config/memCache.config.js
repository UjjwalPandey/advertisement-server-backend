const cache = require('memory-cache');

let memCache = new cache.Cache();
exports.cacheMiddleware = (duration) => {
    return (req, res, next) => {
        let key = req.body.user_id || "Guest"
        console.log("Caching Key " + key)
        let cacheContent = memCache.get(key);
        if (cacheContent) {
            console.log("Key already cached")
            res.send(cacheContent);
            return
        } else {
            console.log("Key NOT cached")
            res.sendResponse = res.send
            res.send = (body) => {
                memCache.put(key, body, duration * 1000);
                res.sendResponse(body)
            }
            next()
        }
    }
}


exports.updateCache = (req, res, next) => {
    console.log(req.body)
    let key = req.body.user_id
    let cacheContent = memCache.get(key);
    if (cacheContent) {
        console.log("Removing Key " + key + " from the Cache.")
        memCache.del(key);
    }
    console.log(memCache.get(key))
    next()
}