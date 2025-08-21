# Copy SoT Quality Assurance Checklists

This document provides comprehensive QA checklists for all Copy SoT agents to ensure deliverable quality, consistency, and compliance standards.

---

## Master Copy SoT Quality Gates

### Orchestrator Final Review Checklist (CPL)
- [ ] **Completeness:** All page templates have complete copy with stable block IDs
- [ ] **CTA Consistency:** One primary CTA per page; labels match measurement annotations
- [ ] **Voice Coherence:** Consistent Avatar language and tone across all copy elements
- [ ] **Measurement Alignment:** Every interactive element has proper `[E:event|params]` annotation
- [ ] **Proof Mapping:** All major claims mapped to evidence or conservatively reframed
- [ ] **SEO Optimization:** Titles/meta/OG present for all pages within character limits
- [ ] **Compliance Status:** No high-risk claims; legal review items flagged
- [ ] **Block ID Stability:** Template structure maintained; no broken references
- [ ] **Version Control:** CHANGELOG updated with v1.0 tag and major decisions documented

### Cross-Agent Consistency Validation
- [ ] **Copy ↔ Measurement Sync:** CTA labels match event annotation exactly
- [ ] **Copy ↔ Proof Alignment:** Claims reflect available evidence strength
- [ ] **Copy ↔ SEO Integration:** Headlines work for both conversion and search
- [ ] **Copy ↔ Compliance Balance:** Legal safety maintained without conversion sacrifice
- [ ] **Voice ↔ Localization Consistency:** Avatar triggers preserved across languages

---

## Agent-Specific Quality Standards

### Lead UX Writer (LUXW) Checklist

#### Copy Quality Standards
- [ ] **Headline Formula:** Pain→Promise structure using Avatar language (≤12 words)
- [ ] **CTA Formula:** Action + Outcome clearly stated (no generic "Learn More")
- [ ] **Bullet Points:** Verb-first construction, scannable format (≤8 words each)
- [ ] **Voice Consistency:** Avatar VoC language patterns used throughout
- [ ] **Risk Reversal:** Guarantee/promise language included where appropriate
- [ ] **Objection Handling:** Top concerns addressed with acknowledge→reframe→proof
- [ ] **Microcopy Quality:** Form labels conversational, error messages helpful
- [ ] **Trust Elements:** Social proof integrated naturally without interruption

#### Conversion Optimization
- [ ] **Single Primary CTA:** No competing actions on each page
- [ ] **Benefit Focus:** Outcomes emphasized over features or process
- [ ] **Urgency Elements:** Time/scarcity integrated where honest and appropriate
- [ ] **Social Proof Integration:** Testimonials support conversion without generic praise
- [ ] **FAQ Reframes:** Questions turned into conversion opportunities
- [ ] **Value Stacking:** Benefits build cumulatively toward primary action

#### Readability & Accessibility
- [ ] **Grade Level:** Appropriate for Avatar education level
- [ ] **Sentence Variety:** Length varies for natural flow
- [ ] **Paragraph Breaks:** Every 2-3 sentences for scannability
- [ ] **Active Voice:** Preferred over passive construction
- [ ] **Specific Language:** Numbers and specifics over vague claims
- [ ] **Natural Flow:** Copy reads well aloud, conversational tone

### VoC & Proof Curator (VPC) Checklist

#### Evidence Quality Standards
- [ ] **Claim Mapping:** Every major outcome claim linked to specific evidence
- [ ] **Evidence Strength:** Tier 1 evidence for primary conversion claims
- [ ] **Source Verification:** All metrics verified with client-provided documentation
- [ ] **Avatar Alignment:** Testimonials reflect target customer psychology and language
- [ ] **Consent Documentation:** Written permission for all named testimonials and case studies
- [ ] **Rights Clearance:** Current consent for logo usage and client-specific proof
- [ ] **Proof Freshness:** Evidence dates within acceptable recency limits
- [ ] **Anonymization Options:** Alternative attribution available where needed

#### Testimonial Curation
- [ ] **Specific Outcomes:** Quantified results with timeframes and context
- [ ] **Emotional Language:** Shows transformation impact, not just satisfaction
- [ ] **Objection Addressing:** Testimonials overcome common Avatar hesitations
- [ ] **Process Insights:** References methodology or approach effectiveness
- [ ] **Before/After Context:** Clear problem→solution→result narrative
- [ ] **Authentic Voice:** Natural language, not scripted or generic
- [ ] **Avatar Match:** Testimonial provider matches target customer profile

#### Gap Analysis & Risk Management
- [ ] **Evidence Gaps:** Unsupported claims identified with reframe alternatives
- [ ] **Conservative Alternatives:** Fallback copy maintains impact while reducing risk
- [ ] **Proof Gathering Plan:** Specific recommendations for missing evidence development
- [ ] **Expiration Tracking:** Evidence freshness monitoring and renewal schedule
- [ ] **Rights Management:** Consent renewal schedule and documentation system

