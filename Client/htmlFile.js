const fsPromises = require('fs/promises');
const path = require('path');

const filePath = path.resolve(__dirname, 'index.html');

async function loadHomePage() {
  try {
    const htmlContents = await fsPromises.readFile(filePath);
    return htmlContents;
  } catch(error) {
    console.error('ERROR: ', error);
  }
}

module.exports = {
  loadHomePage
};
