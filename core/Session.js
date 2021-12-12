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

const tls = require('tls');
const {EVENTS, DEFAULT_KEYS} = require('../lib/constants');
const {CLOSE, DATA, ERROR} = EVENTS;

/**
 *
 * @param {net.Socket} socket
 * @param data
 */
function socketWrite(socket, data) {
    if (socket && !socket.destroyed && data) {
        socket.write(data);
    }
}

/**
 *
 * @param {net.Socket} socket
 */
function socketDestroy(socket) {
    if (socket && !socket.destroyed) {
        socket.destroy();
    }
}

class Session extends Object {
    /**
     *
     * @param id
     */
    constructor(id) {
        super();

        this._id = id;
        this._src = null;
        this._dst = null;
        this._tunnel = {};
        this.user = null;
        this.authenticated = false;
        this.isHttps = false;
    }

    /**
     * @param {buffer|string} data - The data to send.
     * @returns {Session}
     */
    clientRequestWrite(data) {
        socketWrite(this._dst, data);
        return this;
    }

    /**
     * @param {buffer|string} data - The data to send.
     * @returns {Session}
     */
    clientResponseWrite(data) {
        socketWrite(this._src, data);
        return this;
    }

    /**
     * Destroy existing sockets for this Session-Instance
     * @returns {Session}
     */
    destroy() {
        if (this._dst) {
            socketDestroy(this._dst);
        }
        if (this._src) {
            socketDestroy(this._src);
        }
        return this;
    }

    /**
     * Is Session authenticated by user
     * @returns {boolean}
     */
    isAuthenticated() {
        return this.authenticated;
    }

    /**
     * Set the socket that will receive response
     * @param {net.Socket} socket
     * @returns {Session}
     */
    setResponseSocket(socket) {
        this._src = socket;
        return this;
    }

    /**
     * Set the socket that will receive request
     * @param {net.Socket} socket
     * @returns {Session}
     */
    setRequestSocket(socket) {
        this._dst = socket;
        return this;
    }

    /**
     * Get own id
     * @returns {string}
     */
    getId() {
        return this._id;
    }

    /**
     * @param {string} username
     * @returns {Session}
     */
    setUserAuthentication(username) {
        if (username) {
            this.authenticated = true;
            this.user = username;
        }
        return this;
    }

    /**
     * @param {object} options
     * @returns {Session}
     */
    setTunnelOpt(options) {
        if (options) {
            const {host, port, upstream} = options;
            this._tunnel.ADDRESS = host;
            this._tunnel.PORT = port;
            if (!!upstream) {
                this._tunnel.UPSTREAM = upstream;
            }
        }
        return this;
    }

    /**
     * @param {object} callbacksObject
     * @param {object} KEYS - {key:{string},cert:{string}}
     * @returns {Session}
     * @private
     */
    _updateSockets(callbacksObject, KEYS = DEFAULT_KEYS) {
        const {onDataFromClient, onDataFromUpstream, onClose} = callbacksObject;
        KEYS = KEYS || DEFAULT_KEYS;

        if (!this._updated) {
            this.setResponseSocket(new tls.TLSSocket(this._src, {
                    rejectUnauthorized: false,
                    requestCert: false,
                    isServer: true,
                    key: KEYS.key,
                    cert: KEYS.cert
                })
                    .on(DATA, onDataFromClient)
                    .on(CLOSE, onClose)
                    .on(ERROR, onClose)
            );

            this.setRequestSocket(new tls.TLSSocket(this._dst, {
                    rejectUnauthorized: false,
                    requestCert: false,
                    isServer: false
                })
                    .on(DATA, onDataFromUpstream)
                    .on(CLOSE, onClose)
                    .on(ERROR, onClose)
            );
            this._updated = true;
        }
        return this;
    }

    /**
     * Get Stats for this tunnel
     * @returns {object} - {ADDRESS:'String', PORT:Number, UPSTREAM:{ADDRESS,PORT}}
     */
    getTunnelStats() {
        return this._tunnel;
    }
}

module.exports = Session;
