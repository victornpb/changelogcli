module.exports = function objToPropsList(obj) {
    const text = Object.keys(obj)
        .map(key => key + '=' + String(obj[key])
            .replace(/\\/g, '\\\\')
            .replace(/\n/g, '\\n')).join('\n');
    return text;
};