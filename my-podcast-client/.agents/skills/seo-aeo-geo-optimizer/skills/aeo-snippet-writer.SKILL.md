---
name: aeo-snippet-writer
description: Specialist Skill for writing and refining featured-snippet and AEO-ready answers, FAQs, and page structures based on briefs and strategy inputs.
---

# AEO + Featured Snippet Writer Skill

## Purpose

This Skill focuses on **content output**:

- Produces **featured-snippet–optimised** answer blocks.
- Structures content for **Answer Engine Optimization (AEO)** and **voice search**.
- Generates **FAQ/PAA blocks**, headings, lists, tables, and how-to structures.

It should not invent strategy from scratch; instead, it consumes:

- Inputs from `seo-os.SKILL.md` and `serp-gap-analysis.SKILL.md`.
- Briefs based on `templates/aeo-brief.md`.

## When to Use

Call this Skill when the user asks to:

- Draft or refine:
  - Snippet-ready answers for a question or topic.
  - Full article/page sections aligned to a brief.
  - FAQ/PAA-style question-and-answer blocks.
  - Video chapter outlines or social hooks derived from core content.
- Rework existing content for:
  - Better snippet eligibility.
  - Clearer AEO answer patterns.

## Expected Inputs

Ideally:

- A filled or partially filled **AEO brief** based on `templates/aeo-brief.md`, including:
  - Working title, primary topic/keyword, primary intent.
  - Target audience and locale.
  - SERP and competitor observations (if available).
  - Primary snippet target and secondary questions.
- Or at minimum:
  - A primary **question to answer**.
  - Desired **snippet format(s)** (paragraph, list, table, HowTo, video notes).
  - Any brand, tone, or quality constraints.

## Typical Outputs

- One or more **snippet blocks** in Markdown:
  - Paragraph snippet (40–60 words).
  - List snippet (4–8 items).
  - Table snippet (3–6 rows, 2–4 columns).
  - HowTo/process snippet (4–7 steps).
  - Video snippet notes (hook + chapters).
- **AEO layered answers**:
  - Short voice-ready answer (≤25 words).
  - Expanded clarification (1–3 short paragraphs).
  - Scannable supporting bullets or mini-tables.
- **Related FAQ blocks** (PAA-style).
- **Heading and section outlines** for full pages.

## Core Behaviours

### 1. Recognise Snippet Opportunity and Intent

Given a question or topic:

- Infer the **dominant intent** silently:
  - Informational, commercial, transactional, comparison, diagnostic, etc.
- Choose the **best-fit snippet format(s)**:
  - Paragraph for concise definitions.
  - List for steps, pros/cons, types, features.
  - Table for structured comparisons.
  - HowTo for ordered processes.
  - Video notes when video is explicitly requested.

### 2. Produce Featured Snippet Blocks

Use these patterns:

#### Paragraph Snippet (40–60 words)

```markdown
### Featured Snippet Answer (Paragraph)

[40–60 word answer that:
- Restates the core entity or concept.
- Directly answers the question in the first sentence.
- Avoids filler like "In conclusion" or "Overall".]
```

Guidelines:

- One short paragraph, **no fluff**.
- Core entity and verb appear in the **first sentence**.
- Factual and neutral; avoid speculation unless explicitly requested.

#### List Snippet

```markdown
### Featured Snippet Answer (List)

1. [Step or item 1 — 1 short sentence]
2. [Step or item 2 — 1 short sentence]
3. [Step or item 3 — 1 short sentence]
4. [Step or item 4 — 1 short sentence]
```

Guidelines:

- Prefer **4–8 items**.
- Numbered lists for ordered processes; bullets for unordered sets.
- Each item should be **one sentence** when possible.

#### Table Snippet

```markdown
### Featured Snippet Answer (Table)

| [Item] | [Attribute 1] | [Attribute 2] | [Attribute 3] |
|--------|---------------|---------------|---------------|
| [Row 1] | [...] | [...] | [...] |
| [Row 2] | [...] | [...] | [...] |
| [Row 3] | [...] | [...] | [...] |
```

Guidelines:

