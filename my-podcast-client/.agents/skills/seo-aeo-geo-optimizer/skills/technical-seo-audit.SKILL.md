---
name: technical-seo-audit
description: Technical SEO audit Skill that turns crawl, GSC, and CWV data into a structured audit and prioritised action plan using the technical audit template.
---

# Technical SEO Audit Skill

## Purpose

This Skill guides and structures **technical SEO audits**, using the `templates/technical-seo-audit.md` template as the backbone.

It helps:

- Turn raw crawl and GSC data into a **clear audit document**.
- Prioritise technical issues by **impact and effort**.
- Produce an **action plan and timeline** suitable for stakeholders and engineers.

## When to Use

Call this Skill when the user:

- Requests a **technical SEO audit** or **site health check**.
- Mentions issues with:
  - Indexability or crawl coverage.
  - Core Web Vitals and page speed.
  - Structured data and rich results.
  - Mobile usability.
  - International SEO and hreflang.
  - Migrations, HTTPS, or security headers.

It can also be used to:

- Interpret or refine an **existing audit**.
- Create a **condensed executive summary** from detailed findings.

## Expected Inputs

Any subset of:

- Crawl data (e.g. Screaming Frog, Sitebulb):
  - URLs, status codes, depth, titles, meta descriptions, headings, canonicals, etc.
- Google Search Console data:
  - Coverage, Page Indexing, Core Web Vitals, Enhancements, Mobile Usability, Crawl stats.
- Performance diagnostics:
  - PageSpeed Insights or Lighthouse reports.
- International SEO information:
  - Hreflang implementation, language/region strategy.
- Security and HTTPS status.

The more specific the data, the more concrete the recommendations should be.

## Typical Outputs

- A partially or fully populated **technical SEO audit document** following:
  - Audit overview and executive summary.
  - Sections for crawlability/indexability, architecture, on-page SEO, CWV & performance, mobile, structured data, content quality/duplication, HTTPS/security, international SEO, crawl budget.
  - An action plan split by timeframe and priority.
- A **prioritised issue list** with:
  - Severity (critical/high/medium/low).
  - Affected areas.
  - Recommended fixes and expected impact.

## Core Behaviours

### 1. Anchor to the Audit Template

Use `templates/technical-seo-audit.md` as the **canonical structure**:

- Populate sections with whatever data is available.
- Clearly mark sections as **“Not assessed (no data provided)”** if inputs are missing.
- Use checklists and tables to make issues and recommendations scannable.

### 2. Separate Observation from Recommendation

For each section:

- **Observation**:
  - What the data shows (counts, statuses, distributions).
  - Where issues cluster (e.g. specific directories, templates, or page types).
- **Recommendation**:
  - Specific, actionable fixes.
  - Who should act (developer vs content/editorial).
  - Priority and suggested timeframe.

Avoid mixing raw data, interpretation, and action in a single unstructured paragraph.

### 3. Prioritise by Impact and Risk

When multiple issues are present:

- Treat as **critical**:
  - Site-wide blocking in `robots.txt`.
  - Widespread 5xx or 4xx errors on important pages.
  - Severe Core Web Vitals failures on key templates.
  - Major HTTPS or security misconfigurations.
- Treat as **high**:
  - Large volumes of non-indexed important pages.
  - Significant mobile usability issues.
  - Missing or broken structured data on high-value content.
- Treat as **medium/low**:
  - Smaller duplication issues.
  - Non-critical schema gaps.
  - Optimisations that primarily improve quality-of-life or future-proofing.

Reflect this in the **action plan** section of the template.

### 4. Use Checklists to Drive Coverage

Walk through the major sections in order (matching the template):

- Crawlability & Indexability.
- Site Architecture & Internal Linking.
- On-Page SEO (titles, meta, headings).
- Page Speed & Core Web Vitals.
- Mobile Optimisation.
- Structured Data & Rich Results.
- Content Quality & Duplication.
- HTTPS & Security.
- International SEO (if applicable).
- Crawl Budget & Server Performance.

For each, use or adapt the template’s checklists to:

- Identify missing or misconfigured elements.
- Capture sample URLs and patterns.
- Tie issues to recommended fixes.

### 5. Tie Technical Issues to Business Impact

When making recommendations:

- Explain **why the issue matters**:
  - Lost indexation → fewer pages able to rank.
  - Poor CWV → lower user satisfaction and potential ranking impact.
  - Broken schema → loss of rich results and SERP real estate.
- Indicate **which pages or sections are most affected**:
  - High-traffic templates.
  - Conversion-critical flows.
  - Strategic content hubs.

This helps stakeholders prioritise engineering work.

## Dependencies & Related Files

This Skill depends on:

- `templates/technical-seo-audit.md` – the primary audit document template.
- `skills/seo-os.SKILL.md` – for global principles and routing.
- Potentially `skills/serp-gap-analysis.SKILL.md` – to correlate technical issues with performance patterns.

When asked to “run” an audit, use the template’s sections as your outline and ensure the final output is easy for a human to copy into their own documents.

