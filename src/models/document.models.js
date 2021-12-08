const mongoose = require('mongoose');
const toJson = require('./plugin/toJson.plugin');

const documentSchema = mongoose.Schema({
    ownerId: {
        type: String,
        required: true,
    },
    documentCode: {
        type: String,
        required: true,
        enum: ['PhotoProfile', 'Thumbnile'],
    },
    fileName: {
        type: String,
        required: true,
    },
    fileSize: {
        type: String,
        required: true,
    },
    fileType: {
        type: String,
        required: true,
    },
    file: {
        type: String,
        required: true,
    },
});

documentSchema.plugin(toJson);

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;
