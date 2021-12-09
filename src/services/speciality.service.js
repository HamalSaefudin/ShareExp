const { Speciality } = require('../models');

const createSpeciality = (payload) => Speciality.create(payload);

const getSeriesFromSpeciality = async (specialityName) => {
    const seriesItem = await Speciality.find({ specialityName });
    return seriesItem;
};

module.exports = {
    createSpeciality,
    getSeriesFromSpeciality,
};
