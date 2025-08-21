# Build Phase QA Checklists

Comprehensive quality assurance checklists for each Build Phase gate to ensure systematic validation and production readiness.

## beauty_ok Gate QA Checklist (VDL Owner)

### Typography & Hierarchy Validation
- [ ] **Font Loading:** Custom fonts load without FOUT/FOIT, fallbacks defined
- [ ] **Typography Scale:** Consistent ratio (~1.2) implemented across all components
- [ ] **Line Heights:** Reading comfort maintained (1.4-1.6 for body text)
- [ ] **Heading Hierarchy:** H1-H6 properly implemented with semantic structure
- [ ] **Body Text:** Line length 60-80 characters, optimal readability
- [ ] **Font Weights:** Consistent usage matching design system specifications
- [ ] **Letter Spacing:** Applied correctly for headings and body text
- [ ] **Text Alignment:** Proper alignment for different content types and languages

### Color & Contrast Validation  
- [ ] **Brand Palette:** All colors match approved brand guidelines exactly
- [ ] **WCAG AA Compliance:** 4.5:1 contrast for normal text, 3:1 for large text/UI elements
- [ ] **Color Blindness:** Multiple visual cues provided beyond color alone
- [ ] **High Contrast Mode:** Compatibility tested and functional
- [ ] **Semantic Colors:** Success/error/warning colors consistent and accessible
- [ ] **Accent Usage:** Strategic and sparing application for emphasis
- [ ] **Background Combinations:** All text/background combinations compliant
- [ ] **Interactive States:** Color changes for hover/focus/active states accessible

### Spacing & Layout Validation
- [ ] **Grid System:** 4px/8px base unit system followed consistently
- [ ] **Component Spacing:** Internal padding/margins follow spacing scale
- [ ] **Section Spacing:** Vertical rhythm maintained between page sections
- [ ] **Negative Space:** Balanced white space prevents crowding
- [ ] **Alignment:** Elements properly aligned to grid and each other
- [ ] **Consistency:** Spacing patterns consistent across similar components
- [ ] **Responsive Spacing:** Spacing scales appropriately across breakpoints
- [ ] **Container Margins:** Proper page margins maintained at all viewport sizes

### Visual Hierarchy & CTA Validation
- [ ] **Primary CTA:** Unmistakably prominent, single focus per page
- [ ] **Secondary Actions:** Properly subordinated to primary CTA
- [ ] **Visual Weight:** Information hierarchy supports user decision-making
- [ ] **Scannable Content:** Subheadings and bullets aid quick comprehension
- [ ] **Above-Fold Anchor:** Clear value proposition immediately visible
- [ ] **Content Flow:** Visual flow guides attention to conversion points
- [ ] **Interactive Elements:** Clearly distinguishable from static content
- [ ] **Call-to-Action Language:** Clear action + outcome formulation

### Imagery & Media Validation
- [ ] **Consistency:** Uniform crop ratios, tone, and visual treatment
- [ ] **Grid Alignment:** All images align to layout grid system
- [ ] **Responsive Behavior:** Images scale and crop appropriately
- [ ] **Optimization:** Proper formats (WebP/AVIF with fallbacks)
- [ ] **Alt Text:** Meaningful alternative text for all images
- [ ] **Loading Performance:** Lazy loading implemented for below-fold images
- [ ] **Aspect Ratios:** Maintained across different viewport sizes
- [ ] **No Mixed Styles:** Consistent photographic treatment throughout

### Motion & Interaction Validation
- [ ] **Timing:** Micro-interactions 150-250ms for optimal perceived performance
- [ ] **Easing:** Consistent curves (ease-out preferred) across interactions
- [ ] **Reduced Motion:** Prefers-reduced-motion preference respected
- [ ] **Purpose:** Every animation serves functional purpose
- [ ] **Performance:** 60fps animations using transform/opacity
- [ ] **State Transitions:** Smooth transitions between component states
- [ ] **Feedback:** Immediate visual feedback for user interactions
- [ ] **Progressive Enhancement:** Core functionality works without animations

## responsive_ok Gate QA Checklist (RDSE Owner)

### Viewport Behavior Validation
- [ ] **No Overflow:** Zero horizontal scroll at any viewport size (320px+)
- [ ] **Content Reflow:** Text and elements wrap appropriately
- [ ] **Touch Targets:** Minimum 44px for interactive elements
- [ ] **Zoom Compatibility:** Usable at 200% zoom level
- [ ] **Orientation:** Landscape/portrait transitions handled gracefully
- [ ] **Device Pixel Ratios:** High-DPI displays render correctly
- [ ] **Safe Areas:** iOS safe area insets respected
- [ ] **Fold Optimization:** Critical content visible above the fold

