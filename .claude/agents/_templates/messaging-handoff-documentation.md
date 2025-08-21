# Messaging Phase — Handoff Documentation

This document defines the handoff protocols, data requirements, and quality standards for the Messaging Phase agents working on Email & WhatsApp automation sequences.

## Overview

The Messaging Phase transforms website copy and strategy into executable automation sequences covering:
- **NO-PAY Sequence**: 5-step email nurture (D0+20m, D1, D3, D5, D7) with optional WhatsApp
- **CUSTOMER Sequence**: Welcome, onboarding, and support messaging across email and WhatsApp
- **Compliance Package**: GDPR, deliverability, and template approval requirements

## Agent Handoff Matrix

| From Agent | To Agent | Deliverables | Format | Timeline |
|------------|----------|-------------|--------|----------|
| MPL | All Subagents | Project brief, requirements, brand voice | Markdown brief | Day 0 |
| VPC | ECL | Proof library, testimonials, claims map | JSON + CSV | Day 1-2 |
| ECL | TJM | Email assets with CTA requirements | JSON assets | Day 3-4 |
| TJM | WTL | Trigger timing and sequence coordination | JSON config | Day 4-5 |
| ECL + VPC | WTL | Key messaging and proof for WhatsApp adaptation | Text summaries | Day 4-5 |
| WTL | CDS | WhatsApp templates for approval submission | JSON templates | Day 5-6 |
| TJM | CDS | Sequence configuration for compliance validation | JSON config | Day 5-6 |
| All Subagents | MPL | Final deliverables for integration | JSON + docs | Day 7-8 |

## Input Requirements by Agent

### Messaging Program Lead (MPL) - Inputs Required

**From Discovery Phase:**
- Avatar VoC research and emotional triggers
- Customer language patterns and pain points
- Success metrics and outcome language

**From Define Phase:**
- Journey trigger specifications (lead_submit, purchase_success)
- Measurement event names and parameters (snake_case)
- Suppression rule requirements (CRM integration points)

**From Macro Website Strategy Phase:**
- v1A offer positioning and temperature mapping
- v1B measurement specifications and UTM conventions
- Landing page URLs and conversion flow architecture

**From Copy Phase:**
- Brand voice guidelines and tone specifications
- Block ID structure and copy organization patterns
- Proof requirements and claims verification standards

**From Execute Phase:**
- Landing page designs and measurement annotations
- CTA designs and interaction specifications
- Attribution requirements for cross-channel tracking

### Email Copy Lead (ECL) - Inputs Required

**From VPC:**
- Verified testimonials with usage permissions
- Case study proof points with specific metrics
- Social proof elements (logos, credentials, awards)
- Claims verification status and conservative reframes

**From MPL:**
- Brand voice guidelines and Avatar language patterns
- NO-PAY and CUSTOMER sequence requirements
- Email deliverability guidelines and content restrictions
- A/B testing priorities and optimization focus areas

**From Copy Phase:**
- Website copy voice consistency requirements
- Block ID patterns for cross-channel alignment
- Proof mapping standards and verification processes

### WhatsApp Template Lead (WTL) - Inputs Required

**From ECL:**
- Key messaging themes and value propositions
- Proof points optimized for mobile/messaging format
- CTA approaches and conversion language
- Merge field requirements and personalization strategies

**From TJM:**
- Template timing and sequence coordination requirements
- Trigger conditions and opt-in validation needs
- Rate limiting considerations and quiet hours
- Cross-channel messaging coordination specifications

**From CDS:**
- BSP template category requirements and approval guidelines
- Opt-in consent mechanism specifications
- GDPR compliance requirements for WhatsApp data handling
- Multi-language requirements (pt-PT, en-US)

### Trigger & Journey Mapper (TJM) - Inputs Required

**From Define Phase:**
- Journey mapping and trigger event specifications
- CRM integration points and data synchronization requirements
- Measurement event names and parameter structure

**From ECL:**
- Email sequence timing preferences and send cadence
- CTA hierarchy and primary conversion objectives
- Personalization data requirements and merge field mapping

**From Copy Phase:**
- Measurement tag alignment and event naming conventions
- Cross-channel consistency requirements for attribution
- Block ID alignment for consistent tracking

