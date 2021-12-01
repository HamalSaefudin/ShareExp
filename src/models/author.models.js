const mongoose = require('mongoose');
const paginate = require('./plugin/paginate.plugin');
const toJson = require('./plugin/toJson.plugin');

const { ObjectId } = mongoose.Schema;

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
    article: [{
        type: ObjectId,
        ref: 'Article',
    }],
    like: {
        type: Number,
        default: 0,
    },
});

authorSchema.plugin(toJson);
authorSchema.plugin(paginate);

authorSchema.static.giveLike = () => {
    this.like += 1;
};

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;
