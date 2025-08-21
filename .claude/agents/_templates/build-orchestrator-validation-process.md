# Build Phase Orchestrator Validation Process

This template provides the step-by-step validation process for the Build Program Lead orchestrator to ensure complete, high-quality, production-ready deliverables through systematic gate validation.

## Phase 1: Agent Output Collection

### 1.1 Visual Design Lead (VDL) Output Validation
- [ ] Art Direction Brief completed with design system specifications
- [ ] Visual QA redlines provided with exact token/selector fixes
- [ ] Component visual states documented (default, hover, focus, active, disabled)
- [ ] Motion specifications defined with timing and easing curves
- [ ] Typography hierarchy matches design system scale
- [ ] Color usage follows brand guidelines with WCAG AA compliance
- [ ] Spacing rhythm consistent with 4px/8px grid system
- [ ] Cross-browser compatibility verified

### 1.2 Responsive & Design System Engineer (RDSE) Output Validation
- [ ] Design token system implemented with CSS custom properties
- [ ] Responsive maps complete for all pages and breakpoints
- [ ] Container query implementations functional and documented
- [ ] Storybook deployment accessible with all component states
- [ ] Fluid typography and spacing working across viewport sizes
- [ ] CLS ≤ 0.10 achieved on all key pages
- [ ] No viewport overflow at any screen size (320px+)
- [ ] Design system compliance at 100% (no hardcoded values)

### 1.3 Frontend Implementer (FEI) Output Validation
- [ ] Component implementations match hi-fi designs (≤2% deviation)
- [ ] Semantic HTML structure with proper accessibility landmarks
- [ ] UI states handled (loading, empty, error, success) with proper ARIA
- [ ] Analytics integration hooks implemented with data attributes
- [ ] Error boundaries implemented with graceful degradation
- [ ] TypeScript interfaces complete with strict mode compliance
- [ ] Performance optimizations applied (code splitting, lazy loading)
- [ ] Cross-browser compatibility validated on target matrix

### 1.4 Integrations & Data Engineer (IDE) Output Validation
- [ ] Payment processing integration complete with comprehensive error handling
- [ ] Webhook infrastructure implemented with idempotency and retry logic
- [ ] Analytics tracking functional with consent management and PII scrubbing
- [ ] ESP/CRM integration prevents duplicates and handles failures gracefully
- [ ] GDPR consent management implemented with granular controls
- [ ] API integration testing complete including failure scenarios
- [ ] Security compliance validated (PCI for payments, data encryption)
- [ ] Integration monitoring and alerting configured

### 1.5 Quality, Release & Reliability (QRR) Output Validation
- [ ] Test coverage ≥80% with meaningful tests (not just coverage metrics)
- [ ] Visual regression testing baseline established and passing
- [ ] Accessibility testing passes automated tools and manual validation
- [ ] Performance budgets met (Core Web Vitals green, bundle sizes within limits)
- [ ] Security audit completed with no high-severity vulnerabilities
- [ ] CI/CD pipeline functional with automated testing gates
- [ ] Production monitoring configured with appropriate alert thresholds
- [ ] Rollback procedures tested and documented

## Phase 2: Gate Progression Validation

### 2.1 Gate Order Enforcement
```bash
# Validate gate progression order
check_gate_dependencies() {
  if [[ "$CURRENT_GATE" == "responsive_ok" && "$BEAUTY_OK" != "pass" ]]; then
    echo "BLOCKED: responsive_ok requires beauty_ok to pass first"
    exit 1
  fi
  
  if [[ "$CURRENT_GATE" == "integrations_ok" && ("$BEAUTY_OK" != "pass" || "$RESPONSIVE_OK" != "pass") ]]; then
    echo "BLOCKED: integrations_ok requires beauty_ok AND responsive_ok to pass"
    exit 1
  fi
  
  # Continue validation for quality_ok and release_ok...
}
```

