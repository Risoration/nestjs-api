# Technical SEO Audit Template

## Used by (Skill package)

- **Primary Skill**: `skills/technical-seo-audit.SKILL.md`
- **Related Skills**:
  - `skills/seo-os.SKILL.md` (orchestration and prioritisation)
  - `skills/serp-gap-analysis.SKILL.md` (optional: correlate technical issues to performance patterns)

## How to use this template

- Duplicate this file per site (or per major section) and fill in the sections you have data for.
- If you don’t have a data source for a section, mark it as **Not assessed (no data provided)**.
- End with a clear **Action Plan & Timeline** so engineering and stakeholders can execute.

## Audit Overview

**Site:** [URL]  
**Audit Date:** [YYYY-MM-DD]  
**Audited By:** [Name/Team]  
**Tools Used:** [Google Search Console, Screaming Frog, PageSpeed Insights, etc.]

**Scope:**
- [ ] Full site audit
- [ ] Specific section: [path]
- [ ] Pre-migration audit
- [ ] Post-migration validation
- [ ] Quarterly health check

---

## Executive Summary

**Overall Health Score:** [X/100]

**Critical Issues:** [Number]  
**High Priority Issues:** [Number]  
**Medium Priority Issues:** [Number]  
**Low Priority Issues:** [Number]

**Top 3 Recommendations:**
1. [Most impactful fix]
2. [Second priority]
3. [Third priority]

---

## 1. Crawlability & Indexability

### 1.1 Robots.txt Analysis

**Location:** [URL]/robots.txt  
**Status:** ✅ Exists / ❌ Missing / ⚠️ Issues

**Issues Found:**
- [ ] Blocking CSS/JS resources
- [ ] Blocking important pages/sections
- [ ] Disallow: / (entire site blocked)
- [ ] Missing sitemap reference
- [ ] Other: [Specify]

**Current Rules:**
```
[Paste relevant robots.txt content]
```

**Recommendations:**
- [Specific fix 1]
- [Specific fix 2]

**Priority:** [Critical / High / Medium / Low]

---

### 1.2 XML Sitemap Analysis

**Location:** [URL]/sitemap.xml  
**Status:** ✅ Valid / ❌ Missing / ⚠️ Has Errors

**Sitemap Statistics:**
- Total URLs in sitemap: [Number]
- Successfully crawled: [Number from GSC]
- Errors: [Number]

**Issues Found:**
- [ ] Not submitted to GSC
- [ ] Contains non-canonical URLs
- [ ] Contains redirects (301/302)
- [ ] Contains noindex pages
- [ ] Missing lastmod dates
- [ ] Sitemap too large (>50MB or >50,000 URLs)
- [ ] Other: [Specify]

**Recommendations:**
- [Specific fix 1]
- [Specific fix 2]

**Priority:** [Critical / High / Medium / Low]

---

### 1.3 Google Search Console Coverage

**Data Source:** GSC → Indexing → Pages  
**Date Range:** [Last 90 days]

**Index Status:**
- ✅ Valid (Indexed): [Number] pages
- ⚠️ Valid with warnings: [Number] pages
- ❌ Excluded: [Number] pages
- ❌ Error: [Number] pages

**Top Exclusion Reasons:**
1. [Reason]: [Number] pages
   - Impact: [High/Medium/Low]
   - Action needed: [Yes/No]
   
2. [Reason]: [Number] pages
   - Impact: [High/Medium/Low]
   - Action needed: [Yes/No]
   
3. [Reason]: [Number] pages
   - Impact: [High/Medium/Low]
   - Action needed: [Yes/No]

**Critical Issues:**

**Excluded: Crawled - Currently Not Indexed**
- Pages affected: [Number]
- Sample URLs:
  - [URL 1]
  - [URL 2]
- Likely cause: [Low quality / Thin content / Duplicate / Other]
- **Action:** [Improve content quality / Consolidate / Noindex intentionally]

**Error: Server Error (5xx)**
- Pages affected: [Number]
- Sample URLs:
  - [URL 1]
- **Action:** [Fix server issues / Check hosting]

**Error: Redirect Error**
- Pages affected: [Number]
- **Action:** [Fix redirect chains / Update internal links]

**Recommendations:**
1. [Priority fix 1]
2. [Priority fix 2]

