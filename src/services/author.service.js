const { Author } = require('../models');

const createAuthor = (authorPayload) => Author.create(authorPayload);

const getAuthors = async (filter, options) => {
    const authors = await Author.paginate(filter, options);
    return authors;
};

const getAuthorById = async (authorId) => {
    const author = Author.findById(authorId);
    return author;
};

const getMostLikeAuthor = () => {

};

module.exports = {
    createAuthor,
    getAuthors,
};
