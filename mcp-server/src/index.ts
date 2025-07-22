import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import dotenv from "dotenv";
import express from "express";

import { registerPrompts } from "./modules/prompts";
import { registerTools } from "./modules/tools";
import { setupSSEEndpoint, setupMessageEndpoint } from "./modules/transports";

dotenv.config();

const server = new McpServer({
  name: "mcp-server",
  version: "1.0.0",
});

// Register tools and prompts
registerTools(server);
registerPrompts(server);

const app = express();

// Setup endpoints
setupSSEEndpoint(server, app);
setupMessageEndpoint(app);

const port = parseInt(process.env.PORT || "4000", 10);
app.listen(port, () => {
  console.log(`MCP server is running on port ${port}`);
});
