# Define Phase Orchestrator Validation Process

This template provides the step-by-step validation process for the Define Director orchestrator to ensure complete, consistent, and implementation-ready outputs.

## Phase 1: Agent Output Collection

### 1.1 Journey Strategist Output Validation
- [ ] Journey Map table complete (5 steps with all required fields)
- [ ] Emotions specified for each step (not generic terms)
- [ ] Frictions backed by evidence or customer feedback
- [ ] Hypotheses are falsifiable and measurable
- [ ] Experiment backlog has minimum 3 items with ICE scoring
- [ ] Micro-steps included (pricing modal, MB WAY, coupon apply)

### 1.2 KPI Tree Architect Output Validation
- [ ] KPI definitions mathematically sound (no division by zero)
- [ ] No numeric targets present (definitions only)
- [ ] Identity rules explicit (lead_id/user_id specifications)
- [ ] Test mode exclusion rules defined
- [ ] Attribution methodology clear (30-day last-touch)
- [ ] Guardrails prevent double-counting

### 1.3 Measurement Planner Output Validation
- [ ] Event Dictionary minimal v0 set complete
- [ ] All events follow snake_case naming convention
- [ ] Parameter Dictionary includes types and constraints
- [ ] Destinations Map covers GA4, CRM, MailerLite, Stripe
- [ ] Every KPI step has measurable events
- [ ] No event overlap or ambiguity

### 1.4 GTM Engineer Output Validation
- [ ] GTM trigger specifications are implementation-ready
- [ ] DataLayer code examples are syntactically valid
- [ ] Identity propagation rules detailed (lead_id/user_id)
- [ ] UTM governance restricted to lead_submit events
- [ ] Consent gating implemented for privacy compliance
- [ ] Test mode detection and handling implemented

### 1.5 QA Lead Output Validation
- [ ] Global QA checklist completed with pass/fail results
- [ ] PII scan completed with flagged parameters
- [ ] Privacy compliance assessment finished
- [ ] Red-team challenges addressed with responses
- [ ] Implementation readiness assessment complete
- [ ] Outstanding actions documented with owners

## Phase 2: Cross-Agent Consistency Validation

### 2.1 Naming Convention Enforcement
```bash
# Run snake_case validation across all outputs
grep -E '[A-Z]|[[:space:]]|-' events.txt && echo "FAIL: Non-snake_case found" || echo "PASS"
```

### 2.2 Identity Flow Consistency
- [ ] lead_id generation method consistent across agents
- [ ] lead_id propagation destinations match (CRM, Stripe, MailerLite)
- [ ] user_id mapping timing aligned (post-activation)
- [ ] Attribution window consistent (30 days last-touch)

### 2.3 Event-to-KPI Alignment
- [ ] Every KPI has corresponding measurable events
- [ ] Event definitions support KPI calculation requirements
- [ ] Parameter requirements align with KPI needs
- [ ] Timing specifications enable accurate attribution

### 2.4 Platform Integration Consistency
- [ ] GA4 event mappings align with enhanced ecommerce
- [ ] CRM field mappings support lead scoring and lifecycle
- [ ] Stripe metadata includes required attribution data
- [ ] MailerLite subscriber properties enable segmentation

## Phase 3: Implementation Readiness Validation

### 3.1 Technical Feasibility Check
```yaml
gtm_readiness:
  triggers_configurable: true
  variables_available: true
  consent_integration: true
  
frontend_readiness:
  datalayer_examples: true
  identity_management: true
  event_tracking: true

platform_readiness:
  ga4_configuration: true
  crm_field_mapping: true
  stripe_webhooks: true
  mailerlite_automation: true
```

### 3.2 Privacy Compliance Validation
- [ ] All PII removed from event parameters
- [ ] Consent management integrated throughout
- [ ] Data retention policies specified (365-day lead_id)
- [ ] GDPR subject rights procedures defined

### 3.3 Data Quality Standards
- [ ] Test mode exclusion implemented consistently
- [ ] Identity deduplication rules prevent double-counting
- [ ] Event timing specifications prevent data gaps
- [ ] Parameter validation rules defined

