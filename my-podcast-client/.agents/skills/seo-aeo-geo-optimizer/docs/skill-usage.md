# Skill Usage Guide (How to run the system)

This repo is a **modular, markdown-first Skill package** for SEO, AEO, and GEO work. It’s designed to be usable in any LLM environment (not tied to a specific runtime).

## Recommended entry point

Start with:

- `skills/seo-os.SKILL.md`

It sets global rules (data-first, clarity) and routes work to the specialist Skills.

## The specialist Skills

- `skills/serp-gap-analysis.SKILL.md`  
  Use when you have GSC/Ahrefs/Semrush exports (or a curated list of queries/pages) and you want a prioritised opportunity list.

- `skills/aeo-snippet-writer.SKILL.md`  
  Use when you want snippet-ready answers, page structures, FAQs, and AEO layered answers. Works best from a brief.

- `skills/geo-visibility.SKILL.md`  
  Use when you want citations/visibility in AI systems (AI Overviews, ChatGPT, Perplexity, Claude, Gemini, Copilot), including llms.txt and testing/scorecards.

- `skills/technical-seo-audit.SKILL.md`  
  Use when you need a technical audit and a prioritised roadmap (indexability, CWV, structured data, international SEO, crawl budget).

## Templates and tools

- `templates/aeo-brief.md`  
  Used to convert high-priority opportunities into briefing documents for writers or editors.

- `templates/technical-seo-audit.md`  
  Used to structure technical audits and action plans.

- `docs/geo-optimization-guide.md`  
  Long-form GEO reference for patterns, templates, and measurement.

- `tools/gsc_ahrefs_clean.py`  
  Helper script to turn raw CSV exports into compact Markdown tables for analysis.

## Suggested end-to-end workflow

1. **Clarify objective + constraints** (`skills/seo-os.SKILL.md`)
2. **Technical baseline** if needed (`skills/technical-seo-audit.SKILL.md` + `templates/technical-seo-audit.md`)
3. **Data-driven opportunities** (`skills/serp-gap-analysis.SKILL.md`)
4. **Brief the work** (`templates/aeo-brief.md`)
5. **Draft content** (`skills/aeo-snippet-writer.SKILL.md`)
6. **GEO refinement + testing** (`skills/geo-visibility.SKILL.md` + `docs/geo-optimization-guide.md`)
7. **Iterate monthly/quarterly** (reuse scorecards and action plans)

