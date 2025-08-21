# Discovery Orchestrator Agent System

**Version:** 1.0  
**Purpose:** Comprehensive Discovery document generation with Avatar-first methodology  
**Output:** Complete business discovery documentation ready for marketing execution

---

## 🎯 System Overview

The Discovery Orchestrator Agent System produces **complete Discovery documents** with Avatar-first depth, clear offers, and KPI definitions through coordinated multi-agent collaboration.

### Key Deliverable
**Discovery Phase — Detailed Document** covering:
- Sections 1-7: Business analysis, offers, Avatar, KPIs, baselines, inventory
- Appendices A-C: Interview guides, data collection plans, naming conventions

### Operating Principles
- **Avatar > ICP** (emotion-rich terminology, never "target audience")
- **No KPI targets** (definitions only)
- **snake_case naming** for all events/parameters
- **Single Source of Truth** documentation
- **Evidence-based insights** with clear attribution

---

## 🤖 Agent Roster

### Orchestrator (1)
**[Discovery Director](discovery-orchestrator/discovery-director.md)**
- **Role:** Coordinates subagents, validates outputs, assembles final document
- **Tools:** Read, Write, Edit, Grep, Glob, Task, TodoWrite
- **Specialization:** Document assembly, quality control, consistency enforcement

### Subagents (5)

**[Business Snapshot Analyst](discovery-subagents/business-snapshot-analyst.md)**
- **Sections:** 1 (Business Snapshot), 5 (Traffic & Channel Baseline)
- **Tools:** Read, Grep, WebFetch, mcp__firecrawl__firecrawl_scrape, mcp__firecrawl__firecrawl_search
- **Specialization:** Market analysis, competitive positioning, baseline metrics

**[Offer Architect](discovery-subagents/offer-architect.md)**
- **Sections:** 2 (Products & Services)
- **Tools:** Read, Grep, mcp__firecrawl__firecrawl_scrape, mcp__context7__*, WebFetch
- **Specialization:** Offer optimization, pricing psychology, conversion assets

**[Avatar & VoC Synthesizer](discovery-subagents/avatar-voc-synthesizer.md)**
- **Sections:** 3 (Avatar), Appendix A (Interview Guides)
- **Tools:** Read, Grep, Write, mcp__firecrawl__firecrawl_search, mcp__firecrawl__firecrawl_scrape, WebFetch
- **Specialization:** Customer psychology, voice-of-customer analysis, persona development

**[Measurement Mapper](discovery-subagents/measurement-mapper.md)**
- **Sections:** 4 (Goals & KPIs), Appendix C (Naming Conventions)
- **Tools:** Read, Write, Edit, Grep
- **Specialization:** Analytics architecture, KPI definitions, event tracking

**[Inventory & Access Steward](discovery-subagents/inventory-access-steward.md)**
- **Sections:** 6-7 (Asset & Tech Inventory), Appendix B (Data Pull Checklist)
- **Tools:** Read, Write, LS, Glob, Grep, Bash
- **Specialization:** Technical inventory, access management, data architecture

---

## 🚀 How to Use the System

### Method 1: Direct Orchestrator Invocation (Recommended)
```
Use the discovery-director to create a complete Discovery document for [client/business name]. 

Available inputs:
- Business information: [provide any existing docs, websites, etc.]
- Customer data: [interviews, reviews, support tickets]
- Analytics access: [GA4, ad accounts, CRM access]
- Team interviews: [founder/team availability]

Please coordinate the full Discovery process across all 5 subagents.
```

### Method 2: Individual Agent Usage
For specific sections or focused analysis:

```
Use the business-snapshot-analyst to analyze the competitive landscape and positioning for [business name].
```

```
Use the avatar-voc-synthesizer to develop Avatar profiles based on [customer interview transcripts/reviews].
```

```
Use the measurement-mapper to define KPI measurement architecture for [business goals].
```

### Method 3: Sequential Workflow
For complex projects requiring staged approach:

1. **Foundation:** `Use inventory-access-steward to catalog current assets and tech stack`
2. **Market Context:** `Use business-snapshot-analyst for positioning and baseline analysis`
3. **Customer Insights:** `Use avatar-voc-synthesizer for customer psychology and VoC`
4. **Offer Optimization:** `Use offer-architect for conversion-ready offer development`
5. **Measurement Design:** `Use measurement-mapper for KPI definitions and tracking`
6. **Assembly:** `Use discovery-director to coordinate final document assembly`

---

## 📋 Input Requirements