- **3–6 rows**, **2–4 key columns**.
- Values are **short and concrete**.
- Columns map to **real search modifiers** (price, difficulty, use case, platform, etc.).

#### HowTo / Process Snippet

```markdown
### Featured Snippet Answer (HowTo)

1. **[Step name]**: [1–2 sentences, action-focused]
2. **[Step name]**: [1–2 sentences, action-focused]
3. **[Step name]**: [1–2 sentences, action-focused]
4. **[Step name]**: [1–2 sentences, action-focused]
```

Guidelines:

- Each step starts with a **verb**.
- Keep to **4–7 steps** to stay concise.
- Steps should be **complete but minimal**.

#### Video Snippet Notes

```markdown
### Video Snippet Structure

- **Hook (0:00–0:30)**: [1–2 sentence summary of main answer]
- **Chapter 1 – [Subtopic] (0:30–2:00)**: [Key takeaway in 1 sentence]
- **Chapter 2 – [Subtopic] (2:00–4:00)**: [Key takeaway in 1 sentence]
- **Chapter 3 – [Subtopic] (4:00–6:00)**: [Key takeaway in 1 sentence]
- **Closing (6:00–7:00)**: [Reinforce main answer + simple call to action]
```

Guidelines:

- Chapters align with **sub-questions** or natural follow-ups.
- Each chapter takeaway is **short and quote-friendly**.
- Structures should be reusable as H2/H3 headings.

### 3. Apply AEO Answer Patterns

Optimise for answer engines by using **layered answers**:

```markdown
### [Question in Natural Language]

**Short Answer (Voice-Ready, ≤25 words):**  
[Direct answer with subject, verb, and key constraint.]

**Expanded Clarification (1–2 Paragraphs):**  
[Additional detail, variations, conditions, and key caveats.]

**Scannable Support (Optional):**
- [Key step, criterion, or example 1]
- [Key step, criterion, or example 2]
- [Key step, criterion, or example 3]
```

Guidelines:

- Always start with the **short answer**; do not bury it under context.
- Keep sentences **plain and speech-friendly** for voice assistants.
- Use bullets and tables where they genuinely improve comprehension.

### 4. FAQ / People Also Ask Blocks

Proactively suggest and/or generate **3–6 FAQ items** per main topic:

```markdown
### Related FAQs (People Also Ask Style)

**Q: [Question 1?]**  
A: [Concise 1–2 sentence answer.]

**Q: [Question 2?]**  
A: [Concise 1–2 sentence answer.]

**Q: [Question 3?]**  
A: [Concise 1–2 sentence answer.]
```

Guidelines:

- Cover **adjacent intents**: cost, time, difficulty, alternatives, risks, next steps, examples.
- Answers remain snippet-eligible (short, direct, clear).
- Questions mirror **natural language** queries, not keyword strings.

### 5. Headings and Page Structures

When asked to outline full pages:

- Turn heading structures into **natural questions** wherever appropriate.
- Align each H2/H3 with one primary question/intent.
- Indicate the snippet/AEO role of each section (define, explain, compare, give steps, etc.).

Example:

```markdown
## H1: [Core topic framed as a clear promise or question]

### H2: What Is [Core Concept]?
- Role: Definition + short AEO answer.

### H2: How Does [Core Concept] Work?
- Role: Process explanation with list or HowTo snippet.

### H2: When Should You Use [Core Concept]?
- Role: Decision framework (good fit vs bad fit).

### H2: Common Questions About [Core Concept]
- Role: FAQ block (PAA-style).
```

### 6. Brand, Tone, and Locale

Respect constraints from the brief:

- Match the requested **tone** (e.g. neutral, expert, friendly) while keeping answers clear.
- Use the specified **locale** for spelling and examples (e.g. en-GB vs en-US).
- Avoid claims the brand **cannot legally or credibly make**.

## Dependencies & Related Files

- `skills/seo-os.SKILL.md` – provides global principles and routing guidance.
- `skills/serp-gap-analysis.SKILL.md` – supplies data-backed priorities and key questions.
- `templates/aeo-brief.md` – the primary briefing template this Skill expects.

Where possible, reference the brief explicitly (e.g. “Primary question”, “Secondary questions”) and keep generated outputs tightly aligned to it.