### 2.2 Beauty_OK Gate Validation
- [ ] Visual accuracy ≤2% deviation from approved hi-fi designs
- [ ] Typography scale consistent (~1.2 ratio) with proper line heights
- [ ] Spacing follows 4px/8px grid with balanced negative space
- [ ] Color usage follows brand guidelines with WCAG AA contrast
- [ ] Primary CTA unmistakable with clear visual hierarchy
- [ ] Imagery consistent in crop/tone/treatment across contexts
- [ ] Motion timing 150-250ms with reduced-motion preference support
- [ ] All design tokens properly implemented (no hardcoded values)

### 2.3 Responsive_OK Gate Validation
- [ ] Zero horizontal overflow confirmed (320px to 2560px testing)
- [ ] Typography scales smoothly without clipping or overflow
- [ ] CLS ≤ 0.10 measured across all key pages and interactions
- [ ] Container queries functional for component-level responsiveness
- [ ] Storybook demonstrates all component states across breakpoints
- [ ] Font loading optimized to prevent layout shifts
- [ ] Image dimensions reserved to prevent layout jumps
- [ ] Responsive behavior maintains visual hierarchy and usability

### 2.4 Integrations_OK Gate Validation
- [ ] Payment processing tested with success/decline/error scenarios
- [ ] Webhook delivery reliable with idempotency preventing duplicates
- [ ] Analytics events fire correctly with proper parameters and timing
- [ ] ESP/CRM integration prevents duplicates via email hash deduplication
- [ ] Consent management blocks data flow when consent not granted
- [ ] API error handling provides appropriate user feedback
- [ ] Security measures prevent PII exposure in logs or parameters
- [ ] Integration monitoring alerts configured for service health

### 2.5 Quality_OK Gate Validation
- [ ] Unit/integration/E2E tests passing with ≥80% meaningful coverage
- [ ] Visual regression tests baseline established with ≤2% change threshold
- [ ] Accessibility testing passes axe/Pa11y and manual keyboard/SR testing
- [ ] Performance budgets met: JS ≤200KB gz, CSS ≤80KB gz, CWV green
- [ ] Security scan completed with no high-severity vulnerabilities
- [ ] Cross-browser compatibility validated on target browser matrix
- [ ] Error handling tested for graceful degradation scenarios
- [ ] Load testing completed for expected traffic volumes

### 2.6 Release_OK Gate Validation
- [ ] CI/CD pipeline successfully deploys through dev→staging→prod
- [ ] Health checks pass in all environments with appropriate timeouts
- [ ] Rollback procedures tested and validated with health check triggers
- [ ] Production monitoring active with error/performance/uptime alerts
- [ ] Post-deployment validation confirms all systems operational
- [ ] Team runbooks updated with deployment and incident response procedures
- [ ] Performance monitoring shows stable metrics within target thresholds
- [ ] Database migrations (if any) completed successfully with rollback plans

## Phase 3: Cross-Gate Consistency Validation

### 3.1 Component ID Traceability
```bash
# Validate consistent component IDs across all deliverables
validate_component_ids() {
  # Extract IDs from each agent's outputs
  VDL_IDS=$(grep -o '[A-Z]\+/[A-Za-z]\+/[A-Za-z-]\+' vdl_redlines.md)
  RDSE_IDS=$(grep -o '[A-Z]\+/[A-Za-z]\+/[A-Za-z-]\+' responsive_map.md)
  FEI_IDS=$(grep -o '[A-Z]\+/[A-Za-z]\+/[A-Za-z-]\+' component_implementations.md)
  IDE_IDS=$(grep -o '[A-Z]\+/[A-Za-z]\+/[A-Za-z-]\+' analytics_events.md)
  
  # Check for consistency
  if ! diff <(echo "$VDL_IDS" | sort) <(echo "$FEI_IDS" | sort); then
    echo "ERROR: Component ID mismatch between VDL and FEI"
    exit 1
  fi
}
```

