const mongoose = require('mongoose');

const User = mongoose.Schema({
    user_id: Number,
    gender: String,
    location: String,
    interest: String
}, {
    timestamps: true
}, {
    versionKey: false
});

module.exports = mongoose.model('user', User);