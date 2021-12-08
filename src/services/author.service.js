const httpStatus = require('http-status');
const { Author } = require('../models');
const ApiError = require('../utils/ApiError');

const createAuthor = (authorPayload) => Author.create(authorPayload);

/**
 *
 * @param {Object} filter
 * @param {Object} options
 * @param {String} [filter.name]
 * @param {String} [filter.speciality]
 * @returns {Promise<QueryResult>}
 */
const getAuthors = async (filter, options) => {
    const authors = await Author.paginate(filter, options);
    return authors;
};

const getAuthorById = async (authorId) => {
    const author = Author.findById(authorId);
    return author;
};

/**
 *
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateAuthorById = async (authorId, updateBody) => {
    const author = await getAuthorById(authorId);
    if (!author) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Author not found');
    }
    Object.assign(author, updateBody);
    await author.save();
    return author;
};

const deleteAuthor = async (id) => {
    const author = await getAuthorById(id);
    if (!author) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Author Not found');
    }
    await author.remove();
};

module.exports = {
    createAuthor,
    getAuthors,
    getAuthorById,
    updateAuthorById,
    deleteAuthor,
};
