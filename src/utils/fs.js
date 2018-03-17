const fs = require('fs');
const util = require('util');

const mkdir = util.promisify(fs.mkdir);

module.exports = {
  ensureDir: dir => mkdir(dir).catch(error => {
    if (error.code !== 'EEXIST') {
      throw error;
    }
  }),
  mkdir,
  readFile: util.promisify(fs.readFile),
  unlink: util.promisify(fs.unlink),
  writeFile: util.promisify(fs.writeFile)
};
