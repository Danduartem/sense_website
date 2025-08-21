# Agent Registry

This document provides a comprehensive overview of all Claude agents in the system, organized by phase and specialization.

## Project Phases Overview

The agent system is organized into ten main phases:

1. **Discovery Phase** - Foundational research and avatar development
2. **Define Phase** - Journey mapping and measurement framework
3. **Macro Phase** - Website strategy and implementation architecture
4. **Landing Page Strategy Phase** - Single-page landing page conversion optimization with proof-driven sections and temperature-based offer mapping
5. **Execute Phase** - Design implementation and engineering handoff
6. **Execute Dev Phase** - Technical development implementation with Eleventy + Vite + Tailwind architecture
7. **Build Phase** - Production-ready development with quality gates and deployment
8. **Copy Phase** - Conversion-optimized copy creation with evidence backing and compliance
9. **Messaging Phase** - Email and WhatsApp automation sequences with compliance and deliverability
10. **GTM Phase** - Google Tag Manager implementation with server-side events, consent management, and comprehensive tracking validation

Each phase has one orchestrator agent that coordinates multiple specialized subagents.

---

## Discovery Phase Agents

### Orchestrator
- **[Discovery Director](./discovery-orchestrator/discovery-director.md)** - Coordinates discovery subagents to produce complete Discovery documents with Avatar-first depth, clear offers, and KPI definitions

### Subagents
- **[Business Snapshot Analyst](./discovery-subagents/business-snapshot-analyst.md)** - Market analysis, competitive landscape, and business context assessment
- **[Offer Architect](./discovery-subagents/offer-architect.md)** - Service packaging, pricing strategy, and value proposition development
- **[Avatar & VoC Synthesizer](./discovery-subagents/avatar-voc-synthesizer.md)** - Customer psychology, persona development, and voice-of-customer analysis
- **[Measurement Mapper](./discovery-subagents/measurement-mapper.md)** - KPI identification, measurement framework, and analytics planning
- **[Inventory & Access Steward](./discovery-subagents/inventory-access-steward.md)** - Asset inventory, platform access, and technical resource management

---

## Define Phase Agents

### Orchestrator
- **[Define Director](./define-orchestrator/define-director.md)** - Coordinates define subagents to create journey maps, KPI trees, and measurement plans

### Subagents
- **[Journey Strategist](./define-subagents/journey-strategist.md)** - Customer journey mapping, friction identification, and conversion optimization
- **[KPI Tree Architect](./define-subagents/kpi-tree-architect.md)** - Metric hierarchy design, attribution modeling, and measurement governance
- **[Measurement Planner](./define-subagents/measurement-planner.md)** - Event dictionary creation, parameter specification, and tracking implementation
- **[GTM Data Layer Engineer](./define-subagents/gtm-data-layer-engineer.md)** - Google Tag Manager configuration, data layer implementation, and trigger setup
- **[QA Governance Lead](./define-subagents/qa-governance-lead.md)** - Quality assurance, privacy compliance, and validation processes

---

## Macro Website Strategy Phase Agents

### Orchestrator
- **[Macro Website Strategy Director](./macro-website-strategy-orchestrator/macro-website-strategy-director.md)** - Coordinates macro website subagents to produce v1A (Pages & Offers) and v1B (Tracking & Tech) deliverables with coherent cross-linking between content and measurement

### Subagents
- **[Site IA & Narrative Lead](./macro-website-subagents/site-ia-narrative-lead.md)** - Sitemap architecture and page template narratives with evidence-based proof requirements
- **[Offer & CTA Strategist](./macro-website-subagents/offer-cta-strategist.md)** - Offer positioning across temperature stages (cold/warm/hot) and strategic CTA placement
- **[Nurture Architect](./macro-website-subagents/nurture-architect.md)** - Macro-level nurture flow design for NO-PAY and CUSTOMER branches with trigger-based automation logic
- **[Tracking Planner](./macro-website-subagents/tracking-planner.md)** - Event/parameter dictionary design, measurement strategy, and analytics implementation
- **[Tech Architect & Data-Flow Engineer](./macro-website-subagents/tech-architect-data-flow-engineer.md)** - Technical implementation architecture, GTM triggers, and data flow specifications

