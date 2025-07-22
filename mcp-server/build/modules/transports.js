"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupMessageEndpoint = exports.setupSSEEndpoint = void 0;
const sse_js_1 = require("@modelcontextprotocol/sdk/server/sse.js");
const transports = {};
const setupSSEEndpoint = (mcpServer, app) => {
    app.get('/sse', async (_, res) => {
        const transport = new sse_js_1.SSEServerTransport("/messages", res);
        transports[transport.sessionId] = transport;
        console.log(`New SSE connection established with session ID: ${transport.sessionId}`);
        res.on('close', () => {
            console.log(`SSE connection closed for session ID: ${transport.sessionId}`);
            delete transports[transport.sessionId];
        });
        try {
            await mcpServer.connect(transport);
            console.log(`SSE connection established for session ID: ${transport.sessionId}`);
        }
        catch (error) {
            console.error(`Error establishing SSE connection for session ID: ${transport.sessionId}`, error);
            res.status(500).end();
        }
    });
};
exports.setupSSEEndpoint = setupSSEEndpoint;
const setupMessageEndpoint = (mcpServer, app) => {
    app.post('/messages', async (req, res) => {
        const sessionId = req.query.sessionId;
        const transport = transports[sessionId] ?? Object.values(transports)[0];
        try {
            if (!transport) {
                console.error(`No transport found for session ID: ${sessionId}`);
                return res.status(404).send('Transport not found');
            }
            await transport.handlePostMessage(req, res);
        }
        catch (error) {
            console.error(`Error processing message:`, error);
            res.status(500).send('Error processing message');
        }
    });
};
exports.setupMessageEndpoint = setupMessageEndpoint;