**Priority:** [Critical / High / Medium / Low]

---

### 1.4 Orphan Pages Analysis

**Definition:** Pages with no internal links and not in sitemap

**Tool Used:** [Screaming Frog / Sitebulb / Custom crawl]

**Orphan Pages Found:** [Number]

**Categories:**
- Old blog posts: [Number]
- Product pages: [Number]
- Landing pages: [Number]
- Other: [Number]

**Sample Orphan URLs:**
- [URL 1] - [Page type]
- [URL 2] - [Page type]
- [URL 3] - [Page type]

**Recommendations:**
- Add to sitemap if valuable
- Add internal links from relevant pages
- 301 redirect to relevant page
- Consider noindex/delete if outdated

**Priority:** [Critical / High / Medium / Low]

---

## 2. Site Architecture & Internal Linking

### 2.1 Site Depth Analysis

**Crawl Depth Distribution:**
- Depth 0 (Homepage): 1 page
- Depth 1: [Number] pages
- Depth 2: [Number] pages
- Depth 3: [Number] pages
- Depth 4+: [Number] pages ⚠️

**Issues:**
- [ ] Important pages buried >3 clicks from homepage
- [ ] Excessive crawl depth (>5 levels)
- [ ] Poor internal linking structure

**Pages with Depth >3 That Should Be Promoted:**
- [URL 1] - Current depth: [X] - Target depth: [Y]
- [URL 2] - Current depth: [X] - Target depth: [Y]

**Recommendations:**
- Add navigational links for key pages
- Improve internal linking from high-authority pages
- Restructure site hierarchy

**Priority:** [Critical / High / Medium / Low]

---

### 2.2 Internal Link Analysis

**Total Internal Links:** [Number]  
**Average Links Per Page:** [Number]

**Issues:**
- [ ] Broken internal links (404s): [Number]
- [ ] Redirect chains: [Number]
- [ ] Pages with <3 internal links
- [ ] Orphan pages: [Number]
- [ ] Over-optimization (too many links): [Number pages]

**Broken Internal Links (404):**
| Source Page | Broken Link | Found Count |
|-------------|-------------|-------------|
| [URL] | [Broken URL] | [X times] |
| [URL] | [Broken URL] | [X times] |

**Redirect Chains:**
| Start URL | Hops | Final URL | Fix Priority |
|-----------|------|-----------|--------------|
| [URL] | [X] | [Final URL] | High/Med/Low |

**Recommendations:**
1. Fix all broken internal links
2. Update links to bypass redirects
3. Add internal links to orphan pages
4. Improve anchor text diversity

**Priority:** [Critical / High / Medium / Low]

---

## 3. On-Page SEO

### 3.1 Title Tags

**Analysis:**
- Pages with titles: [Number] / [Total pages] ([X]%)
- Missing titles: [Number]
- Duplicate titles: [Number]
- Too short (<30 chars): [Number]
- Too long (>60 chars): [Number]

**Issues:**

**Missing Title Tags:**
- [URL 1]
- [URL 2]

**Duplicate Title Tags:**
| Title | URLs Using It | Count |
|-------|---------------|-------|
| [Title] | [URL 1, URL 2] | [X] |

**Recommendations:**
- Add unique titles to all pages
- Fix duplicates with descriptive, unique titles
- Keep titles 50-60 characters
- Include primary keyword near beginning

**Priority:** [Critical / High / Medium / Low]

---

### 3.2 Meta Descriptions

**Analysis:**
- Pages with descriptions: [Number] / [Total pages] ([X]%)
- Missing descriptions: [Number]
- Duplicate descriptions: [Number]
- Too short (<120 chars): [Number]
- Too long (>160 chars): [Number]

**Issues:**

**Missing Meta Descriptions:**
- [URL 1]
- [URL 2]

**Duplicate Meta Descriptions:**
| Description | URLs Using It | Count |
|-------------|---------------|-------|
| [Description snippet...] | [URL 1, URL 2] | [X] |

**Recommendations:**
- Add unique descriptions to key pages (prioritize high-traffic pages)
- Fix duplicates
- Keep descriptions 120-160 characters
- Include call-to-action when appropriate

**Priority:** [High / Medium / Low]

---

### 3.3 Heading Structure

