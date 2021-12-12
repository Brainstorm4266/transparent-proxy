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

module.exports = {
    DEFAULT_OPTIONS: {
        upstream: false,
        tcpOutgoingAddress: false,
        verbose: false,
        injectData: false,
        injectResponse: false,
        auth: false,
        intercept: false,
        keys: false
    },
    EVENTS: {
        CLOSE: 'close',
        DATA: 'data',
        ERROR: 'error',
        EXIT: 'exit',
    },
    ERROR_CODES: {
        ETIMEDOUT: 'ETIMEDOUT',
        ENOTFOUND: 'ENOTFOUND',
        EPIPE: 'EPIPE',
        EPROTO: 'EPROTO'
    },
    HTTP: 'http',
    HTTPS: 'https',
    HTTP_PORT: 80,
    HTTPS_PORT: 443,
    HTTP_BODIES: {
        AUTH_REQUIRED: 'Proxy Authorization Required!',
        NOT_FOUND: 'Not Found!'
    },
    HTTP_RESPONSES: {
        OK: 'HTTP/1.0 200 OK',
        NOT_FOUND: 'HTTP/1.0 404 Not Found',
        NOT_OK: 'HTTP/1.0 400 Bad Request',
        AUTH_REQUIRED: 'HTTP/1.0 407 Proxy Authorization Required' + '\r\nProxy-Authenticate: Basic realm=""',
        TIMED_OUT: 'HTTP/1.0 408 Request Timeout'
    },
    HTTP_METHODS: {
        CONNECT: 'CONNECT',
        GET: 'GET',
    },
    STRINGS: {
        AT: '@',
        BLANK: ' ',
        CLRF: '\r\n',
        EMPTY: '',
        SEPARATOR: ':',
        PROXY_AUTH: 'Proxy-Authorization',
        PROXY_AUTH_BASIC: 'Basic',

    },
    SLASH: '/',
    SLASH_REGEXP: /\//gmi,
    SLASH_REGEXP_ONCE: /\//g,
    DEFAULT_KEYS: {
        key: '-----BEGIN PRIVATE KEY-----\n' +
            'MIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgFy3kvv0iHTVaeqcv\n' +
            'DIzScropX09AFbieQAy8Dyh8kCihRANCAAQ+UBhyBUy/izj5jozMz+aLpzj7/lPS\n' +
            'jAQbWM+8aSDYmu7Ermo6+qz9PatGixPE1c3cq0E9BSqOEVYMXiVcizeQ\n' +
            '-----END PRIVATE KEY-----',
        cert: '-----BEGIN CERTIFICATE-----\n' +
            'MIIBlTCCATygAwIBAgIUcUDMIG9bw3nWnUS5vwGPIgX3zIcwCgYIKoZIzj0EAwIw\n' +
            'FDESMBAGA1UEAwwJbG9jYWxob3N0MB4XDTIwMDEyMjIzMjIwN1oXDTIxMDEyMTIz\n' +
            'MjIwN1owFDESMBAGA1UEAwwJbG9jYWxob3N0MFkwEwYHKoZIzj0CAQYIKoZIzj0D\n' +
            'AQcDQgAEPlAYcgVMv4s4+Y6MzM/mi6c4+/5T0owEG1jPvGkg2JruxK5qOvqs/T2r\n' +
            'RosTxNXN3KtBPQUqjhFWDF4lXIs3kKNsMGowaAYDVR0RBGEwX4IJbG9jYWxob3N0\n' +
            'ggsqLmxvY2FsaG9zdIIVbG9jYWxob3N0LmxvY2FsZG9tYWluhwR/AAABhwQAAAAA\n' +
            'hxAAAAAAAAAAAAAAAAAAAAABhxAAAAAAAAAAAAAAAAAAAAAAMAoGCCqGSM49BAMC\n' +
            'A0cAMEQCIH/3IPGNTbCQnr1F1x0r28BtwkhMZPLRSlm7p0uXDv9pAiBi4JQKEwlY\n' +
            '6sWzsJyD3vMMAyP9UZm0WJhtcOb6F0wRpg==\n' +
            '-----END CERTIFICATE-----'
    }
};