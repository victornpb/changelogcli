const fs = require('fs');
const path = require('path');

module.exports = async function () {
    const cwd = process.cwd();

    const template = '# Changelog\n\n';
    
    const filePath = path.join(cwd, 'CHANGELOG.md')
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, template, 'utf8');
        console.log('Created!');
    }
    else {
        console.error(`A file already exist!`);
        return 1;
    }
};