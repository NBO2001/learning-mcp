import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
export const registerTools = (mcpServer: McpServer) => {
    mcpServer.tool(
        "math-tool",
        {
            inputSchema: {
                type: "object",
                properties: {
                num1: { type: "number" },
                num2: { type: "number" }
                },
                required: ["num1", "num2"]
            }
        },
        async ( args ) => {
            const { operation, num1, num2 } = args;
            console.log(`Received operation: ${args}`);
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
