import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';
import { Request, Response } from 'express';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { Express } from 'express';

const transports: { [sessionId: string]: SSEServerTransport } = {}

export const setupSSEEndpoint = (mcpServer: McpServer, app: Express) => {
    app.get('/sse', async (_: Request, res: Response) => {
        const transport = new SSEServerTransport("/messages", res);
        transports[transport.sessionId] = transport;

        console.log(`New SSE connection established with session ID: ${transport.sessionId}`);

        res.on('close', () => {
            console.log(`SSE connection closed for session ID: ${transport.sessionId}`);
            delete transports[transport.sessionId];
        });

        try{
            await mcpServer.connect(transport);
            console.log(`SSE connection established for session ID: ${transport.sessionId}`);
        } catch (error) {
            console.error(`Error establishing SSE connection for session ID: ${transport.sessionId}`, error);
            res.status(500).end();
        }
    });
};

export const setupMessageEndpoint = (app: Express) => {
    app.post('/messages', async (req: Request, res: Response) => {
        const sessionId = req.query.sessionId as string;
        const transport = transports[sessionId] ?? Object.values(transports)[0];

   

        try {
            
            if (!transport) {
                console.error(`No transport found for session ID: ${sessionId}`);
                return res.status(404).send('Transport not found');
            }

            await transport.handlePostMessage(req, res);
        } catch (error) {
            console.error(`Error processing message:`, error);
            res.status(500).send('Error processing message');
        }
    });
}