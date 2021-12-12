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
const {BLANK, CLRF, SEPARATOR} = STRINGS;
const DOUBLE_CLRF = CLRF + CLRF;

/**
 *
 * @param {Object} headersObject
 * @param {buffer} dataBuffer
 * @returns {buffer}
 */
module.exports = function rebuildHeaders(headersObject, dataBuffer) {
    const dataString = dataBuffer.toString();
    const [headers, body] = dataString.split(DOUBLE_CLRF + CLRF, 2);
    const firstRow = headers.split(CLRF, 1)[0];

    let newData = firstRow + CLRF;

    for (const key of Object.keys(headersObject)) {
        const value = headersObject[key];
        newData += key + SEPARATOR + BLANK + value + CLRF;
    }

    newData += DOUBLE_CLRF + (body || '');

    return Buffer.from(newData);
};
