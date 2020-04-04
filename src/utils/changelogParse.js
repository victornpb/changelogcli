function parse(changelogmdStr) {
    let versions;
    let changelogmd = changelogmdStr;
    try {

        // remove everything before "[Relased - MASTER]"
        changelogmd = changelogmd.replace(/^[\s\S]*# \[Released - MASTER\]/i, '');

        // remove everything after "<!-- END -->"
        changelogmd = changelogmd.replace(/<!-- *END *-->[\s\S]*/i, '');
    
        versions = [{ text: [] }];
    
        // "## [1.2.3] - 1999-12-31"
        const VERSION_HEADING_RE = /^## \[([\d.]+)\] - (\d{4}-\d{2}-\d{2}) *$/;
        // parse file line by line
        changelogmd.split(/\n/).forEach(line => {
            const m = line.match(VERSION_HEADING_RE);
            if (m) {
                // begin new section
                versions.push({
                    head: m[0],
                    version: m[1],
                    date: m[2],
                    text: [],
                });
            } else {
                // append following lines to the last section
                versions[versions.length - 1].text.push(line);
            }
        });

        versions = versions.filter(section => section.version);
        versions.forEach(ver => ver.raw = ver.head + '\n' + ver.text.join('\n')); // create raw text
    
    } catch (err) {
        console.error('Something went wrong while parsing CHANGELOG.MD !\n', err);
    }

    return versions;
}

module.exports = parse;