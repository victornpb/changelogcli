const fs = require('fs');
const path = require('path');

const changelogParse = require('../utils/changelogParse');
const javaProps = require('../utils/javaProps');

// PARAMETERS
const WORKSPACE = process.env.WORKSPACE || '.';
const CHANGELOG_FILE = process.env.CHANGELOG_FILE || 'CHANGELOG.md';
const OUTPUT_FILE = process.env.OUTPUT_FILE || '.output';

module.exports = async function (options) {
    
    const cwd = process.cwd();

    const str = fs.readFileSync(path.join(cwd, CHANGELOG_FILE), 'utf8');
    const parsedArray = changelogParse(str);

    const result = parsedArray[0];
    
    let output;
    if (options.format === 'json') {
        output = JSON.stringify(result, null, 4);
    }
    else if (options.format === 'props') {
        output = javaProps({
            CHANGELOG_VERSION: result.version,
            CHANGELOG_DATE: result.date,
            CHANGELOG_TEXT: result.text,
            CHANGELOG: result.raw,
            // LAST_CHANGELOG_DISCORD: discordifyChangelog(result.raw),
        });
    }
    else {
        output = result.raw;
    }

    if (!options.output) {
        console.log(output);
    } else {
        fs.writeFileSync(options.output, output, 'utf8');
    }

    
};