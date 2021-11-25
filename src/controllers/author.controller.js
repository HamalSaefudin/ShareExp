const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const authorService = require('../services/author.service');

const createAuthor = catchAsync(async (req, res) => {
    const author = await authorService.createAuthor(req.body);
    res.status(httpStatus.CREATED).json(author);
});

const getAuthor = catchAsync(async (req, res) => {
    const authors = await authorService.getAuthors(req.params.filter, req.params.options);
    res.json(authors);
});

module.exports = {
    createAuthor,
    getAuthor,
};