---

## Landing Page Strategy Phase Agents

### Orchestrator
- **[Landing Strategy Lead](./landing-page-orchestrator/landing-strategy-lead.md)** - Coordinates 5 specialized LP subagents to deliver a build-ready single-page Landing Page strategy with section narrative, offer/CTA mapping, tracking plan v1, and technical architecture

### Subagents
- **[LP Narrative Architect](./landing-page-subagents/lp-narrative-architect.md)** - Landing page section design, proof logic structure, mobile-first copy guidance, and Must Prove → Evidence → CTA mapping for conversion optimization
- **[Offer & CTA Strategist](./landing-page-subagents/offer-cta-strategist.md)** - Traffic temperature mapping, offer positioning across cold/warm/hot stages, exact CTA labels and anchor targets, and primary CTA governance for conversion optimization
- **[Proof & VoC Curator](./landing-page-subagents/proof-voc-curator.md)** - Evidence mapping, testimonial curation, claims verification, logo walls, case study metrics, and ensuring all landing page claims are backed by verifiable proof
- **[Measurement & GTM Lead](./landing-page-subagents/measurement-gtm-lead.md)** - Landing page tracking plan development, event/parameter specification, GTM trigger definition, analytics destination mapping, and identity/consent management for comprehensive LP measurement
- **[Technical Architect](./landing-page-subagents/technical-architect.md)** - Landing page tech stack specification, repo layout design, environment configuration, data flow architecture, and performance optimization for single-page LP implementation

---

## Execute Phase Agents

### Orchestrator
- **[Execute Design Program Lead](./execute-orchestrator/execute-design-program-lead.md)** - Coordinates execute subagents to produce build-ready design packages with wireframes, hi-fi designs, prototypes, and engineering handoff bundles

### Subagents
- **[IA & Wireframe Lead](./execute-subagents/ia-wireframe-lead.md)** - Information architecture, lo-fi wireframes, and responsive layout design for all page templates
- **[UX Writer](./execute-subagents/ux-writer.md)** - Conversion-focused copy, headlines, CTAs, microcopy, and trust elements for all page templates
- **[Measurement Annotator](./execute-subagents/measurement-annotator.md)** - Event overlay annotation, analytics tracking, and measurement consistency for wireframes and interactions
- **[Hi-Fi Visual Designer](./execute-subagents/hi-fi-visual-designer.md)** - Visual design systems, component design, and high-impact module development for prioritized elements
- **[Prototype & Handoff Engineer](./execute-subagents/prototype-handoff-engineer.md)** - Interactive prototypes, engineering specifications, and technical handoff materials

---

## Execute Dev Phase Agents

### Orchestrator
- **[Engineering Program Lead](./execute-dev-orchestrator/engineering-program-lead.md)** - Coordinates 5 dev subagents to deliver production-ready applications from Execute Phase specifications using Eleventy, Vite, Tailwind, GA4, Stripe, and MailerLite with comprehensive QA gates and performance standards

### Subagents
- **[Frontend UI & Accessibility Lead](./execute-dev-subagents/frontend-ui-accessibility-lead.md)** - Eleventy + Vite + Tailwind implementation with semantic components, WCAG AA compliance, design system tokens, and responsive layouts
- **[Forms, Checkout & Integrations Engineer](./execute-dev-subagents/forms-checkout-integrations-engineer.md)** - Lead capture forms, Stripe Payment Element integration, client-side validation, lead_id management, and UTM parameter handling
- **[Analytics & Tagging Engineer](./execute-dev-subagents/analytics-tagging-engineer.md)** - GTM container setup, GA4 configuration, event tracking implementation, Consent Mode v2, and snake_case analytics standards
- **[Backend/Webhooks & CRM Integrations](./execute-dev-subagents/backend-webhooks-crm-integrations.md)** - Serverless functions, Stripe webhook processing, MailerLite automation, CRM sync, and server-side analytics
- **[DevOps & QA Engineer](./execute-dev-subagents/devops-qa-engineer.md)** - CI/CD pipelines, automated testing, performance monitoring, accessibility validation, security scanning, and production deployment

