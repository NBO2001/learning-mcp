import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { ServerRequest, ServerNotification } from "@modelcontextprotocol/sdk/types.js";
import { RequestHandlerExtra } from "@modelcontextprotocol/sdk/shared/protocol.js";

export const registerPrompts = (server: McpServer) => {
  // Simple prompt without arguments to avoid Zod schema issues
  server.prompt(
    "echo",
    "A simple prompt that returns a predefined message.",
    async (_extra: RequestHandlerExtra<ServerRequest, ServerNotification>) => {
      return {
        messages: [{
          role: "user",
          content: {
            type: "text",
            text: "Please process this default message from the echo prompt."
          }
        }]
      };
    }
  );
};