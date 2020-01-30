const fs = require('fs');

// const packageJsonSync = fs.readFileSync('./package.json');
// fs.writeFileSync('./pack.json', 'Hello\n');
// fs.readFile('./pack.json', 'utf8', (err, data) => {
//     if (err) {
//         throw err;
//     }

//     console.log(data);
// });

fs.appendFileSync('./pack.json', 'Hello2', 'utf8');


