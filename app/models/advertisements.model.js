const mongoose = require('mongoose');

const Advertisement = mongoose.Schema({
    ad_id: Number,
    banner_filePath: String,
    category: String,
    target_location: String,
    target_gender: String,
    external_websiteS: String
}, {
    timestamps: true
}, {
    versionKey: false
});

module.exports = mongoose.model('advertisement', Advertisement);