---

## Build Phase Agents

### Orchestrator
- **[Build Program Lead](./build-orchestrator/build-program-lead.md)** - Coordinates 5 build subagents to produce production-ready websites/applications with beauty validation, responsive implementation, frontend development, integrations, and quality release processes

### Subagents
- **[Visual Design Lead](./build-subagents/visual-design-lead.md)** - Art direction, visual QA, typography scale, color usage, spacing rhythm, and design system consistency for beauty_ok gate validation
- **[Responsive & Design System Engineer](./build-subagents/responsive-design-system-engineer.md)** - Design tokens, fluid layouts, container queries, grid systems, and Storybook documentation for responsive_ok gate validation
- **[Frontend Implementer](./build-subagents/frontend-implementer.md)** - Semantic components, accessibility landmarks, UI states, precise hi-fi recreation, and analytics integration hooks for core build implementation
- **[Integrations & Data Engineer](./build-subagents/integrations-data-engineer.md)** - Forms to payments integration, webhook implementation, analytics tracking, ESP/CRM automations, and GDPR consent management for integrations_ok gate validation
- **[Quality, Release & Reliability](./build-subagents/quality-release-reliability.md)** - Comprehensive testing, performance optimization, CI/CD pipelines, monitoring setup, and production deployment for quality_ok and release_ok gate validation

---

## Copy Phase Agents

### Orchestrator
- **[Copy Program Lead](./copy-orchestrator/copy-program-lead.md)** - Coordinates 5 copy subagents to produce complete Copy SoT v1.0 from template, enforcing block IDs, voice guidelines, evidence/claims parity, and measurement tag sync

### Subagents
- **[Lead UX Writer](./copy-subagents/lead-ux-writer.md)** - Conversion-focused copy for all page slots including headlines, CTAs, microcopy, and customer-language copy that drives user action
- **[VoC & Proof Curator](./copy-subagents/voc-proof-curator.md)** - Evidence gathering, testimonial curation, claims verification, and proof mapping to ensure all copy claims are backed by verifiable evidence
- **[Measurement & CTA Mapper](./copy-subagents/measurement-cta-mapper.md)** - Event tracking alignment, CTA measurement annotation, parameter hygiene, and perfect copy-to-measurement sync with v1B specifications
- **[SEO & Localization Editor](./copy-subagents/seo-localization-editor.md)** - Search optimization, meta content, OG tags, internal linking, URL structure, and language variant creation for global reach
- **[Compliance & Risk Reviewer](./copy-subagents/compliance-risk-reviewer.md)** - Legal compliance, claims validation, guarantee language, privacy policy alignment, and risk mitigation for all customer-facing copy

---

## Messaging Phase Agents

### Orchestrator
- **[Messaging Program Lead](./messaging-orchestrator/messaging-program-lead.md)** - Coordinates 5 messaging subagents to produce build-ready messaging packs for Email & WhatsApp automation covering NO-PAY and CUSTOMER sequences with triggers, UTMs, and GDPR compliance

### Subagents
- **[Email Copy Lead](./messaging-subagents/email-copy-lead.md)** - Conversion-focused email copy for NO-PAY and CUSTOMER sequences including subjects (A/B), bodies, CTAs, merge fields, and objection handling aligned with Avatar VoC
- **[WhatsApp Template Lead](./messaging-subagents/whatsapp-template-lead.md)** - Opt-in compliant WhatsApp HSM templates with variable mapping, button integration, and category compliance (Utility/Marketing) for Europe/Lisbon timezone messaging
- **[Trigger & Journey Mapper](./messaging-subagents/trigger-journey-mapper.md)** - Entry/exit conditions, scheduling windows, suppression rules, UTM parameter management, and automation sequence logic for Europe/Lisbon timezone messaging
- **[VoC & Proof Curator](./messaging-subagents/voc-proof-curator.md)** - Evidence gathering, testimonial curation, claims verification, social proof mapping, and ensuring all messaging claims are backed by verifiable evidence or reframed conservatively
- **[Compliance & Deliverability Steward](./messaging-subagents/compliance-deliverability-steward.md)** - GDPR compliance, email deliverability optimization, WhatsApp template approvals, consent management, DNS configuration, and regulatory compliance for messaging automation

