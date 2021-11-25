const { Author } = require('../models');

exports.createAuthor = (authorPayload) => Author.create(authorPayload);

exports.getAuthors = async (filter, options) => {
    const authors = await Author.paginate(filter, options);
    return authors;
};
