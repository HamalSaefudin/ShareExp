const { specialityService } = require('.');
const { Series } = require('../models');

const createSeries = (payload) => Series.create(payload);

const getSeriesBySpeciality = async (specialityName) => {
    const series = await specialityService.getSeriesFromSpeciality(specialityName);
    return series;
};

const getSpesificSeries = async (seriesName) => {
    const series = await Series.find({ seriesName });
    return series;
};

module.exports = {
    createSeries,
    getSeriesBySpeciality,
    getSpesificSeries,
};
