const http = require('http');

const fakeValue = {
  Title: 'Naruto',
  Year: '2002–2007',
  Rated: 'TV-PG',
  Released: '10 Sep 2005',
  Runtime: '24 min',
  Genre: 'Animation, Action, Adventure, Comedy, Fantasy, Thriller',
  Director: 'N/A',
  Writer: 'Masashi Kishimoto',
  Actors: 'Junko Takeuchi, Maile Flanagan, Kate Higgins, Chie Nakamura',
  Plot:
    "Naruto Uzumaki, an adolescent ninja, struggles as he searches for recognition and dreams of becoming the Hokage, the village's leader and strongest ninja.",
  Language: 'Japanese',
  Country: 'Japan',
  Awards: 'N/A',
  Poster:
    'https://m.media-amazon.com/images/M/MV5BZmQ5NGFiNWEtMmMyMC00MDdiLTg4YjktOGY5Yzc2MDUxMTE1XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg',
  Ratings: [{ Source: 'Internet Movie Database', Value: '8.3/10' }],
  Metascore: 'N/A',
  imdbRating: '8.3',
  imdbVotes: '57,346',
  imdbID: 'tt0409591',
  Type: 'series',
  totalSeasons: '1',
  Response: 'True'
};

const getMovie = (title, done) => {
  // const request = http.get(`http://www.omdbapi.com/?t=${title}`, res => {
  //   if (res.statusCode !== 200) {
  //     done(new Error(`New Error: ${res.statusMessage} (${res.statusCode})`));
  //     res.resume();

  //     return;
  //   }

  //   res.setEncoding('utf-8');
  //   let body = '';

  //   res.on('data', data => (body += data));
  //   res.on('end', () => {
  //     let result;

  //     try {
  //       result = JSON.parse(body);
  //     } catch (error) {
  //       done(error);
  //     }

  //     done(null, result);
  //   });
  // });

  done(null, fakeValue);

  // request.on('error', err => {
  //   done(err);
  // });
};

module.exports = getMovie;