### Typography & Spacing Scaling
- [ ] **Fluid Typography:** Smooth scaling using clamp() or viewport units
- [ ] **Reading Comfort:** Optimal line length maintained across sizes
- [ ] **Spacing Relationships:** Proportional spacing preserved
- [ ] **Container Padding:** Appropriate margins at all viewport sizes
- [ ] **Typography Hierarchy:** Remains clear across all breakpoints
- [ ] **Text Clipping:** No cut-off text at any viewport size
- [ ] **Line Height Scaling:** Reading comfort maintained across sizes
- [ ] **Multi-line Behavior:** Headings and text wrap gracefully

### Layout Stability Validation
- [ ] **CLS Score:** ≤0.10 measured on all key pages
- [ ] **Image Dimensions:** Aspect ratios preserved to prevent shifts
- [ ] **Font Loading:** Layout doesn't shift during font swap
- [ ] **Dynamic Content:** Content insertion doesn't destabilize layout
- [ ] **Skeleton States:** Loading states prevent layout jumping
- [ ] **Ad Space:** Advertisement space reserved if applicable
- [ ] **Third-party Embeds:** External content doesn't cause shifts
- [ ] **Interactive Feedback:** UI responses don't trigger layout changes

### Container Query Implementation
- [ ] **Component Responsiveness:** Components adapt to container width
- [ ] **Nested Containers:** Multiple container query levels work correctly
- [ ] **Performance:** Container queries don't cause layout thrashing
- [ ] **Browser Support:** Fallbacks for unsupported browsers
- [ ] **Query Logic:** Container breakpoints logical and functional
- [ ] **Content Adaptation:** Content changes appropriately for container size
- [ ] **Interaction States:** Container queries don't break interactive states
- [ ] **Debugging:** Container query boundaries visible in dev tools

### Component Library Validation
- [ ] **Storybook Deployment:** Accessible and functional component library
- [ ] **All States Documented:** Default, hover, focus, active, disabled, loading, error, empty
- [ ] **Responsive Examples:** Components shown across different container sizes
- [ ] **Interactive Controls:** Story controls functional for testing props
- [ ] **Documentation:** Usage guidelines and best practices provided
- [ ] **Accessibility Notes:** A11y requirements documented per component
- [ ] **Code Examples:** Implementation examples provided
- [ ] **Version Tracking:** Component versions tracked and documented

## integrations_ok Gate QA Checklist (IDE Owner)

### Payment Processing Validation
- [ ] **Success Flow:** Complete purchase flow tested with test cards
- [ ] **Card Declined:** Graceful error handling with clear user messaging
- [ ] **Network Timeout:** Timeout scenarios handled without data loss
- [ ] **Authentication Failures:** 3D Secure and other auth flows tested
- [ ] **Currency Handling:** Correct currency formatting and conversion
- [ ] **Tax Calculation:** Proper tax computation if applicable
- [ ] **Coupon Application:** Discount codes applied correctly
- [ ] **Refund Processing:** Refund flow tested and validated
- [ ] **PCI Compliance:** No payment data stored or logged
- [ ] **Security Headers:** Proper HTTPS and security headers implemented

### Webhook Infrastructure Validation
- [ ] **Signature Verification:** All webhook payloads validated
- [ ] **Idempotency:** Duplicate webhooks don't cause duplicate actions
- [ ] **Retry Logic:** Exponential backoff implemented correctly
- [ ] **Dead Letter Queue:** Failed webhooks captured for investigation
- [ ] **Timeout Handling:** Webhook processing doesn't exceed timeout limits
- [ ] **Error Logging:** Comprehensive error logging without PII
- [ ] **Monitoring:** Webhook health monitoring and alerting configured
- [ ] **Payload Validation:** Malformed payloads handled gracefully
- [ ] **Rate Limiting:** Protection against webhook spam
- [ ] **Recovery Procedures:** Failed webhook recovery process documented

### Analytics Integration Validation
- [ ] **Event Firing:** All events fire correctly with proper timing
- [ ] **Parameter Accuracy:** Event parameters match specifications exactly
- [ ] **Consent Management:** Events blocked when consent not granted
- [ ] **PII Scrubbing:** No personally identifiable information in parameters
- [ ] **Cross-Device Tracking:** User identification works across devices
- [ ] **Test Mode Exclusion:** Internal/test traffic properly excluded
- [ ] **Attribution Accuracy:** Conversion attribution working correctly
- [ ] **Debug Mode:** Analytics debug tools functional for validation
- [ ] **Data Layer:** GTM dataLayer populated correctly
- [ ] **Error Tracking:** Analytics errors captured and monitored