### 3.2 Analytics Event Consistency
- [ ] Event names follow snake_case convention throughout
- [ ] Component IDs match across analytics and implementation
- [ ] Parameters consistent with measurement specifications
- [ ] Consent handling uniform across all tracking implementations
- [ ] Test mode exclusion implemented consistently
- [ ] PII scrubbing effective across all data collection points

### 3.3 Performance Budget Alignment
- [ ] Bundle size budgets respected by all implementations
- [ ] Image optimization consistent with performance requirements
- [ ] Font loading strategies aligned across responsive implementations
- [ ] Third-party script impact within acceptable limits
- [ ] Cache strategies optimized for performance and freshness

### 3.4 Accessibility Compliance Alignment
- [ ] Color contrast meets WCAG AA standards across all components
- [ ] Keyboard navigation functional across all interactive elements
- [ ] Screen reader compatibility verified across all content
- [ ] Focus management consistent across modal and navigation interactions
- [ ] Alternative text provided for all meaningful images

## Phase 4: Production Readiness Validation

### 4.1 Security Compliance Check
```yaml
security_checklist:
  https_enforcement: true
  security_headers_configured: true  # CSP, HSTS, X-Frame-Options
  input_sanitization: true
  authentication_security: true
  api_rate_limiting: true
  pci_compliance: true  # If payment processing
  secrets_management: true
  dependency_vulnerability_scan: true
```

### 4.2 Performance Validation
```yaml
performance_requirements:
  core_web_vitals:
    lcp_threshold: 2500  # milliseconds
    inp_threshold: 200   # milliseconds
    cls_threshold: 0.10  # layout shift score
  bundle_sizes:
    javascript_max: 204800  # 200KB gzipped
    css_max: 81920         # 80KB gzipped
  lighthouse_scores:
    performance_min: 90
    accessibility_min: 95
    best_practices_min: 90
    seo_min: 90
```

### 4.3 Monitoring & Alerting Validation
- [ ] Error tracking configured with appropriate alert thresholds
- [ ] Performance monitoring capturing Core Web Vitals in production
- [ ] Uptime monitoring with synthetic transaction tests
- [ ] Business metrics tracking (conversion rates, user engagement)
- [ ] Alert escalation procedures documented and tested
- [ ] Dashboard access configured for team members
- [ ] Log aggregation functional for troubleshooting
- [ ] Incident response procedures documented and communicated

## Phase 5: Integration Testing & Failure Scenarios

### 5.1 End-to-End User Journey Testing
- [ ] Complete purchase flow tested from landing to confirmation
- [ ] Error scenarios tested (payment failures, network issues, timeouts)
- [ ] Multi-device/browser testing completed
- [ ] Accessibility testing with actual assistive technologies
- [ ] Performance testing under realistic load conditions
- [ ] Data flow validated across all integration points

### 5.2 Failure Recovery Testing
```bash
# Test various failure scenarios
test_failure_scenarios() {
  # Payment service downtime
  test_payment_service_failure
  
  # Analytics service unavailable
  test_analytics_service_failure
  
  # Database connection issues
  test_database_connection_failure
  
  # CDN unavailable
  test_cdn_failure
  
  # Third-party API rate limiting
  test_api_rate_limiting
}
```

### 5.3 Rollback Procedure Validation
- [ ] Rollback triggers tested with simulated incidents
- [ ] Database rollback procedures validated (if applicable)
- [ ] Configuration rollback tested and documented
- [ ] Team notification procedures tested
- [ ] Service restoration time within SLA requirements
- [ ] Post-incident review process defined and documented

## Phase 6: Build Execution Pack (BEP) Assembly

