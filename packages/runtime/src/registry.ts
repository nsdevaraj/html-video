import { anthropicApi } from './defs/anthropic-api.js';
import { claude } from './defs/claude.js';
import { cursorAgent } from './defs/cursor-agent.js';
import { codex } from './defs/codex.js';
import { hermes } from './defs/hermes.js';
import { amr } from './defs/amr.js';
import type { AgentDef } from './types.js';

/**
 * Built-in agent definitions. Order matters: the first one in the list is
 * the default selection in the studio composer.
 *
 * Default = anthropic-api (HTTP / Messages API), because the local
 * `claude --print` CLI has a non-deterministic 1-byte-empty-reply mode on
 * long creative outputs (verified 2026-05-28). Direct API doesn't.
 */
// AMR first — it's the recommended option (one login, many models, lower cost),
// so it leads the picker. Default SELECTION still falls back to the first
// *available* agent (see studio currentId logic), so an un-logged-in AMR up top
// won't strand a new project without a working agent.
export const AGENT_DEFS: AgentDef[] = [amr, anthropicApi, claude, cursorAgent, codex, hermes];

export function findAgent(id: string): AgentDef | undefined {
  return AGENT_DEFS.find((a) => a.id === id);
}
