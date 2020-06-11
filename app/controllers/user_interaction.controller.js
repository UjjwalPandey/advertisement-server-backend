const UserInteraction = require('../models/user_interactions.model.js');

// Record a new UserInteraction
exports.recordingUserInteractions = (req, res) => {
    // Validate request

    if (!req.body) {
        return res.status(400).send({
            message: "UserInteraction content can not be empty"
        });
    }

    // Recording UserInteraction
    const interaction = new UserInteraction({
        user_id: req.body.user_id || 0,
        advertisement_id: req.body.advertisement_id || 0,
        action_type: req.body.action_type || "click"
    });

    // Save UserInteraction in the database
    interaction.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while recording the UserInteraction."
            });
        });
};