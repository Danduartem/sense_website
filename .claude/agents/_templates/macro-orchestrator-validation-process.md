# Macro Website Strategy Orchestrator Validation Process

This template provides the step-by-step validation process for the Macro Website Strategy Director to ensure complete, consistent, and implementation-ready v1A and v1B outputs.

## Phase 1: Agent Output Collection

### 1.1 Site IA & Narrative Lead (SIANL) Output Validation
- [ ] Pages Overview table complete (minimum 7 core page types)
- [ ] Every page has Must Prove + Evidence + Primary CTA
- [ ] Template narratives include sections with proof requirements
- [ ] Evidence gaps clearly marked as assumptions
- [ ] Avatar focus aligned with emotional triggers
- [ ] Primary CTAs use snake_case convention

### 1.2 Offer & CTA Strategist (OCS) Output Validation
- [ ] Offer mapping covers cold/warm/hot temperature stages
- [ ] One primary CTA per page type (no competing actions)
- [ ] Secondary CTAs support journey progression
- [ ] Value propositions include risk reversal elements
- [ ] CTA placement strategy documented
- [ ] All CTAs use snake_case naming convention

### 1.3 Nurture Architect (NA) Output Validation
- [ ] NO-PAY branch architecture complete with sequences
- [ ] CUSTOMER branch architecture complete with sequences  
- [ ] Each step has Purpose + Trigger + Exit conditions
- [ ] Decision logic covers different engagement patterns
- [ ] Trigger events are specific and actionable
- [ ] Exit conditions are comprehensive

### 1.4 Tracking Planner (TP) Output Validation
- [ ] Key Actions → Events mapping complete
- [ ] All primary CTAs have corresponding events
- [ ] Event dictionary uses snake_case naming
- [ ] No PII included in any parameters
- [ ] test_mode parameter included and configured
- [ ] Identity policy complete (lead_id/user_id/UTM)
- [ ] Critical parameters defined for all key events

### 1.5 Tech Architect & Data-Flow Engineer (TADE) Output Validation
- [ ] GTM trigger specifications are implementation-ready
- [ ] Technical architecture includes all required components
- [ ] Environment variables documented (dev/staging/prod)
- [ ] Data flow diagrams show complete integration paths
- [ ] Security and privacy compliance addressed
- [ ] Consent gating properly configured

## Phase 2: Cross-Agent Consistency Validation

### 2.1 CTA → Event Cross-Linking Validation
- [ ] Every primary CTA from OCS has corresponding event in TP
- [ ] Event names match CTA action names (consistent snake_case)
- [ ] Critical parameters support CTA measurement needs
- [ ] Business value alignment between offers and events
- [ ] Conversion funnel tracking supports offer strategy

### 2.2 Naming Convention Enforcement
```bash
# Run snake_case validation across all outputs
grep -E '[A-Z]|[[:space:]]|-' cta_events.txt && echo "FAIL: Non-snake_case found" || echo "PASS"
```

### 2.3 Identity Resolution Consistency
- [ ] lead_id generation method consistent across agents
- [ ] lead_id propagation destinations match
- [ ] user_id mapping timing aligned
- [ ] UTM capture rules consistent (only on conversion events)
- [ ] Attribution window consistent across platforms

### 2.4 Nurture Trigger Alignment
- [ ] All nurture triggers from NA have corresponding trackable events in TP
- [ ] Behavioral triggers are technically measurable
- [ ] Exit conditions map to trackable events
- [ ] Segmentation logic supports automation requirements

### 2.5 Page Narrative → CTA → Event Flow
- [ ] Page narratives (SIANL) support CTA positioning (OCS)
- [ ] CTAs (OCS) have measurable events (TP) 
- [ ] Events (TP) have technical implementation (TADE)
- [ ] Full user journey is trackable end-to-end

## Phase 3: Implementation Readiness Validation

