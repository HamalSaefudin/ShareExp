const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const { authorService } = require('../services');

const createAuthor = catchAsync(async (req, res) => {
    const author = await authorService.createAuthor(req.body);
    res.status(httpStatus.CREATED).json(author);
});

const getAuthors = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['name', 'speciality']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const authors = await authorService.getAuthors(filter, options);
    res.json(authors);
});

const getAuthor = catchAsync(async (req, res) => {
    const author = await authorService.getAuthorById(req.params.authorId);
    if (!author) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Author Not Found');
    }
    res.send(author);
});

const updateAuthor = catchAsync(async (req, res) => {
    const author = await authorService.updateAuthorById(req.params.id, req.body);
    res.send(author);
});

const deleteAuthor = catchAsync(async (req, res) => {
    await authorService.deleteAuthor(req.params.id);
    res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
    createAuthor,
    getAuthors,
    getAuthor,
    updateAuthor,
    deleteAuthor,
};