### VoC & Proof Curator (VPC) - Inputs Required

**From Discovery Phase:**
- Existing testimonials and client success stories
- Avatar research and customer language documentation
- Case study database and client consent records

**From Copy Phase:**
- Website claims requiring evidence backing
- Proof mapping standards and verification requirements
- Legal compliance requirements for testimonial usage

**From MPL:**
- Messaging claims audit and verification priorities
- Email and WhatsApp format optimization requirements
- Cross-channel proof consistency standards

### Compliance & Deliverability Steward (CDS) - Inputs Required

**From TJM:**
- Sequence configuration and automation logic
- Suppression rule specifications and business logic
- Cross-platform integration requirements (email, WhatsApp, CRM)

**From WTL:**
- WhatsApp templates requiring BSP submission and approval
- Opt-in consent mechanism specifications
- Multi-language compliance requirements for Portuguese/EU law

**From ECL:**
- Email content for deliverability review and optimization
- Subject lines requiring spam filter analysis
- Unsubscribe mechanism and footer requirements

## Output Requirements by Agent

### Email Copy Lead (ECL) - Deliverables

**Email Assets (JSON format):**
- Complete NO-PAY sequence (5 emails) with A/B subject variants
- Complete CUSTOMER sequence (2-3 emails) with onboarding flow
- Merge field mapping with fallback strategies
- CTA specifications with action + outcome formulas

**Quality Standards:**
- Subject lines optimized for deliverability (spam score analysis)
- Email bodies mobile-optimized with scannable formatting
- Merge fields tested with realistic data samples
- CTAs follow Action + Outcome formula consistently

**Handoff Notes for TJM:**
- Send time preferences and sequence cadence recommendations
- CTA priority hierarchy and conversion objective alignment
- Personalization data requirements and merge field dependencies
- Cross-sequence consistency notes for attribution tracking

### WhatsApp Template Lead (WTL) - Deliverables

**WhatsApp Templates (JSON format):**
- CUSTOMER sequence templates (welcome, access, support)
- Optional NO-PAY templates (case study, urgent offers)
- Variable mapping with fallback strategies and data validation
- Button configurations (URL, Quick Reply, Call buttons)

**Multi-Language Assets:**
- Portuguese (pt-PT) versions with cultural adaptation
- English (en-US) versions for international audiences
- Variable mapping consistency across language variants

**Compliance Documentation:**
- Template category justifications (Utility vs Marketing)
- BSP submission packages with sample data and use case descriptions
- Opt-in consent requirements and validation mechanisms

**Handoff Notes for CDS:**
- Template approval timeline and resubmission strategies
- Opt-in consent integration requirements
- Rate limiting and quality rating maintenance strategies

### Trigger & Journey Mapper (TJM) - Deliverables

**Sequence Configurations (JSON format):**
- Complete trigger logic for NO-PAY and CUSTOMER sequences
- Entry/exit conditions with edge case handling
- Suppression rules with business logic justification
- Scheduling optimization for Europe/Lisbon timezone

**UTM Parameter Management:**
- Standardized UTM conventions aligned with v1B specifications
- Dynamic UTM generation for all email and WhatsApp links
- Attribution tracking setup for cross-channel measurement

**Integration Specifications:**
- Email platform configuration requirements
- WhatsApp BSP integration specifications
- CRM integration and data synchronization requirements

**Quality Assurance Documentation:**
- Testing protocols for sequence validation
- Edge case handling and error recovery procedures
- Performance monitoring and alerting requirements

### VoC & Proof Curator (VPC) - Deliverables

**Proof Library (JSON + CSV format):**
- Verified testimonials with legal usage permissions
- Case study database with metrics and methodology documentation
- Social proof assets (logos, awards, media mentions)
- Claims-to-evidence mapping for all messaging sequences

**Testimonial Optimization:**
- Email-format testimonials (short, medium, long versions)
- WhatsApp-format testimonials (character-limit friendly)
- Portuguese and English testimonial variants
- Emotional impact quotes and metric callouts

**Legal Compliance Documentation:**
- Testimonial consent records with renewal tracking
- GDPR compliance for customer data usage
- Usage rights documentation for all proof elements

**Handoff Notes for ECL/WTL:**
- Proof integration recommendations for each message
- Conservative reframe suggestions for unsupported claims
- Cross-channel proof consistency guidelines

