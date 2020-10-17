const bcryptjs = require('bcryptjs');

async function main() {
  const password = 'qwerty';
  // const passwordHash = await bcryptjs.hash(password, 10);
  
  const salt = await bcryptjs.genSalt(10);
  const passwordHash = await bcryptjs.hash(password, '$2a$10$q5QL5B6/bHMGl1/qqdbbxe');  
  // console.log(passwordHash);

  const isValid = await bcryptjs.compare('qwerty', passwordHash);
  console.log(isValid);
}
main();
