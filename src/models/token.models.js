const mongoose = require('mongoose');
const toJson = require('./plugin/toJson.plugin');

const { ObjectId } = mongoose.Schema;
const tokenSchema = mongoose.Schema({
    token: {
        type: String,
        required: true,
        index: true,
    },
    user: {
        type: ObjectId,
        required: true,
    },
    expires: {
        type: Date,
        required: true,
    },
}, {
    timestamps: true,
});

tokenSchema.plugin(toJson);

/**
 * @typedef Token
 */

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;
