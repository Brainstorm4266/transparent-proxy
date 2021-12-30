const {STRINGS} = require('./constants');
const {BLANK, CLRF: CLEF, SEPARATOR} = STRINGS;
const DOUBLE_CLRF = CLEF + CLEF;

/**
 *
 * @param {Object} headersObject
 * @param {buffer} dataBuffer
 * @returns {buffer}
 */
module.exports = function rebuildHeaders(headersObject, dataBuffer) {
    const dataString = dataBuffer.toString();
    const [headers, body] = dataString.split(DOUBLE_CLRF + CLEF, 2);
    const firstRow = headers.split(CLEF, 1)[0];

    let newData = firstRow + CLEF;

    for (const key of Object.keys(headersObject)) {
        const value = headersObject[key];
        newData += key + SEPARATOR + BLANK + value + CLEF;
    }

    newData += DOUBLE_CLRF + (body || '');

    return Buffer.from(newData);
};