**Analysis:**
- Pages missing H1: [Number]
- Pages with multiple H1s: [Number]
- Heading hierarchy issues: [Number]

**Issues:**

**Missing H1:**
- [URL 1]
- [URL 2]

**Multiple H1s:**
- [URL 1] - [X H1s found]

**Recommendations:**
- Ensure one H1 per page
- H1 should contain primary keyword
- Follow logical heading hierarchy (H1→H2→H3)

**Priority:** [High / Medium / Low]

---

## 4. Page Speed & Core Web Vitals

### 4.1 Core Web Vitals (Field Data)

**Data Source:** GSC → Experience → Core Web Vitals  
**Date Range:** [Last 28 days]

**Mobile Performance:**
- ✅ Good URLs: [Number] ([X]%)
- ⚠️ Needs Improvement: [Number] ([X]%)
- ❌ Poor URLs: [Number] ([X]%)

**Desktop Performance:**
- ✅ Good URLs: [Number] ([X]%)
- ⚠️ Needs Improvement: [Number] ([X]%)
- ❌ Poor URLs: [Number] ([X]%)

**Failing Metrics:**

**LCP (Largest Contentful Paint):**
- Target: <2.5s
- Current (Mobile): [X.X]s - ✅ Pass / ⚠️ Needs Improvement / ❌ Fail
- Current (Desktop): [X.X]s - ✅ Pass / ⚠️ Needs Improvement / ❌ Fail

**INP (Interaction to Next Paint):**
- Target: <200ms
- Current (Mobile): [X]ms - ✅ Pass / ⚠️ Needs Improvement / ❌ Fail
- Current (Desktop): [X]ms - ✅ Pass / ⚠️ Needs Improvement / ❌ Fail

**CLS (Cumulative Layout Shift):**
- Target: <0.1
- Current (Mobile): [0.XX] - ✅ Pass / ⚠️ Needs Improvement / ❌ Fail
- Current (Desktop): [0.XX] - ✅ Pass / ⚠️ Needs Improvement / ❌ Fail

---

### 4.2 Page Speed Issues

**Sample Pages Tested:** [List 3-5 key page types]

**Common Issues Identified:**

**LCP Issues:**
- [ ] Large images not optimized
- [ ] Server response time >600ms
- [ ] Render-blocking resources
- [ ] Slow resource load times

**INP Issues:**
- [ ] Heavy JavaScript execution
- [ ] Long tasks blocking main thread
- [ ] Unoptimized event handlers
- [ ] Third-party scripts

**CLS Issues:**
- [ ] Images without dimensions
- [ ] Ads/embeds without reserved space
- [ ] Web fonts causing layout shift
- [ ] Dynamically injected content

**Recommendations:**

**Immediate Fixes (Quick Wins):**
1. Optimize images (WebP format, compression, lazy loading)
2. Remove render-blocking CSS/JS
3. Set explicit width/height on images
4. Defer non-critical JavaScript

**Medium-term Improvements:**
5. Implement CDN for static assets
6. Optimize server response time
7. Reduce third-party script impact
8. Implement critical CSS inline

**Long-term Projects:**
9. Upgrade hosting/server resources
10. Consider static site generation for key pages

**Priority:** [Critical / High / Medium / Low]

---

## 5. Mobile Optimization

### 5.1 Mobile Usability

**Data Source:** GSC → Experience → Mobile Usability

**Mobile-Friendly Status:** ✅ Pass / ❌ Fail

**Issues Found:**
- [ ] Viewport not set
- [ ] Content wider than screen
- [ ] Text too small to read
- [ ] Clickable elements too close together
- [ ] Other: [Specify]

**Pages with Issues:** [Number]

**Sample URLs with Problems:**
- [URL 1] - Issue: [Specify]
- [URL 2] - Issue: [Specify]

**Recommendations:**
- Add/fix viewport meta tag: `<meta name="viewport" content="width=device-width, initial-scale=1">`
- Ensure responsive design for all page types
- Increase font size to minimum 16px
- Add adequate spacing between clickable elements

**Priority:** [Critical / High / Medium / Low]

---

### 5.2 Mobile vs Desktop Performance Gap

**Traffic Split:**
- Mobile: [X]%
- Desktop: [X]%

