const fs = require('fs');

fs.writeFile('example.txt', 'This is some example text', (err) => {
  if (err) throw err;
  console.log('File created!');
});
