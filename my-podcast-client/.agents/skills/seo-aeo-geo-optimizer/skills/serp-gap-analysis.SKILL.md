---
name: serp-gap-analysis
description: Data-first SERP and content gap analysis Skill. Turns GSC/Ahrefs/Semrush exports and SERP observations into prioritised opportunities and inputs for briefs.
---

# SERP & Content Gap Analysis Skill

## Purpose

This Skill transforms **search performance data** and **SERP observations** into:

- Clear summaries of the current landscape.
- **Prioritised content opportunities** (new pages, rewrites, expansions).
- Inputs for **AEO/snippet briefs** and **topic cluster planning**.

It operationalises the data-first principles defined in `seo-os.SKILL.md`.

## When to Use

Call this Skill when the user:

- Provides exports from:
  - **Google Search Console**, **Ahrefs**, **Semrush**, or similar tools.
  - Consolidated Markdown summaries from `gsc_ahrefs_clean.py`.
- Asks for:
  - **Content gap analysis**.
  - **Striking-distance keyword** opportunities.
  - **SERP/competitor benchmarking**.
  - Help prioritising which pages or topics to work on next.

If no data is provided, this Skill can still:

- Work from small **manually-supplied lists** of queries or URLs.
- Fall back to **pattern-based reasoning**, clearly marked as inference.

## Expected Inputs

Any combination of:

- CSV exports from GSC/Ahrefs/Semrush (ideally pre-processed by `gsc_ahrefs_clean.py` into Markdown).
- Raw or summarised tables including, where possible:
  - `query`
  - `page` / `url`
  - `clicks`
  - `impressions`
  - `position`
- Free-text notes from the user describing:
  - Priority sections of the site.
  - Business goals and constraints.
  - Key competitors and target queries.

## Typical Outputs

- **Dataset summary**: scope, time range, metrics available.
- **By-page performance overview**.
- **Striking-distance query lists**.
- Grouped **question families** by intent (definition, how-to, comparison, etc.).
- A **prioritised opportunity list**:
  - New pages to create.
  - Existing pages to expand or refocus.
  - FAQs and sections to add.
- Clear pointers for:
  - `aeo-snippet-writer.SKILL.md` (content to draft).
  - Briefs using `templates/aeo-brief.md`.

## Core Behaviours

### 1. Summarise the Dataset

Start by summarising the scope and structure of the data:

```markdown
### Dataset Summary
- Data source: [GSC / Ahrefs / Semrush / mixed]
- Time range: [dates]
- Scope: [full site / specific section / locale / device]
- Metrics included: [queries, pages, clicks, impressions, positions, etc.]
```

If the data came from `gsc_ahrefs_clean.py`, restate its key tables:

- Overall row, unique query, and unique page counts.
- Top-performing pages by clicks/impressions.
- Striking-distance queries (positions ~6–20).

### 2. Apply Clear Prioritisation Rules

Explicitly state which rules you are applying:

- **Striking Distance (Positions ~6–20)**  
  - Candidates for **snippet-focused rewrites** and minor expansions.
  - Target: move to **top 5** and/or win featured snippets.

- **High Impressions + Low CTR**  
  - Good **snippet and title/description optimisation** candidates.
  - Fix by improving **intro answer blocks**, meta content, and page structure.

- **Multiple Queries → Single URL**  
  - Pages where **additional sections/FAQs** can capture more intents.
  - Potential to serve as **pillar or hub** content.

- **Queries With No Relevant URL**  
  - Clear **content gaps** requiring new pages or major subsections.

Always link these rules back to visible data: specify which queries, pages, and metrics support each finding.

### 3. Group by Question Family and Intent

Organise opportunities by **question/intent family**:

- **Definition / “What is…”**
- **How-to / Process**
- **Tools / Templates / Resources**
- **Costs / Time / Difficulty**
- **Comparisons / “X vs Y”**
- **Examples / Use Cases**

For each family, note:

- Which existing pages partially cover it.
- Where net-new content is needed.
- Which opportunities are suitable for:
  - Short snippet answers.
  - Long-form pillar content.

### 4. Output Prioritised Recommendations

Use a consistent structure:

```markdown
### Content Gap Recommendations

#### High Priority (Quick Wins)
1. **[Existing page URL or new page title]**
   - Opportunity type: [Striking distance / High impressions–low CTR / etc.]
   - Data support: [Key queries, positions, CTR or impression data]
   - Recommended action: [Rewrite intro / Add FAQ section / Create new page]
   - Link to brief: [Create AEO brief using templates/aeo-brief.md]

#### Medium Priority
[Same format]

#### Low Priority (Longer-Term Plays)
[Same format]

#### Inference-Only Ideas (No Direct Data Support)
[Clearly separate speculative opportunities]
```

Be transparent:

- Everything tied directly to the dataset should be labelled as **Data-backed**.
- Speculative ideas should be clearly marked as **Inference**.

### 5. Competitor SERP Analysis (Optional)

When the user asks for competitor/SERP benchmarking:

- Build a **SERP feature inventory**:
  - Featured snippet type.
  - PAA questions.
  - Video, image, local, and other modules.
- Analyse the **top 3–5 results**:
  - URL, content type, and angle.
  - Strengths, weaknesses, and gaps.
- Identify **content and format gaps**:
  - Missing formats (e.g. no comparison table).
  - Absent or weak FAQs.
  - Under-served question families.

Tie these findings back into the **opportunity list**, with clear instructions for the AEO writer and GEO Skills.

## Dependencies & Supporting Tools

This Skill assumes access to:

- `tools/gsc_ahrefs_clean.py`
  - Used to convert messy CSVs into **Markdown summaries**.
  - Produces:
    - A dataset summary.
    - By-page aggregate table.
    - Striking-distance queries table.
- `templates/aeo-brief.md`
  - Used to capture brief-level details for each high-priority opportunity.

When giving instructions to a human operator:

- Suggest running `gsc_ahrefs_clean.py` on large exports before pasting data into an AI session.
- Encourage using the AEO brief template for **each major recommendation cluster**.

## Hand-offs to Other Skills

- To **AEO + Snippet Writer**:
  - Provide a filtered, prioritised list of:
    - Pages to rewrite or expand.
    - New pages to create.
    - Question families and snippet formats to target.
  - For each item, include:
    - Core question(s).
    - Desired snippet format.
    - Key data points and constraints.

- To **GEO & AI Visibility**:
  - Flag opportunities where:
    - Conversational decision queries are prominent.
    - Comparison or diagnostic content could be highly citeable.
  - Recommend which pages should be treated as **GEO pillars**.

- To **Technical SEO Audit**:
  - Surface potential technical issues visible indirectly via the data (e.g. pages with impressions but zero clicks despite strong intent coverage).
  - Suggest follow-up checks (indexation, CWV, internal links).