### 6.1 Document Structure Validation
```markdown
# Build Execution Pack v1.0

## §1 Executive Summary
- Scope delivered (PAGE/SECTION/COMP IDs)
- Gate validation summary (all gates: PASS)
- Risk assessment and mitigation status
- Production readiness certification

## §2 Visual Implementation (VDL)
- Art direction brief and design system compliance
- Visual redlines resolved with evidence
- Component state documentation
- Motion specifications and implementation

## §3 Responsive & Design System (RDSE)
- Design token implementation and usage
- Responsive behavior maps and breakpoint strategy
- Storybook documentation and component states
- Container query implementations and performance

## §4 Frontend Architecture (FEI)
- Component implementations and file structure
- Accessibility implementation and compliance
- State management and error handling
- Performance optimizations applied

## §5 Integrations & Data Flow (IDE)
- Integration architecture and API contracts
- Webhook implementations and failure handling
- Analytics tracking and consent management
- Security compliance and audit results

## §6 Quality Assurance (QRR)
- Test coverage and validation results
- Performance optimization and Core Web Vitals
- Security audit findings and compliance status
- Deployment pipeline and monitoring configuration

## §7 Release & Operations (QRR)
- Deployment procedures and rollback strategies
- Monitoring configuration and alert thresholds
- Post-deployment validation and health checks
- Team handoff documentation and runbooks

## §8 Traceability & Change Log
- Component ID mapping and consistency validation
- Major decisions and architectural choices
- Outstanding items and future iteration planning
```

### 6.2 Evidence Collection & Links
- [ ] Screenshot comparisons with visual accuracy validation
- [ ] Performance audit results with Core Web Vitals data
- [ ] Test coverage reports with critical path analysis
- [ ] Security scan results and vulnerability assessment
- [ ] Monitoring dashboard links with baseline metrics
- [ ] Deployment pipeline logs and successful execution evidence
- [ ] Rollback procedure validation and testing results

### 6.3 Production Certification Checklist
- [ ] All 5 gates passed with documented evidence
- [ ] Performance requirements met across all key metrics
- [ ] Security compliance validated with no high-severity issues
- [ ] Accessibility standards met with WCAG AA compliance
- [ ] Integration reliability proven through comprehensive testing
- [ ] Monitoring and alerting active with appropriate thresholds
- [ ] Team documentation complete with operational procedures

## Phase 7: Conflict Resolution & Escalation

### 7.1 Gate Failure Resolution
**Process:** Return to gate owner with specific blocking issues
**Example:** "VDL: beauty_ok FAILED - LP/Hero/CTA-Primary has 3.2:1 contrast ratio, requires 4.5:1 for WCAG AA compliance"

### 7.2 Technical Implementation Conflicts
**Process:** Escalate to technical implementation lead
**Example:** "FEI: Analytics integration conflicts with performance budget - event tracking adding 15KB to bundle size"

### 7.3 Cross-Gate Dependencies
**Process:** Coordinate resolution across multiple agents
**Example:** "Responsive behavior changes affecting visual consistency - RDSE + VDL coordination required"

### 7.4 Performance vs. Functionality Trade-offs
**Process:** Business stakeholder decision with documented rationale
**Example:** "Third-party integration impact: +200ms LCP vs. required business functionality"

## Success Criteria Checklist

**Gate Validation:**
- [ ] All gates progressed in correct order (no bypassing)
- [ ] Each gate has documented pass status with evidence
- [ ] Blocking issues resolved before progression allowed
- [ ] Cross-gate dependencies validated and consistent

**Production Readiness:**
- [ ] Visual accuracy ≤2% deviation from approved designs
- [ ] Core Web Vitals green on mobile emulation (mid-tier device)
- [ ] Integration reliability proven through comprehensive failure testing
- [ ] Security compliance validated with audit documentation
- [ ] Monitoring and alerting active with baseline metrics established

**Documentation & Handoff:**
- [ ] Build Execution Pack complete with all required sections
- [ ] Component ID traceability maintained throughout deliverables
- [ ] Team runbooks updated with operational procedures
- [ ] Outstanding items documented with owners and timelines
- [ ] Change log documents major decisions and architectural choices

Remember: The Build Program Lead is accountable for production-ready deliverables that meet business objectives while maintaining technical excellence. This validation process ensures systematic quality control and successful production deployment with confident rollback capabilities.