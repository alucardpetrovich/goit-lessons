
// console.log(require);
// process.stdout.write('test');
const stdin = process.openStdin();
stdin.on('message', (msg) => {
    console.log(msg.toString());
});
