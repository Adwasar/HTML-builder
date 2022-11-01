const fs = require('fs');

fs.readFile('01-read-file/text.txt', 'utf-8', function(err, data) {
  if (err) throw err;
  console.log(data);
});

