const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const dirPath = path.dirname(process.mainModule.filename);

function RandomizePath(documentName) {
    const int1 = randomNumber(1, 24);
    const int2 = randomNumber(1, 24);

    const deep = `00${int1}\\00${int2}`;
    const filename = `${crypto.randomBytes(8).toString('hex')}.png`;

    if (!fs.existsSync(`${dirPath}\\public\\images\\${documentName}\\${deep}`)) {
        fs.mkdirSync(`${dirPath}\\public\\images\\${documentName}\\00${int1}\\00${int2}`, { recursive: true });
    }

    return {
        fullpath: `public\\images\\${documentName}\\${deep}\\${filename}`,
        shortpath: `${documentName}\\${deep}\\${filename}`,
    };
}

module.exports = RandomizePath;
