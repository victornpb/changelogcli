const fs = require('fs');
const path = require('path');

const changelogParse = require('../utils/changelogParse');


// PARAMETERS
const WORKSPACE = process.env.WORKSPACE || '.';
const CHANGELOG_FILE = process.env.CHANGELOG_FILE || 'CHANGELOG.md';
const OUTPUT_FILE = process.env.OUTPUT_FILE || '.output';

module.exports = async function parseCmd(options) {
    
    const cwd = process.cwd();

    const str = fs.readFileSync(path.join(cwd, CHANGELOG_FILE), 'utf8');
    const parsedArray = changelogParse(str);
    console.log(parsedArray);

    // writePropsFile({
    //     LAST_CHANGELOG_VERSION: lastChangelog.version,
    //     LAST_CHANGELOG_DATE: lastChangelog.date,
    //     LAST_CHANGELOG_TEXT: lastChangelog.text,
    //     LAST_CHANGELOG: lastChangelog.raw,
    //     LAST_CHANGELOG_DISCORD: discordifyChangelog(lastChangelog.raw),
    //     N: '\n',
    // }, path.join(WORKSPACE, OUTPUT_FILE));
    
};