## Phase 4: Conflict Resolution Process

### 4.1 Naming Conflicts
**Process:** Return to owning agent with single blocking question
**Example:** "MP: Event 'leadSubmit' violates snake_case. Should this be 'lead_submit'?"

### 4.2 Technical Conflicts  
**Process:** Escalate to technical specialist
**Example:** "GDL: CRM API doesn't support lead_id field. Alternatives?"

### 4.3 Attribution Conflicts
**Process:** Defer to KPI Tree Architect for resolution
**Example:** "KTA: GA4 vs Stripe purchase attribution mismatch. Which is source of truth?"

## Phase 5: Final Assembly Process

### 5.1 Document Structure
```markdown
# Define Phase — Journey & Measurement (v1.0)

## §1 Journey Map & Experiment Backlog
[Journey Strategist output]

## §2 KPI Mini-Tree & Guardrails  
[KPI Tree Architect output]

## §3 Measurement Plan v0
### 3.1 Event Dictionary
[Measurement Planner output]
### 3.2 Parameter Dictionary  
[Measurement Planner output]
### 3.3 Destinations Map
[Measurement Planner output]
### 3.4 GTM Triggers & DataLayer
[GTM Engineer output]

## §4 Naming & ID Rules
[GTM Engineer identity rules]

## §5 QA & Acceptance Criteria
[QA Lead validation results]

## Change Log
[Document major decisions and changes]
```

### 5.2 Quality Gate Sign-Off
- [ ] All mandatory sections complete
- [ ] No placeholder values remaining (TBD, TODO, etc.)
- [ ] Cross-references valid between sections
- [ ] snake_case naming enforced throughout
- [ ] Implementation examples syntactically valid

### 5.3 Acceptance Criteria Verification
**Must-Have (Blocking):**
- [ ] Journey emotions/frictions/hypotheses complete
- [ ] KPI definitions without targets
- [ ] Events/parameters snake_case
- [ ] PII removed from parameters
- [ ] Identity rules explicit
- [ ] Test mode exclusion implemented

**Should-Have (Warning):**
- [ ] Red-team challenges addressed
- [ ] Cross-platform consistency verified
- [ ] Code examples validated
- [ ] Attribution logic consistent

## Phase 6: Change Log Documentation

### 6.1 Decision Tracking
```yaml
major_decisions:
  - decision: "UTM parameters restricted to lead_submit only"
    rationale: "Prevent parameter bloat and focus attribution"
    owner: "Define Director"
    date: "2024-01-15"
    
  - decision: "lead_id 365-day expiration policy"
    rationale: "Balance attribution needs with privacy compliance"
    owner: "KPI Tree Architect + QA Lead"
    date: "2024-01-15"
```

### 6.2 Conflict Resolutions
```yaml
conflicts_resolved:
  - issue: "Event naming inconsistency across agents"
    resolution: "Enforced snake_case standard, updated all outputs"
    agents_involved: ["MP", "GDL"]
    
  - issue: "PII in email_address parameter"
    resolution: "Removed parameter, use lead_id for identification"
    agents_involved: ["QAG", "MP"]
```

### 6.3 Outstanding Items
```yaml
future_iterations:
  - item: "Cross-device identity resolution"
    priority: "P3"
    target_version: "v2.0"
    
  - item: "Multi-touch attribution modeling"
    priority: "P2" 
    target_version: "v1.5"
```

## Success Criteria Checklist

**Document Completeness:**
- [ ] All sections filled with real data (no placeholders)
- [ ] Change log documents major decisions
- [ ] Outstanding actions have clear owners and deadlines

**Implementation Readiness:**
- [ ] GTM configuration can begin immediately
- [ ] Frontend integration has working code examples
- [ ] Platform configurations have specific field mappings
- [ ] QA validation provides clear pass/fail criteria

**Quality Standards:**
- [ ] snake_case naming enforced throughout
- [ ] Privacy compliance addressed comprehensively
- [ ] Mathematical accuracy verified for all KPIs
- [ ] Cross-platform consistency validated

Remember: The orchestrator is accountable for the final document quality and implementation readiness. This validation process ensures nothing falls through the cracks.