**Performance Comparison:**
| Metric | Mobile | Desktop | Gap |
|--------|--------|---------|-----|
| LCP | [X.X]s | [X.X]s | [X.X]s |
| INP | [X]ms | [X]ms | [X]ms |
| CLS | [0.XX] | [0.XX] | [0.XX] |

**Mobile-Specific Issues:**
- [Issue 1]
- [Issue 2]

**Recommendations:**
- Prioritize mobile optimization (majority of traffic)
- Test all changes on real mobile devices
- Consider AMP for news/blog content

**Priority:** [Critical / High / Medium / Low]

---

## 6. Structured Data & Rich Results

### 6.1 Structured Data Implementation

**Data Source:** GSC → Enhancements

**Implemented Schema Types:**
- [ ] Article
- [ ] FAQPage
- [ ] HowTo
- [ ] Product
- [ ] Organization
- [ ] BreadcrumbList
- [ ] Event
- [ ] Review/AggregateRating
- [ ] Other: [Specify]

**Structured Data Status:**

**Valid Items:** [Number]  
**Items with Warnings:** [Number]  
**Invalid Items:** [Number]  
**Errors:** [Number]

---

### 6.2 Rich Results Performance

**Data Source:** GSC → Enhancements → [Schema Type]

**FAQPage Rich Results:**
- Valid pages: [Number]
- Impressions (last 3 months): [Number]
- Clicks: [Number]
- CTR: [X]%

**Issues:**
- [Error type]: [Number] pages affected
- Sample URL: [URL]
- **Fix:** [Specific solution]

**HowTo Rich Results:**
- Valid pages: [Number]
- Impressions: [Number]
- Clicks: [Number]

**Issues:**
- [Error type]: [Number] pages affected
- **Fix:** [Specific solution]

---

### 6.3 Schema Opportunities

**Missing Schema Types:**
- [ ] Article schema on blog posts
- [ ] Product schema on product pages
- [ ] FAQPage schema on FAQ sections
- [ ] HowTo schema on tutorial content
- [ ] Review schema on review pages
- [ ] BreadcrumbList on all pages
- [ ] Organization schema site-wide

**Recommended Implementations:**

**Priority 1 (Implement First):**
1. [Schema type] on [page type]
   - Estimated pages: [Number]
   - Expected benefit: [Featured snippet / Rich results / Knowledge Graph]

**Priority 2:**
2. [Schema type] on [page type]
   - Estimated pages: [Number]
   - Expected benefit: [Benefit]

**Priority:** [High / Medium / Low]

---

## 7. Content Quality & Duplication

### 7.1 Thin Content

**Pages with Low Word Count (<300 words):** [Number]

**Sample Thin Pages:**
| URL | Word Count | Traffic (3mo) | Action |
|-----|------------|---------------|--------|
| [URL] | [X words] | [X sessions] | Expand/Noindex/Delete |

**Recommendations:**
- Expand valuable thin pages with comprehensive content
- Consolidate similar thin pages
- Noindex or delete low-value pages

**Priority:** [High / Medium / Low]

---

### 7.2 Duplicate Content

**Duplicate Page Titles:** [Number]  
**Duplicate Meta Descriptions:** [Number]  
**Duplicate Content (>90% similarity):** [Number]

**Types of Duplication:**

**URL Parameter Issues:**
- [Example URL with parameters]
- **Fix:** Use canonical tags or configure URL parameters in GSC

**WWW vs Non-WWW:**
- Both versions accessible: ✅ / ❌
- Canonical set: ✅ / ❌
- **Fix:** 301 redirect one version to the other

**HTTP vs HTTPS:**
- Both versions accessible: ✅ / ❌
- **Fix:** 301 redirect HTTP to HTTPS

**Trailing Slash Inconsistency:**
- Both /page and /page/ accessible: ✅ / ❌
- **Fix:** Choose one format, redirect the other

**Recommendations:**
1. Implement canonical tags on all pages
2. Fix URL inconsistencies with 301 redirects
3. Use rel="canonical" for parameter variations
4. Set preferred domain in GSC

**Priority:** [Critical / High / Medium / Low]

---

## 8. HTTPS & Security

### 8.1 SSL Certificate

**HTTPS Status:** ✅ Fully Implemented / ⚠️ Mixed Content / ❌ Not Implemented

**SSL Certificate:**
- Valid: ✅ / ❌
- Expires: [Date]
- Issuer: [Certificate Authority]

