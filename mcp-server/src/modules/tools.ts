import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import z from "zod";

export const registerTools = (mcpServer: McpServer) => {
    mcpServer.tool(
        "math-tool",
        "Perform basic math operations",
        {
            operation: z.enum(["add", "subtract", "multiply", "divide"]),
            num1: z.number().default(0),
            num2: z.number().default(0),
        },
        async ( { operation, num1, num2 } ) => {
            
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
                content: [
                    { 
                        type: "text", 
                        text: `Result: ${result}` 
                    }
                ],
            };
        }
    )
}
