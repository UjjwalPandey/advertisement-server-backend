const mongoose = require('mongoose');

const UserInteraction = mongoose.Schema({
    user_id: Number,
    advertisement_id: Number,
    action_type: String
}, {
    timestamps: true
}, {
    versionKey: false
});

module.exports = mongoose.model('user_interaction', UserInteraction);