---

## GTM Phase Agents

### Orchestrator
- **[Analytics Program Lead](./gtm-orchestrator/analytics-program-lead.md)** - Coordinates 5 GTM subagents to turn Execute Phase GTM Spec into a deployed, validated tracking system with GTM container, server-side events, consent compliance, and comprehensive QA evidence pack

### Subagents
- **[Data Layer Engineer](./gtm-subagents/data-layer-engineer.md)** - Push shapes, utilities, DOM hooks, selectors, and client-side tracking implementation for comprehensive GTM integration
- **[GTM Tag Builder](./gtm-subagents/gtm-tag-builder.md)** - Variables, tags, triggers, container hygiene, destination mapping, and GTM workspace configuration for comprehensive tracking implementation
- **[Server/SS-GTM Engineer](./gtm-subagents/server-gtm-engineer.md)** - Webhook handlers, server-side events, CRM/MailerLite sync, idempotency, and reliable server-to-analytics integration
- **[QA & Privacy Steward](./gtm-subagents/qa-privacy-steward.md)** - Consent enforcement, PII audits, Tag Assistant validation, compliance verification, and comprehensive QA evidence collection
- **[Documentation & Handoff Coordinator](./gtm-subagents/documentation-handoff-coordinator.md)** - Comprehensive documentation assembly, implementation guides, evidence organization, and technical handoff materials for operational teams

---

## Agent Interaction Patterns

### Phase Progression
```
Discovery Phase → Define Phase → Macro Website Strategy Phase → Landing Page Strategy Phase → Execute Phase → Execute Dev Phase → Build Phase → Copy Phase → Messaging Phase → GTM Phase
     ↓               ↓              ↓                          ↓                        ↓              ↓                ↓             ↓              ↓              ↓
  Foundation    →  Strategy    → Implementation          → LP Strategy            → Design       → Development    → Production → Copy & Content → Automation → Analytics
```

### Cross-Phase Dependencies
- **Discovery → Define**: Avatar insights, offer structure, business context inform journey mapping
- **Define → Macro Website Strategy**: Journey framework, KPI structure, measurement foundation inform website strategy
- **Discovery → Macro Website Strategy**: Avatar psychology, offer positioning directly inform page narratives and CTAs
- **Macro Website Strategy → Landing Page Strategy**: v1A page templates and v1B measurement specifications inform LP strategy foundation
- **Discovery → Landing Page Strategy**: Avatar psychology, pain points, and VoC research inform LP section design and proof requirements
- **Define → Landing Page Strategy**: Journey framework and measurement structure inform LP tracking plan and conversion paths
- **Landing Page Strategy → Execute**: LP section narrative, CTA mapping, and technical architecture provide design foundation
- **Discovery → Execute**: Avatar VoC research informs copy voice and objection handling
- **Define → Execute**: Measurement framework ensures consistent event tracking implementation
- **Execute → Execute Dev**: Hi-fi designs, wireframes, and technical specifications provide development foundation
- **Discovery → Execute Dev**: Avatar insights inform accessibility and user experience requirements for technical implementation
- **Define → Execute Dev**: Measurement framework and analytics specifications guide GTM/GA4 integration and event tracking
- **Macro Website Strategy → Execute Dev**: v1A page templates and v1B measurement specs provide comprehensive development requirements
- **Execute Dev → Build**: Production-ready code, tested integrations, and deployment-ready applications provide build foundation
- **Build → Copy**: Production-ready components with stable block IDs enable precise copy implementation
- **Discovery → Copy**: Avatar VoC language and emotional triggers drive conversion copy
- **Macro Website Strategy → Copy**: v1A page structure and v1B measurement specs guide copy implementation
- **Landing Page Strategy → Copy**: LP section narrative and proof requirements inform copy structure and evidence backing
- **Execute → Copy**: Design wireframes and measurement annotations inform copy placement and formatting
- **Copy → Build (Iteration)**: Finalized copy with stable block IDs enables precise component implementation
- **Discovery → Messaging**: Avatar VoC research provides authentic language patterns and emotional triggers for email/WhatsApp copy
- **Define → Messaging**: Journey framework and trigger specifications inform automation sequence logic and entry/exit conditions  
- **Macro Website Strategy → Messaging**: v1A offers and v1B measurement specs guide messaging CTAs and UTM parameter structure
- **Landing Page Strategy → Messaging**: LP traffic temperature mapping and nurture flows inform email automation sequences and CTA alignment
- **Copy → Messaging**: Finalized copy voice guidelines and proof mapping ensure consistency across website and messaging channels
- **Execute → Messaging**: Landing page designs and measurement annotations inform messaging attribution and conversion tracking
- **Define → GTM**: Event dictionary and measurement framework provide foundation for tracking implementation
- **Macro Website Strategy → GTM**: v1B tracking specifications and technical architecture guide GTM container setup
- **Landing Page Strategy → GTM**: LP tracking plan v1 and measurement specifications provide focused tracking implementation requirements
- **Execute Dev → GTM**: Data layer implementation and analytics infrastructure provide basis for advanced GTM configuration
- **Execute → GTM**: Measurement annotations and interaction specifications inform comprehensive event tracking
- **Build → GTM**: Production-ready components with data attributes enable precise tracking implementation

