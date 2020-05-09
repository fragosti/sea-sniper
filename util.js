const rl = require('readline');
const util = require('util');

const ask = (question, callback) => {
  const r = rl.createInterface({
    input: process.stdin,
    output: process.stdout});
  r.question(question + '\n', function(answer) {
    r.close();
    callback(null, answer);
  });
}

const sleepAsync = (timeMs) => new Promise((resolve, _reject) => {
  setTimeout(resolve, timeMs);
});

module.exports = {
  askAsync: util.promisify(ask),
  sleepAsync,
}

