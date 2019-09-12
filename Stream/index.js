const fs = require('fs');
const zlib = require('zlib');

const readStream = fs.createReadStream('lincoln.txt', 'utf-8');
const outputStream = fs.createWriteStream('lincolnReverse.txt.gz');
const gzip = zlib.createGzip();

// stream.on('data', part =>
//   outputStream.write(
//     part
//       .split('')
//       .reverse()
//       .join('')
//   )
// );

// readStream.pipe(outputStream);

readStream.pipe(gzip).pipe(outputStream);

readStream.once('end', () => console.log('End'));
readStream.on('error', error => console.log('Error', error.message));
