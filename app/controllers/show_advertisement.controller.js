const User = require('../models/users.model.js');
const Advertisements = require('../models/advertisements.model.js');


// Returns advertisement lists in form of JSON.  
exports.getAdvertisementList = (req, res) => {
    User.find({ user_id: req.body.user_id })
        .then(user => {
            // Taking user details and returning the targeted advertisement list
            Advertisements.find(getQuery(user))
                .then(advertisements => {
                    res.send(advertisements);
                }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while retrieving advertisements."
                    });
                });
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "UserInteraction not found with id " + req.body.user_id
                });
            }
            return res.status(500).send({
                message: "Error retrieving user with id " + req.body.user_id
            });
        });

};

// Location and gender based query. It also includes gender-neutral and global advertisements.
function getQuery(user) {
    // Guest Users: show Global, gender-neutral ads.
    if (!Object.keys(user).length) {
        console.log("Guest User")
        return query = {
            target_location: "Global",
            target_gender: "MF"
        }
    } else {
        // Registered Users
        return query = {
            category: user.map(function(details) { return details.interest; }),
            $and: [
                { $or: [{ target_location: user.map(function(details) { return details.location; }) }, { target_location: "Global" }] },
                { $or: [{ target_gender: user.map(function(details) { return details.gender; }) }, { target_gender: "MF" }] }
            ]
        }
    }

}