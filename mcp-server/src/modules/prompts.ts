import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import z from "zod";

export const registerPrompts = (server: McpServer) => {
  // Simple prompt without arguments to avoid Zod schema issues
  server.prompt(
    "echo",
    "A simple prompt that returns a predefined message.",
    {
      message: z.string()
    },
    async ({message}) => {
      return {
        messages: [{
          role: "user",
          content: {
            type: "text",
            text: `Please process this default message from the echo prompt: ${message}`
          }
        }]
      };
    }
  );
};
