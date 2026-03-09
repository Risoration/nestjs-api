#!/usr/bin/env python3
"""
Quick helper to clean and summarise CSV exports from GSC/Ahrefs/Semrush
before pasting into an AI session for use with the `serp-gap-analysis` skill.

Usage (basic):

    python gsc_ahrefs_clean.py input.csv

This will print:
- A short summary of the dataset
- A "by_page" table (aggregated by URL/page)
- A "striking_distance" table (queries with positions roughly 6–20, if a position column exists)

Supported columns (case-insensitive; extra columns are ignored):
- query
- page / url
- clicks
- impressions
- position

You can pipe the output to a markdown file:

    python gsc_ahrefs_clean.py gsc_export.csv > gsc_summary.md

Output is designed to be pasted into an AI workflow that follows:
- `skills/serp-gap-analysis.SKILL.md` (data-first content gap analysis)
- `templates/aeo-brief.md` (turn top opportunities into content briefs)
"""

from __future__ import annotations

import argparse
import csv
import sys
from collections import defaultdict
from dataclasses import dataclass
from typing import Dict, Iterable, List, Optional, Tuple


@dataclass
class Row:
    query: str
    page: str
    clicks: Optional[float]
    impressions: Optional[float]
    position: Optional[float]


def normalise_header(name: str) -> str:
    return name.strip().lower()


def parse_float(value: str) -> Optional[float]:
    value = value.strip()
    if not value:
        return None
    try:
        return float(value)
    except ValueError:
        return None


def load_rows(path: str) -> List[Row]:
    with open(path, newline="", encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        if reader.fieldnames is None:
            raise ValueError("CSV appears to have no header row.")

        header_map = {normalise_header(h): h for h in reader.fieldnames}

        def col(*candidates: str) -> Optional[str]:
            for c in candidates:
                key = normalise_header(c)
                if key in header_map:
                    return header_map[key]
            return None

        query_col = col("query", "keyword", "search query")
        page_col = col("page", "url", "landing page")
        clicks_col = col("clicks")
        impressions_col = col("impressions", "impr")
        position_col = col("position", "avg position", "rank")

        if query_col is None and page_col is None:
            raise ValueError("CSV must contain at least a 'query' or 'page/url' column.")

        rows: List[Row] = []
        for raw in reader:
            query = raw.get(query_col, "").strip() if query_col else ""
            page = raw.get(page_col, "").strip() if page_col else ""
            clicks = parse_float(raw.get(clicks_col, "")) if clicks_col else None
            impressions = parse_float(raw.get(impressions_col, "")) if impressions_col else None
            position = parse_float(raw.get(position_col, "")) if position_col else None

            rows.append(Row(query=query, page=page, clicks=clicks, impressions=impressions, position=position))

    return rows


def summarise_rows(rows: Iterable[Row]) -> Tuple[int, int, int]:
    rows_list = list(rows)
    unique_queries = {r.query for r in rows_list if r.query}
    unique_pages = {r.page for r in rows_list if r.page}
    return len(rows_list), len(unique_queries), len(unique_pages)


def aggregate_by_page(rows: Iterable[Row]) -> List[Dict[str, Optional[float]]]:
    agg: Dict[str, Dict[str, float]] = defaultdict(lambda: {"clicks": 0.0, "impressions": 0.0, "position_sum": 0.0, "position_count": 0.0})

    for r in rows:
        key = r.page or "(no page)"
        a = agg[key]
        if r.clicks is not None:
            a["clicks"] += r.clicks
        if r.impressions is not None:
            a["impressions"] += r.impressions
        if r.position is not None:
            a["position_sum"] += r.position
            a["position_count"] += 1.0

    result: List[Dict[str, Optional[float]]] = []
    for page, vals in agg.items():
        avg_position = vals["position_sum"] / vals["position_count"] if vals["position_count"] > 0 else None
        result.append(
            {
                "page": page,
                "clicks": vals["clicks"] or 0.0,
                "impressions": vals["impressions"] or 0.0,
                "avg_position": avg_position,
            }
        )

    # Sort by clicks descending, then impressions
    result.sort(key=lambda r: (-(r["clicks"] or 0.0), -(r["impressions"] or 0.0)))
    return result


def striking_distance(rows: Iterable[Row], min_pos: float = 6.0, max_pos: float = 20.0) -> List[Row]:
    candidates = [
        r
        for r in rows
        if r.position is not None and min_pos <= r.position <= max_pos
    ]
    # Sort by position ascending, impressions descending
    candidates.sort(key=lambda r: (r.position or 0.0, -(r.impressions or 0.0)))
    return candidates


def print_markdown_summary(rows: List[Row]) -> None:
    total_rows, unique_queries, unique_pages = summarise_rows(rows)

    print("### Dataset summary")
    print()
    print(f"- Total rows: **{total_rows}**")
    print(f"- Unique queries: **{unique_queries}**")
    print(f"- Unique pages: **{unique_pages}**")
    print()

    print("### Performance by page (aggregated)")
    print()
    print("| Page | Clicks | Impressions | Avg position |")
    print("|------|--------|-------------|--------------|")
    for r in aggregate_by_page(rows)[:50]:
        page = r["page"] or ""
        clicks = int(r["clicks"] or 0.0)
        impressions = int(r["impressions"] or 0.0)
        avg_pos = f"{r['avg_position']:.1f}" if r["avg_position"] is not None else "-"
        print(f"| {page} | {clicks} | {impressions} | {avg_pos} |")

    sd = striking_distance(rows)
    if sd:
        print()
        print("### Striking-distance queries (positions ~6–20)")
        print()
        print("| Query | Page | Clicks | Impressions | Position |")
        print("|-------|------|--------|-------------|----------|")
        for r in sd[:100]:
            clicks = int(r.clicks or 0.0)
            impressions = int(r.impressions or 0.0)
            pos = f"{r.position:.1f}" if r.position is not None else "-"
            print(f"| {r.query} | {r.page} | {clicks} | {impressions} | {pos} |")


def main(argv: Optional[List[str]] = None) -> int:
    parser = argparse.ArgumentParser(
        description="Clean and summarise GSC/Ahrefs/Semrush CSV exports for use with the serp-gap-analysis Skill."
    )
    parser.add_argument("csv_path", help="Path to the CSV export file.")
    args = parser.parse_args(argv)

    try:
        rows = load_rows(args.csv_path)
    except Exception as exc:  # noqa: BLE001
        print(f"Error reading CSV: {exc}", file=sys.stderr)
        return 1

    if not rows:
        print("No data rows found in CSV.", file=sys.stderr)
        return 1

    print_markdown_summary(rows)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

