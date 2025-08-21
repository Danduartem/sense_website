# Execute Phase QA & Validation Checklists

## Orchestrator (Design Program Lead) Master Checklist

### Phase Completion Gates

**Foundation Setup Complete:**
- [ ] All subagents briefed on project requirements and guardrails
- [ ] Brand guidelines and component library distributed
- [ ] v1A/v1B specifications confirmed and accessible
- [ ] ICE prioritization framework established with thresholds

**Development Coordination:**  
- [ ] Wireframe → Copy handoff completed successfully
- [ ] Copy → Measurement annotation handoff completed
- [ ] Measurement → Hi-fi design handoff completed for approved modules
- [ ] All outputs → Prototype/handoff coordination completed

**Final Package Assembly:**
- [ ] All deliverables collected from subagents
- [ ] Cross-agent consistency validated and conflicts resolved
- [ ] Quality standards applied across all outputs
- [ ] Execute Package v1.0 assembled with complete documentation

### Guardrail Enforcement Checklist

**Single CTA Rule:**
- [ ] Every page has exactly one primary CTA (no competing actions)
- [ ] CTA hierarchy clearly established (primary > secondary > tertiary)
- [ ] CTA placement optimized for conversion across all breakpoints

**Measurement Consistency:**
- [ ] All interactive elements have measurement overlays
- [ ] Event naming uses snake_case consistently
- [ ] No PII included in any event parameters
- [ ] test_mode implementation verified for all events

**Design System Compliance:**
- [ ] All designs use established tokens (no rogue styles)
- [ ] Component specifications align with existing design system
- [ ] New patterns documented and approved for system addition

**Accessibility Standards:**
- [ ] WCAG 2.1 AA compliance verified (≥4.5:1 contrast ratio)
- [ ] Focus management properly defined for all interactions
- [ ] Keyboard navigation paths tested and documented

---

## IA/Wireframe Lead Quality Checklist

### Wireframe Completeness

**Page Specification Standards:**
- [ ] Page Goal defined clearly for every template
- [ ] Primary KPI identified and measurable
- [ ] Must Prove requirements (exactly 3) established
- [ ] Primary CTA placement optimized above-the-fold

**Information Architecture:**
- [ ] Module hierarchy follows content priority principles (F-pattern reading)
- [ ] Progressive disclosure prevents decision paralysis
- [ ] Single-path user flows with clear next steps
- [ ] Navigation structure supports primary user goals

**Responsive Design:**
- [ ] Mobile-first approach (375px base) with single-column layouts
- [ ] Tablet adaptation (744px) balances content density
- [ ] Desktop optimization (1280px) maximizes screen real estate
- [ ] Touch-friendly interactions (44px minimum target size)

**Copy Integration Readiness:**
- [ ] All copy slots clearly labeled with specifications
- [ ] Character limits defined where necessary
- [ ] Tone and voice guidance provided per content area
- [ ] CTA format specified (action + outcome requirements)

### Module System Validation

**Standard Module Library:**
- [ ] Hero modules properly configured for page goals
- [ ] Proof modules strategically placed for credibility
- [ ] Service modules support conversion objectives
- [ ] Content modules enhance user engagement
- [ ] Navigation/support modules maintain usability

**Module Specifications:**
- [ ] Purpose clearly defined for each module
- [ ] Content requirements documented
- [ ] Copy slots identified for UXW handoff
- [ ] Responsive behavior specified
- [ ] Interaction elements marked for measurement

---

## UX Writer Quality Checklist

### Copy Strategy & Voice

**Voice Profile Consistency:**
- [ ] Personality aligns with Avatar research from Discovery
- [ ] Expertise level appropriate without intimidation
- [ ] Emotional tone builds confidence and trust
- [ ] Language style matches customer VoC patterns

**Customer Language Integration:**
- [ ] Pain words reflect how Avatar describes problems
- [ ] Solution words match desired outcome language
- [ ] Objection phrases address actual hesitations
- [ ] Success language mirrors customer achievement vocabulary

### Conversion Copy Standards  

**Headlines & Value Propositions:**
- [ ] Hero headlines focus on outcomes/benefits (6-10 words max)
- [ ] Subheadlines elaborate value proposition (15-25 words)
- [ ] Benefit bullets follow "Outcome → Method → Proof" format
- [ ] Section headlines guide users through content hierarchy

**CTA Optimization:**
- [ ] Every CTA includes both ACTION and OUTCOME
- [ ] CTA labels create urgency or value reinforcement
- [ ] Button copy specific to context and user intent
- [ ] Progressive CTA strategy increases commitment gradually

**Trust & Credibility Copy:**
- [ ] Guarantees include specific terms and timeframes
- [ ] Testimonials selected for emotional resonance and Avatar alignment
- [ ] Privacy reassurances address common security concerns
- [ ] Social proof integration supports conversion goals

