const https = require('https');

const getRepos = (userName, callback) => {
  console.log(userName);
  const options = {
    hostname: 'api.github.com',
    path: `/users/blackmiaool/repos`,
    headers: {
      'User-Agent': 'codedoje'
    }
  };

  https.get(options, res => {
    console.log(res.statusCode, res.statusMessage);
  });
};

module.exports = { getRepos };