### Minimum Required Inputs
- **Business Website/URL** - For asset and competitive analysis
- **Basic Business Information** - Company overview, services offered
- **Access Credentials** - At least GA4 or primary analytics platform

### Optimal Input Package
- **Founder/Team Interview** - 60-90 minutes covering customer insights
- **Customer Interviews** - 3-5 customer conversations (45-60 min each)
- **Analytics Access** - GA4, ad platforms, CRM, email marketing
- **Support/Review Data** - Customer feedback and support interactions
- **Existing Documentation** - Any previous market research or customer data

### Nice-to-Have Enhancements
- **Competitive Intelligence** - Existing competitor analysis
- **Financial Data** - Revenue by channel/product (if available)
- **Team Workshop** - Group session for positioning alignment
- **Historical Performance** - 12+ months of marketing/sales data

---

## 📊 Expected Outputs

### Primary Deliverable
**Discovery Document v1.0** containing:
- **7 Complete Sections** with actionable insights
- **3 Appendices** with implementation guidance  
- **Quality Validation** against all standards
- **Evidence Attribution** for all claims
- **Implementation Roadmap** for next steps

### Section-by-Section Outputs

| Section | Content | Business Impact |
|---------|---------|-----------------|
| 1. Business Snapshot | Positioning, competitors, proof | Clear market differentiation |
| 2. Products & Services | Conversion-ready offers | Optimized sales materials |
| 3. Avatar | Emotional customer profiles | Targeted messaging strategy |
| 4. Goals & KPIs | Measurement definitions | Data-driven decision framework |
| 5. Traffic Baseline | Current channel performance | Optimization priorities |
| 6. Asset Inventory | Digital/brand asset catalog | Content gap identification |
| 7. Tech Access | Tool stack with IDs | Implementation capability |

### Appendices Value
- **A. Interview Guides** - Structured customer research protocols
- **B. Data Pull Checklist** - Prioritized data collection plan
- **C. Naming Conventions** - Technical implementation standards

---

## ⚙️ Technical Specifications

### File Structure
```
.claude/agents/
├── README.md (this file)
├── discovery-orchestrator/
│   └── discovery-director.md
├── discovery-subagents/
│   ├── business-snapshot-analyst.md
│   ├── offer-architect.md
│   ├── avatar-voc-synthesizer.md
│   ├── measurement-mapper.md
│   └── inventory-access-steward.md
└── _templates/
    ├── output-schemas.json
    ├── discovery-template.md
    └── handoff-checklists.md
```

### Quality Gates
All outputs validated against:
- **Avatar terminology** enforcement (no "ICP" usage)
- **snake_case naming** for events/parameters
- **Evidence attribution** requirements
- **KPI definition standards** (no targets)
- **Completeness checklists** per section

### Integration Points
- **Voice of Customer** flows from AVS → OA for offer optimization
- **Market Context** flows from BSA → MM for KPI selection
- **Tech Constraints** flow from IAS → MM for measurement design
- **Asset Inventory** supports all agents' implementation planning

---

## 🎨 Best Practices

### For Maximum Value
1. **Start with Discovery Director** - Let orchestrator coordinate the full process
2. **Provide Rich Inputs** - More customer data = better Avatar insights
3. **Grant Appropriate Access** - Analytics access enables baseline establishment
4. **Plan for Implementation** - Discovery leads to measurement and optimization

### Common Use Cases

**New Business Launch:**
- Complete market positioning and Avatar development
- Offer optimization for conversion
- Measurement framework establishment

**Marketing Optimization:**
- Baseline performance analysis
- Customer psychology deep-dive
- Conversion element enhancement

**Agency Client Onboarding:**
- Comprehensive business understanding
- Strategic foundation for campaigns
- Implementation roadmap development

### Integration with SenseClinic Project
This agent system is pre-configured with SenseClinic business context from `business/sense.md`. The agents can leverage this existing analysis while conducting additional research and validation.

---

## 🔧 Troubleshooting

### Common Issues

**"Not enough customer data"**
- Use business-snapshot-analyst to gather review/feedback data
- Recommend founder interview as minimum viable input
- Mark sections with confidence levels

**"Can't access analytics platforms"**
- Use inventory-access-steward to document access gaps
- Prioritize data collection in Appendix B
- Proceed with available data and mark limitations

**"Offers need more specificity"**
- Use avatar-voc-synthesizer to gather language insights
- Review competitor analysis for positioning context
- Apply offer-architect psychological frameworks

### Agent Coordination Issues
If agents produce conflicting outputs:
1. Discovery Director arbitrates based on evidence quality
2. Conflicting claims documented in change log
3. Additional research requested from relevant agents

