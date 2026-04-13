/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * @csoai/sports-analytics-ai
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * Copyright (c) 2026 CSGA Global. All rights reserved.
 * Part of the CSGA Global MCP Ecosystem.
 *
 * LEGAL NOTICE: This software is provided for informational and advisory
 * purposes only. It does not constitute legal, regulatory, or professional
 * compliance advice. Users should consult qualified legal counsel for
 * jurisdiction-specific compliance requirements.
 *
 * License: CC0-1.0 (Creative Commons Zero v1.0 Universal)
 * SPDX-License-Identifier: CC0-1.0
 *
 * Build Timestamp: 2026-02-26T06:00:00Z
 * Last Modified:   2026-02-26T06:00:00Z
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { handleSportsAiCompliance } from "./tools/sports-ai-compliance.js";

const server = new McpServer({
  name: "csoai-sports-analytics-ai-mcp",
  version: "1.0.0"
});

// Schemas extracted to avoid TS2589 deep instantiation
const SportsAiComplianceShape = {
  system_name: z.string().describe("Name of sports AI system"),
  ai_function: z.string().describe("Function (performance analytics, betting integrity, injury prediction, fan engagement, scouting, anti-doping)"),
  athlete_data: z.string().describe("Data types (biometric, GPS, video, medical, financial, behavioral)"),
  betting_impact: z.string().describe("Betting impact (odds generation, integrity monitoring, match-fixing detection, none)"),
  jurisdiction: z.string().describe("Operating jurisdiction (EU, US, UK, IOC/WADA, FIFA, etc.)"),
};

// ─── Tool 1: sports_ai_compliance ───
(server.tool as any)(
  "sports_ai_compliance",
  "Assess compliance for AI in sports analytics. Covers athlete data, betting integrity, biometric monitoring, and anti-doping systems.",
  SportsAiComplianceShape,
  async (args: any) => {
    const result = handleSportsAiCompliance(args.system_name, args.ai_function, args.athlete_data, args.betting_impact, args.jurisdiction);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(console.error);
