module.exports = (app) => {
    const user_interaction = require('../controllers/user_interaction.controller.js');
    const show_advertisement = require('../controllers/show_advertisement.controller.js');
    const users = require('../controllers/users.controller.js');
    const cache = require('../../config/memCache.config.js');

    // Get list of advertisements for the given user.
    // Caching for 1 minute.
    app.post('/api/getAdvertisementList', cache.cacheMiddleware(60), show_advertisement.getAdvertisementList);

    // Record User Action
    app.post('/api/recordUserInteraction', user_interaction.recordingUserInteractions);

    // Update a User with user_id
    app.put('/api/updateUser', cache.updateCache, users.updateUser);
}