---

## 📈 Success Metrics

### Document Quality Indicators
- **Completeness:** All required sections filled with real data
- **Evidence Quality:** Claims backed by sources or marked as assumptions
- **Actionability:** Clear next steps for implementation
- **Consistency:** Avatar terminology and naming conventions enforced

### Business Impact Measures
- **Strategic Clarity:** Positioning statement resonates with stakeholders
- **Marketing Readiness:** Avatar and offers enable campaign development
- **Measurement Foundation:** KPIs support data-driven optimization
- **Implementation Viability:** Technical requirements are achievable

---

## 🤝 Contributing & Customization

### Customizing for Your Business
1. **Update Agent Contexts** - Modify system prompts for industry specifics
2. **Add Tool Access** - Include additional MCP tools for specialized research
3. **Extend Templates** - Add industry-specific sections to discovery template
4. **Modify Workflows** - Adjust handoff protocols for team processes

### Extending the System
- **Add Specialized Agents** - Create domain-specific subagents
- **Enhanced Integrations** - Connect with additional data sources
- **Custom Output Formats** - Modify templates for specific use cases
- **Automated Workflows** - Chain agents for recurring analysis

---

## 📞 Support & Documentation

### Additional Resources
- **Templates Folder** - Complete schemas and checklists
- **Agent Documentation** - Detailed specs for each agent
- **Quality Standards** - Validation criteria and best practices

### Getting Help
For issues with the Discovery Agent System:
1. Check individual agent documentation
2. Review quality checklists for requirements
3. Validate input data completeness
4. Consider staged approach for complex projects

---

# Define Phase Orchestrator Agent System

**Version:** 1.0  
**Purpose:** Journey mapping and measurement architecture for implementation-ready GTM/GA4/Stripe/MailerLite/CRM configurations  
**Output:** Complete Define Phase — Journey & Measurement (v1) documentation

---

## 🎯 System Overview

The Define Phase Orchestrator Agent System produces **implementation-ready measurement architecture** with emotion-rich journey mapping, KPI definitions, and technical specifications for GTM, GA4, MailerLite, Stripe, and CRM systems.

### Key Deliverable
**Define Phase — Journey & Measurement (v1.0)** containing:
- §1 Journey Map with emotions, frictions, hypotheses + Experiment Backlog
- §2 KPI Mini-Tree with guardrails (no targets, definitions only)
- §3 Measurement Plan v0: Events, Parameters, Destinations, GTM Triggers
- §4 Naming & ID Rules: lead_id/user_id propagation, UTM governance, consent
- §5 QA & Acceptance Criteria with privacy compliance validation

### Operating Principles
- **snake_case enforcement** for all events/parameters
- **Emotions & frictions** required per journey step  
- **NO KPI targets** (definitions and guardrails only)
- **Identity rules explicit** (lead_id/user_id propagation)
- **Implementation-ready** technical specifications
- **Privacy-first** with consent management integration

---

## 🤖 Agent Roster

### Orchestrator (1)
**[Define Director](define-orchestrator/define-director.md)**
- **Role:** Coordinates subagents, enforces consistency, merges final document
- **Tools:** Read, Write, Edit, Grep, Glob, Task, TodoWrite
- **Specialization:** Implementation readiness, quality control, conflict resolution

### Subagents (5)

**[Journey Strategist](define-subagents/journey-strategist.md)**
- **Sections:** §1 Journey Map + Experiment Backlog
- **Tools:** Read, Grep, Write, WebFetch, mcp__firecrawl__firecrawl_scrape, mcp__firecrawl__firecrawl_search
- **Specialization:** Customer psychology, journey mapping, experiment design with ICE scoring

**[KPI Tree Architect](define-subagents/kpi-tree-architect.md)**
- **Sections:** §2 KPI Mini-Tree + Guardrails
- **Tools:** Read, Write, Edit, Grep
- **Specialization:** KPI definitions, identity rules, attribution methodology, test mode handling

**[Measurement Planner](define-subagents/measurement-planner.md)**
- **Sections:** §3 Event & Parameter Dictionary + Destinations Map
- **Tools:** Read, Write, Edit, Grep
- **Specialization:** Event taxonomy, parameter specification, cross-platform mapping

**[GTM/Data-Layer Engineer](define-subagents/gtm-data-layer-engineer.md)**
- **Sections:** §3 GTM Triggers + DataLayer + §4 Identity/UTM/Consent Rules
- **Tools:** Read, Write, Edit, Grep, Bash
- **Specialization:** GTM configuration, identity propagation, consent management, 11ty/Vite integration

