const url = require('url');

const getMovie = require('../movieApi/omdb');
const renderMethod = require('../lib/render');
const notFound = require('./notFound.js');

const search = (req, res) => {
  const movieTitleFromRequestURL = url.parse(req.url, true);
  const movieTitle = movieTitleFromRequestURL.query.title;

  getMovie(movieTitle, (err, movieData) => {
    if (err) {
      return notFound(req, res);
    }

    return renderMethod(res, movieData);
  });
};

module.exports = search;
