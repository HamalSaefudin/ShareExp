const mongoose = require('mongoose');
const paginate = require('./plugin/paginate.plugin');
const toJson = require('./plugin/toJson.plugin');

const ObjectId = mongoose.Schema;

const authorSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    socialMedia: [{
        type: Object,
    }],
    description: {
        type: String,
        required: true,
    },
    articel: [{
        type: ObjectId,
        ref: 'Article',
    }],
});

authorSchema.plugin(toJson);
authorSchema.plugin(paginate);

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;