### ESP/CRM Integration Validation
- [ ] **Contact Creation:** New contacts created with proper data mapping
- [ ] **Duplicate Prevention:** Email hash deduplication working correctly
- [ ] **Tag Application:** Contact tags applied based on user behavior
- [ ] **Lifecycle Management:** Contact lifecycle stages updated appropriately
- [ ] **Unsubscribe Handling:** Unsubscribe requests processed immediately
- [ ] **Data Synchronization:** Contact data stays synchronized across systems
- [ ] **API Error Handling:** Third-party API failures handled gracefully
- [ ] **Rate Limiting:** API calls respect service rate limits
- [ ] **Automation Triggers:** Marketing automation workflows triggered correctly
- [ ] **Data Privacy:** GDPR/privacy compliance maintained throughout

### GDPR Consent Management Validation
- [ ] **Granular Consent:** Different consent types (analytics, marketing) handled separately
- [ ] **Consent Persistence:** User consent choices preserved across sessions
- [ ] **Consent Updates:** Changes in consent immediately affect data processing
- [ ] **Withdrawal Process:** Easy consent withdrawal mechanism provided
- [ ] **Legal Basis:** Clear legal basis for data processing communicated
- [ ] **Data Retention:** Data retention policies enforced automatically
- [ ] **Subject Rights:** Data subject rights (access, deletion) supported
- [ ] **Audit Trail:** Consent decisions logged for compliance auditing
- [ ] **Cookie Management:** Cookie consent integrated with data processing consent
- [ ] **Cross-Border Transfer:** Data transfer compliance addressed if applicable

## quality_ok Gate QA Checklist (QRR Owner)

### Test Coverage Validation
- [ ] **Unit Tests:** ≥80% coverage with meaningful assertions
- [ ] **Integration Tests:** All API endpoints and database interactions tested
- [ ] **E2E Tests:** Complete user journeys tested including error scenarios
- [ ] **Visual Regression:** Baseline screenshots established and validated
- [ ] **Accessibility Tests:** Automated (axe/Pa11y) and manual testing completed
- [ ] **Performance Tests:** Load testing completed for expected traffic
- [ ] **Security Tests:** Vulnerability scanning and penetration testing completed
- [ ] **Cross-Browser Tests:** Target browser matrix validated
- [ ] **Mobile Tests:** Real device testing on key mobile platforms
- [ ] **API Tests:** All integration endpoints tested with various payloads

### Performance Budget Validation
- [ ] **Core Web Vitals:** LCP ≤2.5s, INP ≤200ms, CLS ≤0.10
- [ ] **Bundle Sizes:** JavaScript ≤200KB gz, CSS ≤80KB gz
- [ ] **Image Optimization:** All images optimized with proper formats
- [ ] **Font Loading:** Web fonts optimized with proper fallbacks
- [ ] **Caching Strategy:** Proper cache headers and service worker
- [ ] **Third-party Impact:** External scripts within performance budget
- [ ] **Network Throttling:** Performance validated on slow connections
- [ ] **Memory Usage:** Memory leaks identified and addressed
- [ ] **CPU Performance:** JavaScript execution time optimized
- [ ] **Lighthouse Scores:** Performance ≥90, Accessibility ≥95, Best Practices ≥90

### Security Compliance Validation
- [ ] **HTTPS Enforcement:** All traffic encrypted and secured
- [ ] **Security Headers:** CSP, HSTS, X-Frame-Options configured
- [ ] **Input Sanitization:** All user inputs properly sanitized
- [ ] **XSS Prevention:** Cross-site scripting protection implemented
- [ ] **CSRF Protection:** Cross-site request forgery protection active
- [ ] **Authentication:** Secure authentication and session management
- [ ] **Authorization:** Proper access controls and permissions
- [ ] **Dependency Scanning:** No high-severity vulnerabilities in dependencies
- [ ] **Secrets Management:** No hardcoded secrets or API keys
- [ ] **SQL Injection:** Database queries protected against injection attacks

