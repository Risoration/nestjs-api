---
name: geo-visibility
description: GEO and AI-visibility Skill focused on getting content cited and quoted in AI-generated answers across Google AI Overviews, ChatGPT, Perplexity, Claude, Gemini, and Copilot.
---

# GEO & AI Visibility Skill

## Purpose

This Skill specialises in **Generative Engine Optimization (GEO)**:

- Makes content more likely to be **cited, quoted, or referenced** by AI systems.
- Aligns structures with **conversational queries** and decision-making use cases.
- Designs and reviews **llms.txt** and GEO scorecards.

It operationalises concepts detailed in `docs/geo-optimization-guide.md`.

## When to Use

Call this Skill when the user asks about:

- **AI Overviews**, ChatGPT visibility, Perplexity, Claude, Gemini, or Copilot.
- “Will AI find or cite our content?” or “How do we appear in AI answers?”.
- **Conversational queries** and voice-style questions.
- **llms.txt**, AI crawler optimisation, or AI visibility testing and measurement.

## Expected Inputs

Any combination of:

- Existing or drafted content (pages, articles, comparison guides, FAQs).
- Target **conversational queries** (e.g. “Should I…”, “Compare X vs Y”, “Why does…”).
- Business and brand context (what expertise should be visible, what topics matter).
- Optional:
  - Existing or planned `/llms.txt` file.
  - Outputs from the SERP & Gap Analysis and AEO Writer Skills.

## Typical Outputs

- GEO-optimised **page structures** and answer patterns for key queries.
- **llms.txt** drafts or improvements.
- **AI visibility test plans** and interpretation of results.
- **GEO scorecards** and ongoing measurement frameworks.

## Core Behaviours

### 1. GEO vs SEO vs AEO Framing

Keep the relationship clear:

- **SEO**: Ranking in traditional SERPs.
- **AEO**: Structuring content for **featured snippets** and **voice answers**.
- **GEO**: Ensuring content is **cited in AI-generated answers**.

Many patterns overlap, but GEO emphasises:

- Citation-worthiness (data, sources, expertise).
- Conversational queries and nuanced decision frameworks.
- AI visibility testing and tracking.

### 2. Citation-Worthy Content Design

Use the **3C framework** (see `docs/geo-optimization-guide.md`):

- **Credible**
  - Highlight author expertise, domain authority, and transparent sourcing.
  - Use specific data (stats, dates, research) with clear attribution.
- **Clear**
  - Lead with direct answers.
  - Use headings that mirror natural questions.
  - Structure content with lists and tables where helpful.
- **Current**
  - Indicate publication and update dates.
  - Reflect current best practices and up-to-date data.

When rewriting or planning content:

- Turn vague claims into **data-backed statements**.
- Add **comparison tables**, **stepwise processes**, and **decision frameworks** where relevant.

### 3. Conversational Query Patterns

Optimise headings and sections for how people **talk to AI**:

- “Should I…” decision queries.
- “Compare X vs Y…” comparison queries.
- “How do I…” with constraints (on a budget, for small teams, etc.).
- “Why does…” diagnostic queries.

Translate this into concrete structures (see `docs/geo-optimization-guide.md` for full templates), for example:

- **Decision query**:
  - Quick answer.
  - “When to do it” vs “When not to do it”.
  - Decision framework bullets.
- **Comparison query**:
  - Quick comparison summary.
  - Table with core criteria.
  - “When to choose X” vs “When to choose Y”.
- **Diagnostic “Why does…” query**:
  - Primary cause.
  - Other common causes.
  - Diagnostic workflow.
  - Solutions by cause.

### 4. llms.txt Design

When asked about llms.txt:

- Use the template from `docs/geo-optimization-guide.md` to:
  - Summarise what the organisation does.
  - Highlight 5–10 **key resources**.
  - Describe **content focus** and **expertise**.
  - Include a clear **last updated** date.
- Ensure the file is:
  - Concise (well under ~10 KB).
  - Focused on the **best, most authoritative** content.
  - Written in **natural language**, not keyword spam.

Outputs should be ready to paste into `/llms.txt` at the site root.

### 5. AI Visibility Testing & Scorecards

When testing AI visibility:

- Select a small set (10–20) of **target conversational queries**.
- For each query, design a **test grid** across platforms:
  - Google AI Overviews.
  - ChatGPT (with browsing).
  - Perplexity (Quick + Pro).
  - Claude (with web search).
  - Gemini.
  - Copilot.
- Use the test and scorecard templates from `docs/geo-optimization-guide.md` and the root `SKILL.md` to:
  - Capture whether the brand is cited.
  - Note position, whether it’s a quote or paraphrase.
  - Track which competitors are cited instead.

Summarise patterns:

- Content types that get cited vs ignored.
- Platforms where visibility is strong vs weak.
- Query clusters that need new or improved content.

### 6. Platform-Specific Tactics (High-Level)

Use `docs/geo-optimization-guide.md` for deeper detail, but keep these headlines in mind:

- **Google AI Overviews**
  - Optimise for question-based headings and FAQ schema.
  - Provide concise intro answers and comprehensive coverage.
- **ChatGPT with browsing**
  - Conversational headings and **data-backed claims**.
  - Clear attribution (“According to…” statements).
  - Recency signals (update dates, 2026 context).
- **Perplexity**
  - Research-grade content and transparent sources.
  - Tables, lists, and structured analysis.
- **Claude / Gemini / Copilot**
  - Nuanced, balanced explanations.
  - Clear separation of fact vs judgment.
  - E-E-A-T signals (experience, expertise, authoritativeness, trust).

## Dependencies & Related Files

This Skill relies on:

- `docs/geo-optimization-guide.md` – the deep-dive GEO playbook.
- `skills/seo-os.SKILL.md` – for orchestration and overall strategy.
- `skills/aeo-snippet-writer.SKILL.md` – to execute GEO-aligned answer patterns.
- `skills/serp-gap-analysis.SKILL.md` – for identifying conversational query opportunities.

Where appropriate, explicitly reference sections or templates from the GEO guide rather than duplicating full content.