### Microcopy & User Experience

**Form Copy Requirements:**
- [ ] Field labels conversational ("What should we call you?" vs "Name")
- [ ] Helper text anticipates confusion and provides guidance
- [ ] Error messages guide toward resolution with friendly tone
- [ ] Success confirmations set clear expectations for next steps

**FAQ Development:**
- [ ] Top objection categories addressed comprehensively
- [ ] Reframe formula applied (Acknowledge + Reframe + Proof)
- [ ] Q&A pairs use customer language and concerns
- [ ] FAQ placement strategic for objection handling

---

## Measurement Annotator Quality Checklist

### Overlay Coverage & Syntax

**Complete Element Coverage:**
- [ ] Every clickable element annotated with [E:event|params] syntax
- [ ] All form submissions tracked with conversion parameters
- [ ] Navigation interactions measured for user journey analysis
- [ ] Content engagement events capture behavior patterns

**Syntax & Naming Standards:**
- [ ] Event names use snake_case consistently (no camelCase/PascalCase)
- [ ] Parameter names follow snake_case convention
- [ ] Overlay format strictly adheres to [E:event_name|param1=value1] pattern
- [ ] Special characters avoided in event and parameter names

### Parameter Standards & Privacy

**Required Parameters (All Events):**
- [ ] timestamp (auto-generated ISO 8601 datetime)
- [ ] page_template (home, service_detail, pricing, etc.)
- [ ] session_id (UUID for session tracking)
- [ ] test_mode (boolean for dev/QA exclusion)

**Identity & Privacy Compliance:**
- [ ] lead_id generated on first form interaction
- [ ] user_id mapping implemented for account creation
- [ ] NO PII in event parameters (names, emails, phone numbers)
- [ ] ID mapping system properly documented and implemented

**Conversion Event Parameters:**
- [ ] form_type specified for all form submissions
- [ ] service_interest captured for lead qualification
- [ ] UTM parameters attached only to conversion events
- [ ] Critical parameters present for funnel analysis

### Test Mode & QA Implementation

**Development Environment Detection:**
- [ ] test_mode=true for localhost events
- [ ] test_mode=true for staging domain events
- [ ] test_mode=true when URL contains ?test=true parameter
- [ ] test_mode exclusion prevents production data pollution

**Historical Continuity:**
- [ ] No breaking changes to existing event names
- [ ] Parameter additions are additive only
- [ ] Backwards compatibility maintained for reporting
- [ ] Migration path documented for any necessary changes

---

## Hi-Fi Visual Designer Quality Checklist

### ICE Prioritization Validation

**ICE Scoring Accuracy:**
- [ ] Impact scores (1-5) justified by conversion potential
- [ ] Confidence scores (1-5) backed by user research or proven patterns
- [ ] Effort scores (1-5) reflect realistic design and development complexity
- [ ] ICE calculation correct: (Impact × Confidence) / Effort

**Priority Module Selection:**
- [ ] Automatic hi-fi for ICE ≥6.0 (hero, CTAs, forms, pricing, mobile nav)
- [ ] Conditional hi-fi for ICE 4.0-5.9 with explicit justification
- [ ] Wireframe-only for ICE <4.0 to prevent scope creep
- [ ] No exceptions to ICE threshold without DPL approval

### Design Token System Compliance

**Token Usage Standards:**
- [ ] All colors from established color system (no custom hex values)
- [ ] Typography uses defined scale and weights only
- [ ] Spacing follows defined increment system (4px base unit)
- [ ] No rogue styles outside established token system

**Component System Integration:**
- [ ] Button states match system specifications exactly
- [ ] Form elements follow established patterns
- [ ] Interactive states defined for all UI components
- [ ] New components documented for design system addition

### Accessibility Compliance (WCAG 2.1 AA)

**Color Contrast Standards:**
- [ ] Text contrast ≥4.5:1 for normal text (verified with tools)
- [ ] Large text contrast ≥3:1 for 18px+ or 14px+ bold
- [ ] Non-text contrast ≥3:1 for UI components and icons
- [ ] Contrast ratios documented for all color combinations

**Focus Management:**
- [ ] Visible focus indicators on all interactive elements
- [ ] Focus order follows logical page structure
- [ ] Focus trap implementation specified for modals
- [ ] Skip links designed for keyboard navigation

**Responsive Design:**
- [ ] Designs functional at 375px (mobile)
- [ ] Optimal layout at 744px (tablet)
- [ ] Enhanced experience at 1280px (desktop)
- [ ] Touch targets meet 44px × 44px minimum size

---

## Prototype & Handoff Engineer Quality Checklist

### Prototype Flow Coverage