### 3.1 Technical Feasibility Check
```yaml
v1a_readiness:
  sitemap_actionable: true
  cta_strategy_implementable: true  
  nurture_flows_automatable: true
  
v1b_readiness:
  events_trackable: true
  gtm_triggers_configurable: true
  platform_integrations_feasible: true
  data_flow_implementable: true
```

### 3.2 Privacy Compliance Validation
- [ ] All PII removed from event parameters
- [ ] Consent management integrated throughout tracking
- [ ] Data retention policies specified
- [ ] GDPR compliance addressed in identity policy
- [ ] test_mode exclusion prevents production data pollution

### 3.3 Content-Measurement Coherence
- [ ] What pages promise (SIANL) can be measured (TP)
- [ ] CTA messaging (OCS) aligns with event tracking (TP)
- [ ] Nurture content themes (NA) support tracking events (TP)
- [ ] Technical limitations (TADE) don't break content strategy

## Phase 4: Quality Gate Red-Team Validation

### 4.1 Content Strategy Red-Team
- "Which page has a primary CTA that isn't measurable?"
- "Which section lacks evidence and needs proof elements?"
- "Where could CTA confusion create decision paralysis?"
- "Which nurture trigger lacks a trackable event?"

### 4.2 Measurement Strategy Red-Team
- "Where could event renaming break historical data?"
- "Which parameter could accidentally contain PII?"
- "What consent scenario would accidentally send marketing events?"
- "Which identity resolution gap could cause attribution loss?"

### 4.3 Technical Implementation Red-Team
- "Which GTM trigger could fail in different browsers?"
- "Where could environment variable misconfiguration break tracking?"
- "Which API integration has no fallback for failures?"
- "What security vulnerability exists in data handling?"

## Phase 5: Conflict Resolution Process

### 5.1 CTA-Event Conflicts
**Process:** Return to OCS and TP with specific cross-reference question
**Example:** "OCS: CTA 'bookConsultation' doesn't match TP event 'consultation_booking'. Which should change?"

### 5.2 Technical Feasibility Conflicts
**Process:** Coordinate between TP and TADE for viable solutions
**Example:** "TP: Event 'scroll_depth_complete' isn't feasible per TADE. Alternative measurement?"

### 5.3 Content-Measurement Alignment Conflicts
**Process:** Escalate to orchestrator for strategic decision
**Example:** "MWSD: SIANL page promise conflicts with TP measurement capability. Priority?"

## Phase 6: Final Assembly Process

### 6.1 v1A Document Structure
```markdown
# Macro Strategy v1A — Pages & Offers

## §1 Pages Overview & Template Narratives
### 1.1 Pages Overview
[SIANL pages table]
### 1.2 Template Narratives  
[SIANL detailed narratives]

## §2 Offer & CTA Strategy
### 2.1 Offer & CTA Mapping Matrix
[OCS mapping across temperature stages]
### 2.2 Page-Type CTA Defaults
[OCS placement and optimization guidelines]

## §3 Nurture Flow Architecture  
### 3.1 NO-PAY Branch
[NA educational/credibility/objection sequences]
### 3.2 CUSTOMER Branch  
[NA onboarding/value/expansion sequences]
```

### 6.2 v1B Document Structure
```markdown
# Macro Strategy v1B — Tracking & Tech

## §1 Key Actions → Events Mapping
[TP action-to-event cross-reference table]

## §2 Event & Parameter Dictionary
### 2.1 Event Dictionary
[TP complete event specifications]
### 2.2 Parameter Dictionary
[TP parameter types and constraints]

## §3 Destinations & Integration
[TP platform destination mappings]

## §4 GTM Triggers & Implementation  
[TADE trigger specifications and examples]

## §5 Technical Architecture & Data Flow
### 5.1 Technology Stack
[TADE architecture components]
### 5.2 Environment Configuration
[TADE dev/staging/prod setup]
### 5.3 Data Flow Diagrams
[TADE integration and data movement]
### 5.4 Identity & Privacy Policy
[TADE identity resolution and compliance]
```