**Issues:**
- [ ] HTTP version still accessible (no redirect)
- [ ] Mixed content warnings (HTTP resources on HTTPS pages)
- [ ] Certificate expired or expiring soon
- [ ] Certificate not trusted

**Recommendations:**
- Redirect all HTTP to HTTPS
- Fix mixed content issues
- Renew certificate before expiration
- Implement HSTS header

**Priority:** [Critical / High / Medium / Low]

---

### 8.2 Security Headers

**Tool:** [SecurityHeaders.com or similar]

**Headers Status:**

| Header | Status | Current Value | Recommendation |
|--------|--------|---------------|----------------|
| Strict-Transport-Security (HSTS) | ✅/❌ | [Value or Missing] | [Recommendation] |
| X-Content-Type-Options | ✅/❌ | [Value or Missing] | nosniff |
| X-Frame-Options | ✅/❌ | [Value or Missing] | DENY or SAMEORIGIN |
| Content-Security-Policy | ✅/❌ | [Value or Missing] | [Recommendation] |
| X-XSS-Protection | ✅/❌ | [Value or Missing] | 1; mode=block |

**Priority:** [Medium / Low]

---

## 9. International SEO (if applicable)

### 9.1 Hreflang Implementation

**Multi-language/region site:** Yes / No

**Hreflang Status:** ✅ Implemented / ⚠️ Issues / ❌ Missing

**Languages/Regions Targeted:**
- [Language-Region code]: [Number] pages
- [Language-Region code]: [Number] pages

**Issues Found:**
- [ ] Missing return tags
- [ ] Incorrect language codes
- [ ] Self-referencing hreflang missing
- [ ] x-default missing
- [ ] Conflicting with canonical tags

**Sample Errors:**
- [URL]: [Error description]

**Recommendations:**
- Implement bidirectional hreflang tags
- Add x-default for international users
- Validate with hreflang validator tools
- Ensure hreflang and canonical tags align

**Priority:** [Critical / High / Medium / Low]

---

## 10. Crawl Budget & Server Performance

### 10.1 Crawl Stats

**Data Source:** GSC → Settings → Crawl Stats

**Crawl Rate:**
- Average requests per day: [Number]
- Average response time: [X]ms
- Crawl budget utilization: [X]%

**Issues:**
- [ ] High response time (>500ms)
- [ ] Many crawl errors
- [ ] Crawling low-value pages
- [ ] Redirect chains consuming budget

**Pages Crawled by Type:**
- [ ] Valuable pages: [X]%
- [ ] Low-value pages: [X]%
- [ ] Redirects: [X]%
- [ ] Errors: [X]%

**Recommendations:**
- Improve server response time
- Block low-value pages in robots.txt
- Fix redirect chains
- Prioritize crawling of important pages with internal links

**Priority:** [High / Medium / Low]

---

## Action Plan & Timeline

### Immediate Actions (Week 1)

| Issue | Priority | Responsible | Deadline | Status |
|-------|----------|-------------|----------|--------|
| [Critical issue 1] | Critical | [Name] | [Date] | Not Started |
| [Critical issue 2] | Critical | [Name] | [Date] | Not Started |

### Short-term (Weeks 2-4)

| Issue | Priority | Responsible | Deadline | Status |
|-------|----------|-------------|----------|--------|
| [High priority issue 1] | High | [Name] | [Date] | Not Started |
| [High priority issue 2] | High | [Name] | [Date] | Not Started |

### Medium-term (Month 2-3)

| Issue | Priority | Responsible | Deadline | Status |
|-------|----------|-------------|----------|--------|
| [Medium priority issue 1] | Medium | [Name] | [Date] | Not Started |

### Long-term (Quarter 2+)

| Issue | Priority | Responsible | Deadline | Status |
|-------|----------|-------------|----------|--------|
| [Low priority issue 1] | Low | [Name] | [Date] | Not Started |

---

## Appendix

### Tools Used
- [Tool name and version]
- [Tool name and version]

### Methodology
[Brief description of audit methodology]

### Next Audit Date
[Recommended: Quarterly for ongoing maintenance]

---

**Audit Completed By:** [Name]  
**Date:** [YYYY-MM-DD]  
**Next Review:** [YYYY-MM-DD]