### Intra-Phase Coordination
Each orchestrator manages handoffs between their subagents:
- **Sequential handoffs**: One agent's output becomes another's input
- **Parallel work streams**: Independent agents work simultaneously on different aspects
- **Integration phases**: Orchestrator validates consistency and resolves conflicts

---

## Key Agent Specializations

### Customer Understanding
- **Avatar & VoC Synthesizer** (Discovery) - Deep psychological profiles
- **Journey Strategist** (Define) - Behavioral mapping and friction analysis
- **Nurture Architect** (Macro) - Lifecycle automation and engagement flows
- **UX Writer** (Execute) - Customer language and conversion copy
- **Frontend Implementer** (Build) - Accessibility implementation and semantic HTML for optimal user experience
- **Lead UX Writer** (Copy) - Avatar-aligned conversion copywriting and voice consistency
- **Email Copy Lead** (Messaging) - Email sequence copywriting with A/B subject optimization and merge field implementation

### Offer & Content Strategy  
- **Offer Architect** (Discovery) - Service packaging and positioning
- **Offer & CTA Strategist** (Macro) - Temperature-based offer mapping and conversion optimization
- **Site IA & Narrative Lead** (Macro) - Content architecture and proof requirements
- **LP Narrative Architect** (Landing Page Strategy) - LP section design and proof logic structure for single-page conversion optimization
- **Offer & CTA Strategist** (Landing Page Strategy) - Traffic temperature mapping and primary CTA governance for LP conversion paths
- **IA & Wireframe Lead** (Execute) - Information architecture and page layout design
- **VoC & Proof Curator** (Copy) - Evidence gathering and testimonial curation for credible copy claims
- **VoC & Proof Curator** (Messaging) - Evidence mapping and testimonial optimization for email and WhatsApp messaging

