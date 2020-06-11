module.exports = (app) => {
    const user_interaction = require('../controllers/user_interaction.controller.js');
    const show_advertisement = require('../controllers/show_advertisement.controller.js');

    // Get list of advertisements for the given user.
    app.post('/api/getAdvertisementList', show_advertisement.getAdvertisementList);

    // Record User Action
    app.post('/api/recordUserInteraction', user_interaction.recordingUserInteractions);
}