"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerPrompts = void 0;
const registerPrompts = (server) => {
    // Simple prompt without arguments to avoid Zod schema issues
    server.prompt("echo", "A simple prompt that returns a predefined message.", async (_extra) => {
        return {
            messages: [{
                    role: "user",
                    content: {
                        type: "text",
                        text: "Please process this default message from the echo prompt."
                    }
                }]
        };
    });
};
exports.registerPrompts = registerPrompts;
