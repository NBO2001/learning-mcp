"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mcp_js_1 = require("@modelcontextprotocol/sdk/server/mcp.js");
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const prompts_1 = require("./modules/prompts");
const tools_1 = require("./modules/tools");
const transports_1 = require("./modules/transports");
dotenv_1.default.config();
const server = new mcp_js_1.McpServer({
    name: "mcp-server",
    version: "1.0.0",
});
// Register tools and prompts
(0, tools_1.registerTools)(server);
(0, prompts_1.registerPrompts)(server);
const app = (0, express_1.default)();
// Setup endpoints
(0, transports_1.setupSSEEndpoint)(server, app);
(0, transports_1.setupMessageEndpoint)(app);
const port = parseInt(process.env.PORT || "4000", 10);
app.listen(port, () => {
    console.log(`MCP server is running on port ${port}`);
});
