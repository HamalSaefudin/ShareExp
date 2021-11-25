const mongoose = require('mongoose');
const toJson = require('./plugin/toJson.plugin');

const { ObjectId } = mongoose.Schema;

const articleSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: ObjectId,
        ref: 'Author',
        required: true,
    },
    topic: {
        type: String,
        required: true,
    },
    categories: [{
        type: String,
    }],
});

articleSchema.plugin(toJson);

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