**[QA & Governance Lead](define-subagents/qa-governance-lead.md)**
- **Sections:** §5 QA & Acceptance Criteria
- **Tools:** Read, Write, Edit, Grep
- **Specialization:** Privacy compliance, naming validation, red-team analysis, implementation readiness

---

## 🚀 How to Use the Define Phase System

### Method 1: Direct Orchestrator Invocation (Recommended)
```
Use the define-director to create a complete Define Phase — Journey & Measurement (v1) document.

Required inputs:
- Discovery document (completed Avatar, Offers, KPI baseline)
- Tool stack IDs (GTM container, GA4 property, Stripe account, MailerLite API)
- Technology context (11ty/Vite frontend, payment methods like MB WAY)

Coordinate the full Define process across all 5 subagents for implementation-ready outputs.
```

### Method 2: Sequential Agent Usage
For complex implementations requiring staged approach:

1. **Journey Foundation:** `Use journey-strategist to map customer journey with emotions and experiment backlog`
2. **KPI Architecture:** `Use kpi-tree-architect to define measurement formulas and attribution rules`
3. **Event Design:** `Use measurement-planner to create event dictionary and parameter specifications`
4. **Technical Implementation:** `Use gtm-data-layer-engineer for GTM triggers and identity propagation`
5. **Quality Validation:** `Use qa-governance-lead for privacy compliance and acceptance criteria`
6. **Final Assembly:** `Use define-director to coordinate integration and resolve conflicts`

---

## 📋 Input Requirements

### Minimum Required Inputs
- **Completed Discovery Document** - Avatar, Offers, and KPI baseline from Discovery phase
- **Tool Stack IDs** - GTM container ID, GA4 property ID, Stripe account ID, MailerLite API access
- **Technology Context** - Frontend framework (11ty/Vite), payment methods (MB WAY, cards)

### Optimal Input Package
- **Customer Journey Data** - Current funnel analytics, user feedback, conversion points
- **Technical Architecture** - Existing event tracking, identity management, consent platform
- **Compliance Requirements** - GDPR obligations, data retention policies, privacy constraints
- **Integration Specifications** - CRM field mapping, email automation triggers, payment webhooks

### Implementation Prerequisites
- **Development Resources** - Frontend developers familiar with dataLayer implementation
- **Analytics Access** - Admin access to GTM, GA4, and marketing platforms
- **Testing Environment** - Staging environment for validation and QA processes

---

## 📊 Expected Outputs

### Primary Deliverable
**Define Phase Document v1.0** containing:
- **Complete Journey Map** with emotions, frictions, and testable hypotheses
- **KPI Mini-Tree** with mathematical definitions and attribution rules
- **Measurement Architecture** with events, parameters, and destination mapping
- **Technical Specifications** ready for immediate GTM and frontend implementation
- **Quality Validation** with privacy compliance and acceptance sign-off

### Section-by-Section Outputs

| Section | Content | Implementation Value |
|---------|---------|----------------------|
| §1 Journey Map | 5-step journey with emotions/frictions + experiments | Customer experience optimization roadmap |
| §2 KPI Tree | Mathematical definitions + identity/attribution rules | Accurate measurement foundation |
| §3 Events & Parameters | snake_case taxonomy + platform destinations | Immediate GTM/GA4 configuration |
| §4 Identity & Consent | lead_id/user_id propagation + privacy compliance | Cross-platform attribution accuracy |
| §5 QA & Acceptance | Validation results + implementation readiness | Deployment confidence and quality assurance |

### Technical Deliverables Value
- **GTM Configuration** - Copy-paste trigger specifications and variable definitions
- **Frontend Integration** - Working dataLayer code for 11ty/Vite implementation
- **Platform Setup** - Field mappings for CRM, Stripe metadata, MailerLite automation
- **Privacy Compliance** - GDPR-ready consent management and data handling
- **Testing Framework** - Staging environment detection and test data exclusion

---

## ⚙️ Technical Specifications

### File Structure
```
.claude/agents/
├── README.md (this file)
├── define-orchestrator/
│   └── define-director.md
├── define-subagents/
│   ├── journey-strategist.md
│   ├── kpi-tree-architect.md
│   ├── measurement-planner.md
│   ├── gtm-data-layer-engineer.md
│   └── qa-governance-lead.md
└── _templates/
    ├── define-phase-schemas.json
    ├── orchestrator-validation-process.md
    └── [existing discovery templates]
```

