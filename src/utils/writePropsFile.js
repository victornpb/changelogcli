const fs = require('fs');
function writePropsFile(obj, file) {
    const text = Object.keys(obj).map(key => key + '=' + String(obj[key]).replace(/\\/g, '\\\\').replace(/\n/g, '\\n')).join('\n');
    console.log(`FILE: ${file}\n----BEGIN----\n${text}\n----END----`);
    return fs.writeFileSync(file, text, 'utf8');
}

module.exports = writePropsFile;