### Measurement & Analytics
- **Measurement Mapper** (Discovery) - KPI identification and business metrics
- **KPI Tree Architect** (Define) - Measurement hierarchy and attribution
- **Tracking Planner** (Macro) - Event implementation and parameter specification
- **Measurement & GTM Lead** (Landing Page Strategy) - LP tracking plan development with critical parameters and destination mapping
- **Measurement Annotator** (Execute) - Event overlay annotation and implementation specs
- **Analytics & Tagging Engineer** (Execute Dev) - GTM container setup, GA4 configuration, event tracking, and Consent Mode v2 implementation
- **Forms, Checkout & Integrations Engineer** (Execute Dev) - Lead capture forms with analytics integration and attribution tracking
- **Integrations & Data Engineer** (Build) - Analytics tracking implementation with consent management and PII scrubbing
- **Measurement & CTA Mapper** (Copy) - Copy-to-measurement sync and event annotation for all CTAs
- **Trigger & Journey Mapper** (Messaging) - Automation sequence logic with scheduling and suppression rule management
- **Data Layer Engineer** (GTM) - Client-side tracking implementation with utilities, DOM hooks, and event attribution
- **GTM Tag Builder** (GTM) - GTM workspace configuration with variables, tags, triggers, and consent management
- **QA & Privacy Steward** (GTM) - Comprehensive tracking validation with privacy compliance and evidence collection

### Technical Implementation
- **Inventory & Access Steward** (Discovery) - Platform audit and technical assets
- **GTM Data Layer Engineer** (Define) - Tracking implementation and data layer setup
- **Tech Architect & Data-Flow Engineer** (Macro) - Architecture design and integration specifications
- **Technical Architect** (Landing Page Strategy) - LP tech stack specification, repo layout design, and performance optimization for single-page implementation
- **Proof & VoC Curator** (Landing Page Strategy) - Evidence mapping and testimonial curation with usage rights management for LP credibility
- **Prototype & Handoff Engineer** (Execute) - Interactive prototypes and engineering handoff materials
- **Engineering Program Lead** (Execute Dev) - Development orchestration with gate-based quality standards and technical delivery
- **Frontend UI & Accessibility Lead** (Execute Dev) - Eleventy + Vite + Tailwind implementation with WCAG AA compliance
- **Backend/Webhooks & CRM Integrations** (Execute Dev) - Serverless functions, webhook processing, and system integrations
- **DevOps & QA Engineer** (Execute Dev) - CI/CD pipelines, automated testing, and deployment automation
- **Frontend Implementer** (Build) - Production-ready component implementation with TypeScript and accessibility
- **Integrations & Data Engineer** (Build) - Payment processing, webhook infrastructure, and API integrations
- **Quality, Release & Reliability** (Build) - CI/CD pipelines, testing automation, and production deployment
- **WhatsApp Template Lead** (Messaging) - HSM template creation with BSP compliance and multi-language support
- **Server/SS-GTM Engineer** (GTM) - Server-side event processing with webhook infrastructure and third-party integrations

### Visual Design & User Experience
- **Hi-Fi Visual Designer** (Execute) - Design systems, component design, and visual interface development
- **Visual Design Lead** (Build) - Visual QA, design system compliance, and brand consistency validation
- **Responsive & Design System Engineer** (Build) - Design token implementation and responsive behavior optimization

### SEO & Localization
- **SEO & Localization Editor** (Copy) - Search optimization, meta content, and international market adaptation

### Quality & Governance
- **QA Governance Lead** (Define) - Privacy compliance and validation
- **Discovery Director** (Discovery) - Cross-agent consistency and evidence standards
- **Macro Website Strategy Director** (Macro Website Strategy) - Content-measurement coherence and implementation readiness
- **Landing Strategy Lead** (Landing Page Strategy) - LP strategy coherence, proof-driven sections, and single primary CTA governance
- **Execute Design Program Lead** (Execute) - Design quality, system consistency, and engineering readiness
- **Build Program Lead** (Build) - Production readiness validation and quality gate enforcement
- **Quality, Release & Reliability** (Build) - Comprehensive testing, performance validation, and deployment quality assurance
- **Copy Program Lead** (Copy) - Copy quality, voice consistency, and compliance standards
- **Compliance & Risk Reviewer** (Copy) - Legal compliance and risk mitigation for all customer-facing copy
- **Messaging Program Lead** (Messaging) - Cross-channel messaging coherence and automation sequence quality
- **Compliance & Deliverability Steward** (Messaging) - GDPR compliance and email/WhatsApp deliverability optimization
- **Analytics Program Lead** (GTM) - GTM implementation orchestration with comprehensive quality gates and compliance validation
- **Documentation & Handoff Coordinator** (GTM) - Complete operational documentation and technical handoff materials for long-term maintenance

