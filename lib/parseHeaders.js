/*
 *   Copyright (c) 2021 Brainstorm4266
 *   All rights reserved.

 *   Permission is hereby granted, free of charge, to any person obtaining a copy
 *   of this software and associated documentation files (the "Software"), to deal
 *   in the Software without restriction, including without limitation the rights
 *   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *   copies of the Software, and to permit persons to whom the Software is
 *   furnished to do so, subject to the following conditions:
 
 *   The above copyright notice and this permission notice shall be included in all
 *   copies or substantial portions of the Software.
 
 *   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *   SOFTWARE.
 */

const {STRINGS} = require('./constants');
const {CLRF, SEPARATOR} = STRINGS;

module.exports = function parseHeaders(data) {
    //TODO make secure
    const dataString = data.toString();
    const [headers, body] = dataString.split(CLRF + CLRF + CLRF);
    const headerRows = headers.split(CLRF);
    const headerObject = {};
    for (let i = 0; i < headerRows.length; i++) {
        const headerRow = headerRows[i];
        if (i === 0) {   //first row contain method, path and type
            // const [method, path, version] = headerRow.split(BLANK);
            // headerObject.method = method;
            // headerObject.path = path;
            // headerObject.version = version;
        }
        else {
            const [attribute, value] = headerRow.split(SEPARATOR);
            if (attribute && value) {
                const lowerAttribute = attribute.trim().toLowerCase();
                headerObject[lowerAttribute] = value.trim();
            }
        }
    }
    return headerObject;
};
