const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const authorService = require('../services/author.service');
const pick = require('../utils/pick');

const createAuthor = catchAsync(async (req, res) => {
    const author = await authorService.createAuthor(req.body);
    res.status(httpStatus.CREATED).json(author);
});

const getAuthor = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['name', 'role']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const authors = await authorService.getAuthors(filter, options);
    res.json(authors);
});

module.exports = {
    createAuthor,
    getAuthor,
};