---

## Naming Conventions

### Agent Names
- **Orchestrators**: "[Phase] Director" (e.g., Discovery Director, Macro Website Strategy Director)
- **Subagents**: "[Function] [Role]" (e.g., Avatar & VoC Synthesizer, Tech Architect & Data-Flow Engineer)

### File Organization
```
.claude/agents/
├── [phase]-orchestrator/
│   └── [phase]-director.md
├── [phase]-subagents/
│   ├── [agent-name].md
│   └── ...
└── _templates/
    ├── [phase]-schemas.json
    └── [phase]-validation-process.md
```

### Event & Parameter Naming
All agents follow `snake_case` convention for:
- Event names: `contact_form_submit`, `consultation_booking`
- Parameter names: `lead_id`, `page_type`, `utm_source`
- Page types: `service_detail`, `case_study`, `blog_post`

---

## Quality Standards

### Output Requirements
- **Evidence-based**: All claims backed by data or marked as assumptions
- **Avatar-first**: Use emotional customer language, never generic "ICP" terminology
- **snake_case**: Consistent naming across all technical specifications
- **Cross-linked**: Integration points between agents clearly documented
- **Implementation-ready**: Detailed enough for immediate execution

### Validation Process
Each phase includes:
- **Agent output validation**: Individual deliverable quality checks
- **Cross-agent consistency**: Integration and naming validation  
- **Implementation readiness**: Technical feasibility and completeness
- **Red-team validation**: Critical perspective and edge case analysis

---

## Usage Guidelines

### When to Use Which Agent
1. **Start with Discovery Phase** for new projects or major strategy changes
2. **Use Define Phase** when you have solid avatar/offer foundation but need measurement clarity
3. **Use Macro Website Strategy Phase** when you need multi-page website implementation with integrated tracking
4. **Use Landing Page Strategy Phase** when you need focused single-page landing page conversion optimization with proof-driven sections and temperature-based offer mapping
5. **Use Execute Phase** when you have strategy and architecture defined but need design and development materials
6. **Use Execute Dev Phase** when you have finalized designs and need technical implementation with Eleventy + Vite + Tailwind architecture
7. **Use Build Phase** when you have working application code and need production deployment with comprehensive quality gates
8. **Use Copy Phase** when you have design foundation but need conversion-optimized copy with evidence backing
9. **Use Messaging Phase** when you have website copy and need email/WhatsApp automation sequences with compliance
10. **Use GTM Phase** when you need advanced Google Tag Manager implementation with server-side events and tracking validation

### Agent Coordination Best Practices
- **Orchestrators** handle cross-agent integration and conflict resolution
- **Sequential work** when one agent's output is required input for another
- **Parallel work** when agents can operate independently on different aspects
- **Validation cycles** after each major integration point

### Common Integration Points
- **Avatar insights** flow from Discovery to Define to Macro/Landing Page Strategy to Execute to Build phases
- **Offer strategy** connects Discovery offers → Define conversion → Macro/Landing Page Strategy CTAs → Execute copy/design → Build implementation
- **Measurement framework** evolves from Discovery KPIs → Define events → Macro/Landing Page Strategy implementation → Execute annotation → Build integration
- **Technical requirements** accumulate from Discovery audit → Define specs → Macro/Landing Page Strategy architecture → Execute handoff → Build production deployment
- **Design system** develops from Discovery brand → Macro/Landing Page Strategy components → Execute visual design → Build token implementation → production system
- **Quality assurance** progresses from Execute validation → Build comprehensive testing → Copy integration → production readiness
- **Landing page optimization** specialized from Discovery avatar → Define journey → Landing Page Strategy sections/proof/CTAs → Execute LP design → Build LP implementation
- **Messaging automation** builds from Discovery avatar insights → Define journey triggers → Landing Page Strategy nurture flows → Copy voice guidelines → Messaging sequences → platform deployment

Remember: The agent system is designed for progressive refinement. Each phase builds on the previous while adding specialized depth in its domain.