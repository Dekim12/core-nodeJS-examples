const fs = require('fs');
const github = require('./github');

const gitName = process.argv[2];

const findRepositories = name => {
  if (!gitName) {
    return process.stdout.write('\nPlease, write an user git name\n\n');
  }

  github.getRepos(name, (error, repos) => {
    if (error) {
      return process.stdout.write(
        '\n----Error!!!----' + error.message + '\n\n'
      );
    }

    process.stdout.write(`\n`);
    repos.forEach(repo => process.stdout.write(`${repo.name}\n`));
    process.stdout.write(`\n`);
  });
};

findRepositories(gitName);