### Measurement & CTA Mapper (MCM) Checklist

#### Event Annotation Standards
- [ ] **Complete Coverage:** Every CTA and interactive element has measurement overlay
- [ ] **Syntax Compliance:** All annotations use `[E:event_name|params]` format correctly
- [ ] **Naming Convention:** `snake_case` used exclusively for events and parameters
- [ ] **Parameter Completeness:** Critical parameters present (source_section, cta_id, etc.)
- [ ] **PII Exclusion:** No personal information in event parameters
- [ ] **v1B Alignment:** Perfect sync with v1B tracking specifications confirmed
- [ ] **Cross-Page Consistency:** Event naming standardized across all pages
- [ ] **Destination Mapping:** Analytics platforms correctly specified for each event

#### Identity & Privacy Compliance
- [ ] **Lead ID Propagation:** Identity tracking flow documented and implemented
- [ ] **Consent Requirements:** Marketing pixel consent requirements documented
- [ ] **Test Mode Exclusion:** Test traffic excluded from production analytics
- [ ] **Parameter Hygiene:** Values descriptive not generic (avoid 'button1', 'section2')
- [ ] **Platform Compatibility:** Events compatible with GA4, Facebook Pixel requirements
- [ ] **Reserved Names:** Analytics platform conflicts avoided in parameter naming

#### Quality Assurance
- [ ] **Event Map Accuracy:** Master table reflects all copy block annotations
- [ ] **Cross-Reference Validation:** Copy changes reflected in measurement annotations
- [ ] **Critical Parameter Audit:** High-priority events have all required parameters
- [ ] **Attribution Chain:** Lead tracking flow complete from awareness to conversion
- [ ] **Documentation Quality:** Implementation notes clear for engineering team

### SEO & Localization Editor (SLE) Checklist

#### SEO Technical Standards
- [ ] **Title Length:** All titles 50-60 characters with primary keywords
- [ ] **Meta Description:** 140-155 characters with compelling CTAs
- [ ] **No Duplicates:** Unique titles and descriptions across all pages
- [ ] **Canonical URLs:** Set for all page variations to prevent duplicate content
- [ ] **OG Tags Complete:** Facebook, LinkedIn, Twitter optimization with proper image dimensions
- [ ] **URL Slugs:** Human-readable, keyword-optimized, under 60 characters
- [ ] **Schema Markup:** Appropriate structured data recommendations provided
- [ ] **Internal Linking:** Conversion-focused anchor text supporting user journey

#### Search Optimization Quality
- [ ] **Keyword Integration:** Natural incorporation maintaining Avatar voice
- [ ] **Search Intent:** Titles and descriptions match searcher expectations
- [ ] **Click-Through Optimization:** Meta descriptions encourage search result clicks
- [ ] **Mobile Display:** Front-loading important keywords for mobile search
- [ ] **Local Considerations:** Market-specific search patterns addressed
- [ ] **Competitive Analysis:** Differentiation from competitor search presence

#### Localization Standards
- [ ] **Emotional Trigger Preservation:** Avatar psychology maintained in target language
- [ ] **Cultural Adaptation:** Business practices adapted for Portuguese market
- [ ] **Technical Balance:** English business terms vs Portuguese equivalents optimized
- [ ] **Local Proof Priority:** European/Portuguese testimonials and case studies emphasized
- [ ] **Legal Compliance:** GDPR references and European privacy standards included
- [ ] **URL Structure:** Hreflang tags properly implemented for both languages

### Compliance & Risk Reviewer (CRR) Checklist

#### Legal Risk Assessment
- [ ] **High-Risk Claims:** Unsubstantiated guarantees and superlatives eliminated/reframed
- [ ] **Evidence Requirements:** All outcome claims supported by verifiable proof
- [ ] **Professional Standards:** Service claims align with actual qualifications
- [ ] **Competitive Claims:** Comparison statements have substantiation backing
- [ ] **Timeline Promises:** Success rate disclosure where specific timeframes mentioned
- [ ] **Authority Claims:** Expert positioning backed by credentials and experience
- [ ] **Industry Compliance:** Relevant professional and advertising standards met

#### Privacy & Consent Compliance
- [ ] **GDPR Compliance:** Cookie consent language provides granular options
- [ ] **Privacy Policy Alignment:** Data collection copy matches actual practices
- [ ] **Consent Documentation:** Testimonials have proper rights clearance
- [ ] **Data Handling Accuracy:** Privacy descriptions reflect actual collection/usage
- [ ] **User Rights:** Access, deletion, portability referenced where required
- [ ] **Regional Requirements:** Local privacy law compliance verified

