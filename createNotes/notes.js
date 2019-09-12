const fs = require('fs');
const args = process.argv;
const fileName = 'notesList.json';

const errorChecking = err => {
  if (err) {
    console.log('---------Error!!!---------');
  } else {
    console.log('Note has been created.');
  }
};

const write = (title, content) => {
  if (!fs.existsSync('notesList.json')) {
    fs.writeFile(
      fileName,
      JSON.stringify([
        {
          title,
          content
        }
      ]),
      'utf8',
      errorChecking
    );
  } else {
    fs.readFile(fileName, (err, data) => {
      if (err) {
        console.log('---------Error!!!---------');
      } else {
        const currentData = JSON.parse(data);
        const newData = currentData.concat({
          title,
          content
        });

        fs.writeFile(fileName, JSON.stringify(newData), 'utf8', errorChecking);
      }
    });
  }
};

const createNotesList = () => {
  fs.readFile(fileName, (err, data) => {
    if (err) {
      console.log('---------Error!!!---------');
    } else {
      const currentData = JSON.parse(data);
      currentData.forEach((element, id) => {
        console.log(`${id + 1}. ${element.title}`);
      });
    }
  });
};

const showNote = name => {
  fs.readFile(fileName, (err, data) => {
    if (err) {
      console.log('---------Error!!!---------');
    } else {
      const currentData = JSON.parse(data);
      const foundValue = currentData.find(elem => elem.title === name);

      if (!foundValue) {
        return console.log("This note isn't exist");
      }

      console.log(`# ${name}\n\n`);
      console.log(foundValue.content);
    }
  });
};

const removeNote = name => {
  fs.readFile(fileName, (err, data) => {
    if (err) {
      console.log('---------Error!!!---------');
    } else {
      const currentData = JSON.parse(data);
      const valueIndex = currentData.findIndex(elem => elem.title === name);

      if (valueIndex === -1) {
        console.log("A note with this name isn't exist.");
      } else {
        const newData = currentData.filter(note => note.title !== name);

        fs.writeFile(fileName, JSON.stringify(newData), 'utf8', err => {
          if (err) {
            console.log('---------Error!!!---------');
          } else {
            console.log(`File with name "${name}" has been deleted.`);
          }
        });
      }
    }
  });
};

switch (args[2]) {
  case 'create':
    write(args[3], args[4]);
    break;
  case 'list':
    createNotesList();
    break;
  case 'view':
    showNote(args[3]);
    break;
  case 'remove':
    removeNote(args[3]);
    break;
  default:
    console.log("This command isn't exist");
    break;
}