### 6.3 Quality Gate Sign-Off
- [ ] All mandatory sections complete with real data
- [ ] No placeholder values remaining (TBD, TODO, etc.)  
- [ ] Cross-references valid between v1A and v1B sections
- [ ] snake_case naming enforced throughout
- [ ] CTA → Event cross-links verified
- [ ] Implementation examples syntactically valid

## Phase 7: Acceptance Criteria Verification

### 7.1 v1A Must-Have Criteria (Blocking)
- [ ] Every page has Must Prove + Evidence + Primary CTA
- [ ] One primary CTA per page; secondaries feed journey
- [ ] Offer mapping covers cold/warm/hot temperatures
- [ ] Nurture flows have Purpose + Trigger for each step
- [ ] Exit conditions clearly defined for all flows

### 7.2 v1B Must-Have Criteria (Blocking)
- [ ] All primary CTAs appear in Key actions → events
- [ ] Events/params are snake_case; no PII
- [ ] test_mode exists and exclusion documented  
- [ ] Identity policy covers lead_id/user_id/UTM capture
- [ ] GTM triggers are implementable
- [ ] Tech architecture includes stack/repo/env vars/data flow

### 7.3 Cross-Linking Must-Have Criteria (Blocking)
- [ ] Every primary CTA has corresponding measurable event
- [ ] Critical params defined for all key events
- [ ] Nurture triggers map to trackable events
- [ ] Naming consistency between content and measurement
- [ ] Data flow supports content strategy requirements

## Phase 8: Change Log Documentation

### 8.1 Integration Decision Tracking
```yaml
integration_decisions:
  - decision: "UTM parameters only sent on conversion events"
    rationale: "Prevent parameter bloat while maintaining attribution"
    owner: "Macro Website Strategy Director"
    affects: ["TP", "TADE"]
    date: "2024-01-15"
    
  - decision: "Primary CTA limit of one per page enforced"
    rationale: "Prevent decision paralysis and optimize conversion"
    owner: "Offer & CTA Strategist"  
    affects: ["SIANL", "TP"]
    date: "2024-01-15"
```

### 8.2 Cross-Agent Conflict Resolutions
```yaml
conflicts_resolved:
  - issue: "CTA naming inconsistency between OCS and TP"
    resolution: "Enforced snake_case standard across both agents"
    agents_involved: ["OCS", "TP"]
    
  - issue: "Nurture trigger not measurable by tracking system"
    resolution: "NA modified trigger to align with TP event capabilities"
    agents_involved: ["NA", "TP", "TADE"]
```

### 8.3 Implementation Readiness Items
```yaml
ready_for_execution:
  - deliverable: "v1A wireframe and copy creation"
    dependencies: ["sitemap", "cta_strategy", "evidence_inventory"]
    target_start: "immediate"
    
  - deliverable: "v1B GTM configuration and testing"  
    dependencies: ["event_dictionary", "trigger_specs", "identity_policy"]
    target_start: "immediate"
    
  - deliverable: "Nurture sequence content creation"
    dependencies: ["flow_architecture", "trigger_mapping", "exit_conditions"]
    target_start: "post_measurement_implementation"
```

## Success Criteria Checklist

### Document Completeness
- [ ] v1A complete: sitemap, narratives, offers, CTAs, nurture flows
- [ ] v1B complete: events, parameters, triggers, architecture, data flow  
- [ ] Cross-references validated between content and measurement
- [ ] Change log documents all major integration decisions

### Implementation Readiness  
- [ ] Wireframe creation can begin immediately from v1A
- [ ] GTM configuration can begin immediately from v1B
- [ ] Content creation has evidence requirements and CTA guidelines
- [ ] Technical development has complete architecture specifications

### Quality Standards
- [ ] Avatar-first language maintained throughout
- [ ] snake_case naming enforced across all outputs
- [ ] Privacy compliance addressed comprehensively
- [ ] Content-measurement coherence validated end-to-end

Remember: The Macro Website Strategy Director owns coherence between what pages promise and what systems can measure. Success depends on the integration quality between v1A content strategy and v1B measurement strategy.