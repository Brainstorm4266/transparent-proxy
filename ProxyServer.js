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

const net = require('net');

const onConnectedClientHandling = require('./core/onConnectedClientHandling');
const Logger = require('./lib/Logger');

const {DEFAULT_OPTIONS} = require('./lib/constants');


class ProxyServer extends net.createServer {
    constructor(options) {
        const {
            upstream, tcpOutgoingAddress,
            verbose,
            injectData, injectResponse,
            auth, intercept, keys, onError
        } = {...DEFAULT_OPTIONS, ...options}; //merging with default options
        const logger = new Logger(verbose);
        const bridgedConnections = {};

        super(function (clientSocket) {
            onConnectedClientHandling(
                clientSocket,
                bridgedConnections,
                {
                    upstream, tcpOutgoingAddress,
                    injectData, injectResponse,
                    auth, intercept, keys, onError
                },
                logger)
        });
        this.bridgedConnections = bridgedConnections;
    }

    getBridgedConnections() {
        return this.bridgedConnections;
    };
}

module.exports = ProxyServer;