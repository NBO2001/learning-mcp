"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mcp_js_1 = require("@modelcontextprotocol/sdk/server/mcp.js");
const sse_js_1 = require("@modelcontextprotocol/sdk/server/sse.js");
const zod_1 = require("zod");
const NWS_API_BASE = "https://api.weather.gov";
const USER_AGENT = "weather-app/1.0";
// MCP Server
const server = new mcp_js_1.McpServer({
    name: "weather",
    version: "1.0.0",
    capabilities: { resources: {}, tools: {} },
});
// Fetch helper
async function makeNWSRequest(url) {
    try {
        const response = await fetch(url, {
            headers: {
                "User-Agent": USER_AGENT,
                Accept: "application/geo+json",
            },
        });
        if (!response.ok)
            throw new Error(`HTTP error! ${response.status}`);
        return await response.json();
    }
    catch (error) {
        console.error("NWS request failed:", error);
        return null;
    }
}
// Format alert
function formatAlert(feature) {
    const props = feature.properties;
    return [
        `Event: ${props.event || "Unknown"}`,
        `Area: ${props.areaDesc || "Unknown"}`,
        `Severity: ${props.severity || "Unknown"}`,
        `Status: ${props.status || "Unknown"}`,
        `Headline: ${props.headline || "No headline"}`,
        "---",
    ].join("\n");
}
// Register tools
server.tool("get_alerts", "Get weather alerts for a state", {
    state: zod_1.z.string().length(2).describe("Two-letter state code (e.g. CA, NY)"),
}, async ({ state }) => {
    const url = `${NWS_API_BASE}/alerts?area=${state.toUpperCase()}`;
    const data = await makeNWSRequest(url);
    if (!data)
        return { content: [{ type: "text", text: "Failed to retrieve alerts data" }] };
    const features = data.features || [];
    if (features.length === 0)
        return {
            content: [{ type: "text", text: `No active alerts for ${state.toUpperCase()}` }],
        };
    const alertsText = `Active alerts for ${state.toUpperCase()}:\n\n${features.map(formatAlert).join("\n")}`;
    return { content: [{ type: "text", text: alertsText }] };
});
server.tool("get_forecast", "Get weather forecast for a location", {
    latitude: zod_1.z.number().min(-90).max(90),
    longitude: zod_1.z.number().min(-180).max(180),
}, async ({ latitude, longitude }) => {
    const pointsUrl = `${NWS_API_BASE}/points/${latitude.toFixed(4)},${longitude.toFixed(4)}`;
    const pointsData = await makeNWSRequest(pointsUrl);
    if (!pointsData?.properties?.forecast) {
        return {
            content: [{ type: "text", text: "Failed to retrieve grid point or forecast URL" }],
        };
    }
    const forecastData = await makeNWSRequest(pointsData.properties.forecast);
    if (!forecastData?.properties?.periods?.length) {
        return { content: [{ type: "text", text: "No forecast periods available" }] };
    }
    const formatted = forecastData.properties.periods.map(p => [
        `${p.name || "Unknown"}:`,
        `Temperature: ${p.temperature ?? "Unknown"}°${p.temperatureUnit || "F"}`,
        `Wind: ${p.windSpeed || "Unknown"} ${p.windDirection || ""}`,
        `${p.shortForecast || "No forecast"}`,
        "---",
    ].join("\n"));
    return { content: [{ type: "text", text: `Forecast for ${latitude}, ${longitude}:\n\n${formatted.join("\n")}` }] };
});
// Express + SSE
const app = (0, express_1.default)();
const PORT = 3000;
const transports = {};
app.get("/mcp", (req, res) => {
    const transport = new sse_js_1.SSEServerTransport("/messages", res);
    transports[transport.sessionId] = transport;
    server.connect(transport).catch(console.error);
    req.on("close", () => {
        delete transports[transport.sessionId];
        transport.close();
    });
});
// Start server
app.listen(PORT, () => {
    console.log(`🌦️ Weather MCP Server running at http://localhost:${PORT}/mcp`);
});