### Quality Gates
All outputs validated against:
- **snake_case naming** enforcement for events/parameters
- **Emotion & friction** inclusion for every journey step
- **Identity propagation** rules (lead_id/user_id across platforms)
- **Privacy compliance** with PII detection and consent gating
- **Implementation readiness** with syntactically valid code examples
- **Cross-platform consistency** across GTM/GA4/Stripe/MailerLite/CRM

### Integration Capabilities
- **Discovery Phase Connection:** Builds on Avatar, Offers, and KPI definitions from Discovery
- **Technical Stack Support:** 11ty/Vite frontend, Stripe payments, MB WAY integration
- **European Compliance:** GDPR-ready consent management and data retention
- **Multi-Platform Attribution:** Consistent identity tracking across marketing stack

---

## 🎨 Best Practices

### For Maximum Implementation Success
1. **Start with Define Director** - Let orchestrator coordinate full technical specification
2. **Provide Complete Discovery** - Rich Avatar and Offer data improves journey mapping
3. **Grant Technical Access** - GTM/GA4 admin access enables immediate configuration
4. **Plan for Privacy Compliance** - Consider consent management and data retention from start

### Common Use Cases

**New Business Launch:**
- Complete journey mapping with measurement architecture
- Identity management system establishment  
- Cross-platform attribution setup
- Privacy-compliant data collection framework

**Marketing Stack Optimization:**
- Journey friction analysis and experiment backlog
- Event taxonomy standardization across platforms
- Identity resolution improvements for attribution
- Consent management integration

**Technical Implementation:**
- GTM container configuration with working triggers
- Frontend dataLayer integration for SPAs
- Cross-platform identity propagation setup
- QA framework for ongoing validation

### Integration with Discovery Phase
The Define Phase system builds directly on Discovery outputs, using Avatar insights for journey emotions, Offer details for conversion optimization, and KPI baseline for measurement architecture.

---

## 🔧 Troubleshooting

### Common Issues

**"Events don't follow snake_case convention"**
- Use qa-governance-lead to validate naming across all outputs
- Apply systematic snake_case conversion with define-director orchestration
- Update all agent outputs for consistency

**"Identity tracking breaks across platforms"**
- Use gtm-data-layer-engineer to verify lead_id propagation rules
- Check CRM/Stripe/MailerLite field mapping specifications
- Ensure consistent identity storage and retrieval methods

**"Privacy compliance concerns"**
- Use qa-governance-lead for comprehensive PII scanning
- Implement consent gating recommendations from technical specifications
- Review data retention and deletion procedures

**"Implementation code doesn't work"**
- Validate syntax using gtm-data-layer-engineer specifications
- Test in staging environment with test_mode detection
- Verify browser compatibility and error handling

### Agent Coordination Issues
If agents produce conflicting outputs:
1. Define Director arbitrates based on implementation requirements
2. Technical feasibility takes precedence over ideal specifications
3. Privacy compliance requirements are non-negotiable
4. Additional research requested from relevant specialist agents

---

## 📈 Success Metrics

### Document Quality Indicators
- **Implementation Readiness:** All technical specifications ready for immediate deployment
- **Privacy Compliance:** All PII removed, consent management integrated
- **Cross-Platform Consistency:** Identity and events flow correctly between tools
- **Measurement Coverage:** Every KPI has corresponding trackable events

### Business Impact Measures  
- **Journey Optimization:** Clear experiment backlog prioritized by business impact
- **Attribution Accuracy:** Reliable cross-platform conversion tracking established
- **Development Velocity:** Technical specifications enable rapid implementation
- **Compliance Confidence:** Privacy requirements addressed comprehensively

---

## 🤝 System Coordination

### Discovery → Define Workflow
The Define Phase system integrates seamlessly with Discovery outputs:

**Discovery Provides:**
- Avatar psychology for journey emotions and frictions
- Offer optimization context for conversion experiments  
- KPI baseline requirements for measurement architecture
- Technical inventory for implementation planning

**Define Produces:**
- Implementation-ready journey mapping with experiment backlog
- Technical measurement specifications for immediate deployment
- Cross-platform identity and attribution architecture
- Privacy-compliant data collection and consent management

### Next Phase Integration
Define Phase outputs enable:
- **Macro Strategy Phase** - Experiment prioritization and campaign planning
- **Execution Phase** - Technical implementation with working code examples
- **Optimization Phase** - Data-driven conversion improvement with established measurement

---

**Ready to create implementation-ready measurement architecture that drives data-driven optimization!**

*Built for the SenseClinic project with technical precision and privacy-first methodology.*