### Compliance & Deliverability Steward (CDS) - Deliverables

**GDPR Compliance Package:**
- Consent management system specifications
- Data retention policies and deletion procedures
- Privacy policy updates for messaging channels
- Subject rights implementation (access, rectification, erasure)

**Email Deliverability Setup:**
- DNS authentication configuration (SPF, DKIM, DMARC)
- Sender reputation monitoring and alerting
- Email content compliance guidelines and spam filter optimization
- List hygiene procedures and bounce handling

**WhatsApp Compliance Documentation:**
- Template approval tracking and status management
- BSP relationship management and escalation procedures
- Opt-in consent tracking with timestamp and source documentation
- Rate limiting and quality rating monitoring

**Monitoring and Alerting:**
- Compliance violation detection and response procedures
- Deliverability performance monitoring and thresholds
- Legal compliance audit schedules and documentation requirements

## Quality Gates & Validation

### Pre-Integration Checklist

**Content Quality (ECL + WTL):**
- [ ] All email subjects tested for spam filter compliance
- [ ] WhatsApp templates character limits respected
- [ ] Voice consistency maintained across channels
- [ ] CTAs follow Action + Outcome formula
- [ ] Merge fields tested with realistic data samples

**Technical Integration (TJM):**
- [ ] Sequence entry/exit conditions validated with test data
- [ ] UTM parameters follow v1B naming conventions
- [ ] Suppression rules prevent over-messaging scenarios
- [ ] Timezone handling accurate for Europe/Lisbon
- [ ] Cross-platform trigger coordination validated

**Proof & Evidence (VPC):**
- [ ] All claims backed by verifiable evidence
- [ ] Testimonials have legal usage permissions
- [ ] Case study metrics include methodology and timeframe
- [ ] Social proof elements current and authentic
- [ ] Cross-channel proof consistency maintained

**Legal & Compliance (CDS):**
- [ ] GDPR consent mechanisms implemented and tested
- [ ] Email authentication records configured and validated
- [ ] WhatsApp templates approved by BSP
- [ ] Opt-out mechanisms functional across all channels
- [ ] Data retention policies documented and implemented

### Integration Testing Protocol

1. **Sequence Logic Validation**
   - Test entry conditions with sample data
   - Validate exit conditions and suppression rules
   - Confirm scheduling and timezone handling

2. **Cross-Channel Consistency**
   - Verify voice alignment between email and WhatsApp
   - Test UTM parameter generation and tracking
   - Validate proof integration across channels

3. **Compliance Verification**
   - Test consent tracking and opt-out mechanisms
   - Validate deliverability configuration
   - Confirm template approval status

4. **Performance Testing**
   - Load test sequence triggers and processing
   - Validate rate limiting and quiet hours
   - Test error handling and recovery procedures

## Success Criteria & Sign-off

### Messaging Pack v1.0 Definition of Done

**Content Complete:**
- All NO-PAY and CUSTOMER sequence assets created and reviewed
- Voice consistency maintained across all messaging channels
- Proof integration complete with legal compliance verified
- A/B testing variants prepared for optimization opportunities

**Technical Ready:**
- Sequence configurations deployed and tested
- UTM parameters generating correctly for attribution
- Suppression rules functional and business-logic validated
- Integration specifications documented for platform deployment

**Compliance Verified:**
- GDPR consent mechanisms implemented and audited
- Email deliverability optimized with authentication configured
- WhatsApp templates approved with BSP documentation
- Legal review completed with risk mitigation strategies

**Quality Assured:**
- Cross-agent consistency validated through integration testing
- Edge case handling tested and documented
- Performance monitoring configured with appropriate alerting
- Documentation complete for ongoing maintenance and optimization

### Final Sign-off Requirements

- [ ] **MPL Approval**: Integration complete, quality standards met
- [ ] **Legal Review**: Compliance requirements satisfied, risks mitigated
- [ ] **Technical Validation**: Integration specifications tested and documented
- [ ] **Business Approval**: Messaging objectives aligned with strategy

---

**Version**: 1.0  
**Last Updated**: [Current Date]  
**Next Review**: [Quarterly]  
**Owner**: Messaging Program Lead (MPL)