### Accessibility Compliance Validation
- [ ] **WCAG AA Standards:** Level AA compliance achieved across all content
- [ ] **Keyboard Navigation:** Full functionality accessible via keyboard
- [ ] **Screen Reader:** Content accessible with assistive technologies
- [ ] **Color Independence:** Information conveyed without color dependency
- [ ] **Focus Management:** Logical focus order and visible focus indicators
- [ ] **Alternative Text:** Meaningful alt text for all images and media
- [ ] **Form Labels:** Proper labels and instructions for all form elements
- [ ] **Error Identification:** Clear error identification and correction guidance
- [ ] **Language Declaration:** Page language properly declared
- [ ] **Semantic Structure:** Proper heading hierarchy and landmark roles

## release_ok Gate QA Checklist (QRR Owner)

### CI/CD Pipeline Validation
- [ ] **Automated Testing:** All tests run automatically before deployment
- [ ] **Build Process:** Consistent builds across all environments
- [ ] **Environment Parity:** Development, staging, production environments consistent
- [ ] **Deployment Automation:** Zero-downtime deployment process validated
- [ ] **Branch Protection:** Main branch protected with required status checks
- [ ] **Code Review:** All changes require peer review before merge
- [ ] **Version Tagging:** Proper semantic versioning implemented
- [ ] **Rollback Capability:** One-click rollback tested and documented
- [ ] **Infrastructure as Code:** Infrastructure provisioned through code
- [ ] **Security Scanning:** Automated security scans in CI pipeline

### Production Deployment Validation
- [ ] **Health Checks:** All application health endpoints responding
- [ ] **Database Migration:** Schema changes applied successfully
- [ ] **Cache Warming:** Caches populated to prevent cold start issues
- [ ] **CDN Configuration:** Content delivery network properly configured
- [ ] **Load Balancing:** Traffic distribution working correctly
- [ ] **SSL Certificates:** Valid certificates installed and auto-renewal configured
- [ ] **DNS Configuration:** Domain routing working correctly
- [ ] **Environment Variables:** All production config values properly set
- [ ] **File Permissions:** Proper file and directory permissions set
- [ ] **Service Dependencies:** All external services accessible and functional

### Monitoring & Alerting Validation
- [ ] **Error Tracking:** Application errors captured and categorized
- [ ] **Performance Monitoring:** Real user monitoring active
- [ ] **Uptime Monitoring:** Synthetic checks running with proper intervals
- [ ] **Infrastructure Monitoring:** Server health and resource usage tracked
- [ ] **Business Metrics:** Key business metrics tracked and dashboards created
- [ ] **Alert Configuration:** Alert thresholds set appropriately with escalation
- [ ] **Log Aggregation:** Application and infrastructure logs collected
- [ ] **Dashboard Access:** Team members have appropriate dashboard access
- [ ] **Incident Response:** On-call procedures and escalation paths documented
- [ ] **SLA Monitoring:** Service level agreement compliance tracked

### Operational Readiness Validation
- [ ] **Team Training:** Team trained on new features and operational procedures
- [ ] **Documentation:** Runbooks and troubleshooting guides updated
- [ ] **Backup Procedures:** Data backup and recovery procedures tested
- [ ] **Disaster Recovery:** Disaster recovery plan tested and documented
- [ ] **Capacity Planning:** System capacity assessed for expected growth
- [ ] **Support Procedures:** Customer support team briefed on new features
- [ ] **Change Management:** Change management process followed
- [ ] **Communication Plan:** Stakeholders informed of deployment and changes
- [ ] **Rollback Plan:** Detailed rollback procedures documented and tested
- [ ] **Post-Deploy Validation:** Post-deployment validation checklist prepared

## Cross-Gate Validation

### Component ID Consistency
- [ ] **Naming Convention:** PAGE/SECTION/COMP pattern followed consistently
- [ ] **Cross-Reference Accuracy:** Same IDs used across all agent deliverables
- [ ] **Traceability:** Components traceable from design through implementation
- [ ] **Documentation Sync:** Component documentation updated with final IDs

### Performance Consistency  
- [ ] **Budget Alignment:** All agents respect shared performance budgets
- [ ] **Optimization Coordination:** Performance optimizations don't conflict
- [ ] **Monitoring Integration:** Performance metrics tracked consistently

### Security Consistency
- [ ] **Cross-Integration Security:** All integrations follow security standards
- [ ] **Data Flow Security:** PII handling consistent across all touchpoints
- [ ] **Authentication Integration:** Single security model across all features

Remember: These checklists ensure systematic quality validation across all Build Phase gates. Each item should be explicitly validated with evidence before marking as complete. Quality gates protect not just technical implementation, but user experience and business success.