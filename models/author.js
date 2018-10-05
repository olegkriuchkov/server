var mongoose = require("mongoose");

var authorSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        firstname: {
            type: String,
            required: true
        },
        lastname: String
    },
    biography: String,
    twitter: {
        type: String,
        // validate: {
        //     validator: function(text) {
        //         return text.indexOf('https://twitter.com/') === 0;
        //     },
        //     message: 'Twitter handle must start with https://twitter.com/'
        // },
        // default: 'https://twitter.com/'
    },
    facebook: {
        type: String,
        // validate: {
        //     validator: function(text) {
        //         return text.indexOf('https://www.facebook.com/') === 0;
        //     },
        //     message: 'Facebook must start with https://www.facebook.com/'
        // },
        // default: 'https://www.facebook.com/'
    },
    linkedin: {
        type: String,
        // validate: {
        //     validator: function(text) {
        //         return text.indexOf('https://www.linkedin.com/') === 0;
        //     },
        //     message: 'LinkedIn must start with https://www.linkedin.com/'
        // },
        // default: 'https://linkedin.com/'
    },
    profilePicture: Buffer,
    created: {
        type: Date,
        default: Date.now
    }
});

var Author = mongoose.model('Author', authorSchema);

module.exports = Author;