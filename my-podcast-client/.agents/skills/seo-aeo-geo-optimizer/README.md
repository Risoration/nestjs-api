# SEO-AEO-GEO-Assistant Skill

Modern SEO isn’t just blue links any more. `SEO-AEO-GEO-Assistant` is a **modular, workflow-driven Skill package** for **SEO**, **AEO (Answer Engine Optimization)**, and **GEO (Generative Engine Optimization)** so your content can win:

- Traditional rankings and featured snippets
- Voice and assistant answers
- Citations in AI systems like Google AI Overviews, ChatGPT, Perplexity, Claude, Gemini, and Copilot

It’s designed for **in‑house teams** who want practical, copy‑pasteable workflows instead of theory.

---

## What’s Included

- **`SKILL.md`** – Entry point (thin orchestrator)  
  Explains the system and routes work to the specialist Skills.

- **`skills/`** – Specialist Skill modules  
  - `skills/seo-os.SKILL.md` (core principles + routing)  
  - `skills/serp-gap-analysis.SKILL.md` (data-first SERP + content gap analysis)  
  - `skills/aeo-snippet-writer.SKILL.md` (featured snippets + AEO writing)  
  - `skills/geo-visibility.SKILL.md` (GEO + AI visibility, llms.txt, testing)  
  - `skills/technical-seo-audit.SKILL.md` (technical SEO audits + prioritisation)

- **`templates/technical-seo-audit.md`** – Technical SEO audit template  
  Covers crawlability, indexability, CWV, structured data, international SEO, and an action plan.

- **`templates/aeo-brief.md`** – AEO + featured snippet content brief  
  Captures intent, target questions, snippet formats, SERP context, and success criteria.

- **`docs/geo-optimization-guide.md`** – GEO deep‑dive guide  
  Long-form reference for GEO concepts, templates, and measurement.

- **`docs/skill-usage.md`** – How to run the system  
  Suggested end-to-end workflow and hand-offs between Skills.

- **`tools/gsc_ahrefs_clean.py`** – CSV cleaner & summariser for search data  
  Converts GSC/Ahrefs/Semrush exports into compact Markdown tables (by page + striking distance).

---

## Who This Is For

- **In‑house SEO teams** who want repeatable, documented workflows
- **Content strategists** planning topic clusters and briefs
- **Technical SEOs** running audits and explaining priorities to stakeholders
- **Teams experimenting with AI visibility** (GEO) and wanting a concrete playbook

You don’t need to be an AI expert. The materials are written in plain, neutral English and assume familiarity with core SEO concepts.

---

## Quick start

1. Start with `skills/seo-os.SKILL.md` to set principles and choose the right workflow.
2. If you have search data, run `tools/gsc_ahrefs_clean.py` and then use `skills/serp-gap-analysis.SKILL.md`.
3. Turn high-priority opportunities into briefs with `templates/aeo-brief.md`.
4. Draft or refine content with `skills/aeo-snippet-writer.SKILL.md`.
5. If AI visibility matters, apply `skills/geo-visibility.SKILL.md` (reference `docs/geo-optimization-guide.md`).
6. If there are crawl/index/CWV/schema issues, run `skills/technical-seo-audit.SKILL.md` with `templates/technical-seo-audit.md`.

For a fuller walkthrough, see `docs/skill-usage.md`.

---

## Installation

You can clone directly: https://github.com/kxwu222/SEO-AEO-GEO-Assistant.git into your agents


## Compatibility (which agents this works with)

This package is **markdown-first**, so it works in any environment where you can provide persistent instructions and reference files. Common examples:

- **Cursor**: Skills / instruction files
- **ChatGPT**: Custom GPT instructions + Knowledge files
- **Claude**: Projects (with attached docs)
- **Gemini**: Gems / saved instructions (with attached docs)
- **Perplexity**: Spaces / reference-doc workflows

---
## Notes
- The Markdown files (`SKILL.md`, `skills/*`, `templates/*`, `docs/*`) work in **any editor or AI environment**.
- The Python helper `tools/gsc_ahrefs_clean.py` requires:
  - Python 3.8+
  - Standard library only (no third‑party dependencies)

Recommended:

```bash
python tools/gsc_ahrefs_clean.py --help
```

---

## Versioning

- **Current version:** `2.0`
- **Status:** Production‑ready for in‑house use

If you adapt this for your own organisation (e.g. industry‑specific workflows, localisation), consider forking the repo and maintaining your own versioning/changelog.

---

## Contributing

If you’d like to:

- Suggest improvements to workflows
- Add new templates (e.g. for specific verticals)
- Report issues or ambiguities

Open an issue or pull request with a clear description and, where possible, concrete examples from your own use cases.

---

## License

This project is licensed under the **MIT License**. You are free to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the software, subject to the terms of the MIT licence.

See the `LICENSE` file for full details.