**Primary Flows Complete:**
- [ ] Home → Service → Lead Generation flow fully functional
- [ ] Service → Pricing → Checkout flow implemented end-to-end
- [ ] Article → Newsletter Subscription flow working correctly
- [ ] Contact → Consultation Booking flow complete with success states

**Flow Quality Standards:**
- [ ] Key interactions demonstrate expected behavior accurately
- [ ] Error states and edge cases included in prototypes
- [ ] Success states communicate clear next steps
- [ ] Loading states and transitions enhance user experience

### Component Specification Excellence

**Specification Completeness:**
- [ ] All components documented with precise measurements
- [ ] Interactive states defined (default, hover, focus, active, disabled)
- [ ] Responsive behavior specified for all breakpoints
- [ ] Implementation notes address technical feasibility

**Developer Readiness:**
- [ ] HTML structure examples provided for complex components
- [ ] CSS classes and purposes clearly documented
- [ ] JavaScript behavior requirements specified
- [ ] Dependencies and external resources identified

### Asset Optimization & Export

**Image Format Standards:**
- [ ] Icons exported as optimized SVG with accessibility attributes
- [ ] Photography provided in WebP/AVIF with JPG fallbacks
- [ ] Graphics exported in appropriate formats (SVG preferred)
- [ ] Multiple resolutions provided (1x, 2x for retina)

**Asset Organization:**
- [ ] Consistent naming convention applied
- [ ] Proper folder structure for easy integration
- [ ] Asset bundle complete with all required files
- [ ] Documentation includes usage guidelines

### Engineering Handoff Package

**Design Token Exports:**
- [ ] JSON format for programmatic access
- [ ] CSS variables for direct stylesheet integration
- [ ] SCSS variables for preprocessing workflows
- [ ] Token structure matches design system architecture

**Documentation Quality:**
- [ ] Implementation guides clear and actionable
- [ ] Accessibility requirements specific and testable
- [ ] Testing protocols defined for validation
- [ ] Code examples provided for complex interactions

---

## Red-Team Validation Questions

### User Experience Perspective
- "Which CTA lacks clear next-step guidance or outcome expectation?"
- "Where could users get confused about the primary action on this page?"
- "What mobile usability issues are we overlooking in our responsive design?"
- "Which content elements could create cognitive overload or decision paralysis?"

### Measurement & Analytics Perspective  
- "Which user interaction could we lose visibility into with current event tracking?"
- "Where could event renaming break historical data analysis?"
- "What consent scenario could accidentally send marketing events?"
- "Which missing parameter could prevent proper attribution or funnel analysis?"

### Technical Feasibility Perspective
- "Which design element lacks clear implementation guidance for developers?"
- "What accessibility requirement could block launch if not addressed early?"
- "Which component specification is ambiguous and could cause development delays?"
- "What performance implications haven't been considered in the current design?"

### Privacy & Compliance Perspective
- "Which events could accidentally capture personal information?"
- "What happens if users submit PII in form fields we're tracking?"
- "How do we handle right-to-be-forgotten requests for event data?"
- "Which measurement approaches could violate privacy regulations?"

### Business Impact Perspective
- "Which conversion optimization opportunity are we missing?"
- "What objection are we not addressing that could prevent conversions?"
- "Which proof elements could be stronger or more credible?"
- "What competitive advantages are we not highlighting effectively?"

---

## Final Assembly & Sign-Off Checklist

### Execute Package v1.0 Completeness

**Core Deliverables Present:**
- [ ] Wireframes complete for all page templates with responsive specs
- [ ] Copy deck filled with all headlines, CTAs, microcopy, and FAQs
- [ ] Measurement overlay map with complete event specifications  
- [ ] Hi-fi designs for all approved high-ICE modules
- [ ] Clickable prototypes for all primary user flows
- [ ] Engineering handoff bundle with specs, tokens, and assets

**Quality Validation:**
- [ ] All quality checklists completed by respective agents
- [ ] Cross-agent consistency verified and conflicts resolved
- [ ] Accessibility compliance documented and validated
- [ ] Measurement coverage complete with no orphaned interactions

**Documentation Standards:**
- [ ] Change log documents major design decisions
- [ ] Implementation notes address technical requirements
- [ ] Testing protocols defined for validation
- [ ] File organization follows established structure

**Readiness Criteria:**
- [ ] Engineering team can begin implementation immediately
- [ ] All requirements clear with no ambiguous specifications  
- [ ] Asset bundle complete with optimized formats
- [ ] Measurement implementation ready for QA testing

**Final Sign-Off:**
- [ ] Design Program Lead approval on complete package
- [ ] Stakeholder review completed with feedback incorporated
- [ ] Execute Package v1.0 ready for engineering handoff
- [ ] Success metrics defined for post-launch evaluation