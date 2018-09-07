const fs = require('fs');
const readline = require('readline');

const Client = require('../src/Client');


function rlQuestion(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
      rl.close();
    });
  });
}

async function main() {
  const c = new Client();
  const picData = await c.api.getCaptcha();
  const path = `${__dirname}/captcha.jpg`;
  fs.writeFileSync(path, picData);

  const answer = await rlQuestion(
    `请打开${path}
*****************
| 1 | 2 | 3 | 4 |
*****************
| 5 | 6 | 7 | 8 |
*****************
并输入验证码:`,
  );
  const checkResult = await c.api.checkCaptcha(answer.split(','));
  console.log(checkResult);
}

main().catch((e) => {
  console.error(e);
});
