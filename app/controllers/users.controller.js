const User = require('../models/users.model.js');

// Update a User identified by the user_id in the request
exports.updateUser = (req, res) => {
    // Validate Request
    if (!req.body.user_id) {
        return res.status(400).send({
            message: "User ID can not be empty"
        });
    }

    var query = { user_id: req.body.user_id };
    var valueUpdate = { $set: req.body };

    // Find User and update it with the request body
    User.updateMany(query, valueUpdate, { upsert: true })
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.body.user_id
                });
            }
            res.send(user);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with id " + req.body.user_id
                });
            }
            return res.status(500).send({
                message: "Error updating User with id " + req.body.user_id
            });
        });
};