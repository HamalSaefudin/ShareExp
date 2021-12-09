const mongoose = require('mongoose');
const toJson = require('./plugin/toJson.plugin');

const { ObjectId } = mongoose.Schema;

const seriesSchema = mongoose.Schema({
    seriesName: {
        type: String,
        required: true,
    },
    seriesItem: [{
        type: ObjectId,
        ref: 'Series',
    }],
});

seriesSchema.plugin(toJson);

const Article = mongoose.model('Series', seriesSchema);

module.exports = Article;
