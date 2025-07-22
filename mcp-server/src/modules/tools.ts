import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import  * as z from "zod";

export const registerTools = (mcpServer: McpServer) => {
    mcpServer.tool(
        "math-tool",
        {
            operation: z.enum(["add", "subtract", "multiply", "divide"]),
            num1: z.number(),
            num2: z.number(),
     },
        async ( args ) => {
            const { operation, num1, num2 } = args;
            console.log(`Received operation: ${JSON.stringify(args)}`);
            let result: number;

            switch (operation) {
                case "add":
                    result = num1 + num2;
                    break;
                case "subtract":
                    result = num1 - num2;
                    break;
                case "multiply":
                    result = num1 * num2;
                    break;
                case "divide":
                    if (num2 === 0) {
                        throw new Error("Cannot divide by zero");
                    }
                    result = num1 / num2;
                    break;
                default:
                    throw new Error("Invalid operation");
            }
            return {
                content: [{ type: "text", text: `Result: ${result}` }],
            };
        }
    )
}
