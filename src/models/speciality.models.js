const mongoose = require('mongoose');
const paginate = require('./plugin/paginate.plugin');
const toJson = require('./plugin/toJson.plugin');

const { ObjectId } = mongoose.Schema;

const specialitySchema = mongoose.Schema({
    specialityName: {
        type: String,
        required: true,
    },
    seriesName: [{
        type: ObjectId,
        ref: 'Series',
    }],
});

specialitySchema.plugin(toJson);
specialitySchema.plugin(paginate);

const Article = mongoose.model('Speciality', specialitySchema);

module.exports = Article;