#### Truth-in-Advertising Standards
- [ ] **FTC Compliance:** Claims substantiated with competent and reliable evidence
- [ ] **Disclaimer Requirements:** Material disclosures clear and conspicuous
- [ ] **Testimonial Standards:** Individual experiences properly disclaimed
- [ ] **Results Claims:** Atypical outcomes have clear disclaimers
- [ ] **Guarantee Terms:** Money-back promises match actual business policies
- [ ] **Conservative Language:** High-risk claims reframed while maintaining impact

---

## Integration Quality Gates

### Copy ↔ Measurement Alignment
- [ ] **CTA Label Consistency:** Button text matches event annotation exactly
- [ ] **Conversion Hierarchy:** Primary CTAs have highest tracking priority
- [ ] **Form Field Mapping:** Input labels align with parameter names
- [ ] **Success Trigger Sync:** Confirmation messages align with goal events
- [ ] **User Journey Coherence:** Event sequence matches copy flow logic

### Copy ↔ Proof Evidence Sync
- [ ] **Claim Backing:** All specific outcomes have evidence mapping
- [ ] **Testimonial Integration:** Social proof supports adjacent copy claims
- [ ] **Case Study Alignment:** Success stories match service positioning
- [ ] **Conservative Fallbacks:** Alternative copy ready for weak evidence claims
- [ ] **Proof Placement:** Evidence supports conversion moments strategically

### Copy ↔ SEO Integration
- [ ] **Keyword Natural Integration:** SEO terms maintain conversational flow
- [ ] **Headline Optimization:** H1s work for both conversion and search
- [ ] **Meta Description CTAs:** Search snippets drive clicks to conversion content
- [ ] **Internal Link Flow:** SEO anchor text supports user conversion journey
- [ ] **Schema Support:** Structured data enhances copy effectiveness

### Copy ↔ Compliance Balance
- [ ] **Risk-Adjusted Language:** Legal safety maintained without conversion sacrifice
- [ ] **Disclaimer Integration:** Required disclosures don't interrupt conversion flow
- [ ] **Guarantee Clarity:** Legal protection and marketing impact balanced
- [ ] **Privacy Transparency:** Data handling honesty builds rather than hurts trust
- [ ] **Conservative Alternatives:** Fallback copy maintains persuasive impact

---

## Final Package Validation

### Technical Delivery Standards
- [ ] **File Organization:** All deliverables organized per specified structure
- [ ] **Version Control:** v1.0 tag applied with complete CHANGELOG
- [ ] **Cross-Reference Integrity:** All internal references and block IDs functional
- [ ] **Schema Validation:** All JSON outputs validate against provided schemas
- [ ] **Documentation Complete:** Implementation notes clear for design/dev teams

### Stakeholder Readiness
- [ ] **Design Team Ready:** Copy provides clear implementation guidance
- [ ] **Development Team Ready:** Measurement specifications actionable
- [ ] **Analytics Team Ready:** Event mapping enables business objective tracking
- [ ] **Legal Team Satisfied:** Risk mitigation and compliance requirements met
- [ ] **Marketing Team Enabled:** Copy supports campaign and conversion optimization

### Success Metrics Baseline
- [ ] **Conversion Readiness:** Primary actions clear and compelling on every page
- [ ] **Measurement Completeness:** All user interactions trackable for optimization
- [ ] **SEO Foundation:** Search visibility optimized while maintaining conversion focus
- [ ] **Compliance Protection:** Legal defensibility ensured for confident marketing
- [ ] **Localization Capability:** Global reach enabled with cultural adaptation

---

## Red-Team Validation Questions

### User Experience Critical Review
- **"Which CTA lacks clear next-step guidance?"** - Test conversion clarity
- **"Where could users get confused about the primary action?"** - Identify friction points
- **"What mobile usability issues are we missing?"** - Mobile conversion optimization
- **"Which objections are not adequately addressed?"** - Conversion barrier identification

### Measurement Critical Review  
- **"Which user interaction could we lose visibility into?"** - Tracking gap identification
- **"Where could event renaming break historical data?"** - Analytics continuity protection
- **"What consent scenario could accidentally send marketing events?"** - Privacy compliance verification
- **"Which measurement point lacks critical attribution parameters?"** - Funnel analysis completeness

### Business Risk Critical Review
- **"Which claim could be challenged legally or factually?"** - Legal risk assessment
- **"What guarantee language creates unrealistic expectations?"** - Customer satisfaction protection
- **"Where does copy not match actual service capabilities?"** - Delivery promise alignment
- **"Which testimonial lacks proper consent documentation?"** - Rights clearance verification

Remember: Quality gates exist to ensure the Copy SoT serves as a reliable foundation for design, development, and measurement implementation. Each checkpoint protects conversion effectiveness while managing legal, technical, and business risks.