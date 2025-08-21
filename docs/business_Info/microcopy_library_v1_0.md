# Microcopy Library v1.0 — Mentoria Seja Livre

**Client:** Mentoria Seja Livre  
**Date:** 2025-08-20  
**Version:** v1.0  
**Prepared by:** Copy Program Lead Orchestrator  
**Language:** Portuguese (Brazil primary, Portugal variants included)

---

## Executive Summary

This Microcopy Library v1.0 provides comprehensive microcopy for all user interface elements, form interactions, error states, and trust-building components across the Mentoria Seja Livre digital experience. All copy maintains Amanda avatar voice consistency while ensuring accessibility and conversion optimization.

**Microcopy Categories:**
- Form labels and validation messages
- Trust and security elements  
- Loading and success states
- Error handling and recovery
- Navigation and interaction hints
- LGPD/GDPR compliance messages

---

## Form Interface Microcopy

### Modal Form Labels
**Block ID Schema:** `micro.form.*`

#### Input Field Labels
```json
{
  "block_id": "micro.form.name.label",
  "text": "Seu nome completo",
  "placeholder": "Como gostaria de ser chamada?",
  "tone": "personal, welcoming",
  "accessibility": "Clearly identifies purpose, screen reader friendly"
}
```

```json
{
  "block_id": "micro.form.email.label", 
  "text": "Seu melhor email",
  "placeholder": "onde@você.quer.receber.orientações",
  "helper_text": "Usaremos apenas para enviar conteúdo relevante sobre sua transformação",
  "tone": "reassuring about email use"
}
```

```json
{
  "block_id": "micro.form.phone.label",
  "text": "WhatsApp (com DDD)",
  "placeholder": "(11) 99999-9999",
  "helper_text": "Para suporte durante a mentoria e agendamento de conversas",
  "tone": "explains WhatsApp usage clearly"
}
```

```json
{
  "block_id": "micro.form.business_type.label",
  "text": "Tipo do seu negócio",
  "placeholder": "Selecione...",
  "options": [
    "Clínica/Consultório médico",
    "Loja/Comércio/E-commerce", 
    "Serviços profissionais (Arquitetura, Advocacia, Contabilidade)",
    "Academia/Fitness/Pilates",
    "Beleza/Estética/Salão",
    "Consultoria/Coaching",
    "Outro"
  ]
}
```

```json
{
  "block_id": "micro.form.monthly_revenue.label",
  "text": "Faturamento mensal atual",
  "options": [
    "Até R$ 10.000",
    "R$ 10.001 a R$ 20.000", 
    "R$ 20.001 a R$ 35.000",
    "Acima de R$ 35.000",
    "Prefiro não informar"
  ],
  "helper_text": "Informação confidencial para personalizar orientações"
}
```

```json
{
  "block_id": "micro.form.work_hours.label",
  "text": "Horas de trabalho por dia (em média)",
  "options": [
    "Até 8 horas",
    "8 a 10 horas",
    "10 a 12 horas", 
    "Mais de 12 horas",
    "Varia muito"
  ]
}
```

```json
{
  "block_id": "micro.form.main_struggle.label",
  "text": "Sua maior dificuldade hoje",
  "options": [
    "Exaustão e sobrecarga de trabalho",
    "Dificuldade para delegar e confiar na equipe",
    "Preços baixos e clientes que pechincha",
    "Falta de sistemas organizados no negócio",
    "Não conseguir viajar ou descansar sem preocupação",
    "Outro"
  ]
}
```

#### Submit Button States
```json
{
  "block_id": "micro.form.submit.default",
  "text": "Enviar respostas",
  "tone": "action-oriented, clear purpose"
}
```

```json
{
  "block_id": "micro.form.submit.loading",
  "text": "Enviando...",
  "tone": "progress indication"
}
```

```json
{
  "block_id": "micro.form.submit.success",
  "text": "✅ Enviado com sucesso!",
  "tone": "celebration, confirmation"
}
```

---

## Validation & Error Messages

### Field Validation
**Block ID Schema:** `micro.validation.*`

#### Required Field Errors
```json
{
  "block_id": "micro.validation.name_required",
  "text": "Por favor, digite seu nome completo",
  "tone": "polite request, helpful"
}
```

```json
{
  "block_id": "micro.validation.email_required",
  "text": "Email é necessário para enviar o questionário",
  "tone": "explains why email is needed"
}
```

```json
{
  "block_id": "micro.validation.email_invalid",
  "text": "Digite um email válido (exemplo: maria@email.com)",
  "tone": "helpful correction with example"
}
```

```json
{
  "block_id": "micro.validation.phone_required", 
  "text": "WhatsApp é necessário para suporte durante a mentoria",
  "tone": "explains purpose, reduces resistance"
}
```

```json
{
  "block_id": "micro.validation.phone_invalid",
  "text": "Digite o WhatsApp com DDD (exemplo: 11 99999-9999)",
  "tone": "helpful format guidance"
}
```

#### Selection Validation
```json
{
  "block_id": "micro.validation.business_type_required",
  "text": "Selecione o tipo do seu negócio para personalizar orientações",
  "tone": "explains benefit of providing information"
}
```

```json
{
  "block_id": "micro.validation.revenue_required",
  "text": "Faixa de faturamento ajuda a personalizar a abordagem",
  "tone": "benefits-focused vs demanding"
}
```

```json
{
  "block_id": "micro.validation.hours_required",
  "text": "Horas de trabalho são importantes para entender sua situação",
  "tone": "empathetic understanding"
}
```

### System Error Messages
**Block ID Schema:** `micro.error.*`

```json
{
  "block_id": "micro.error.network",
  "text": "Erro de conexão. Verifique sua internet e tente novamente.",
  "tone": "helpful troubleshooting"
}
```

```json
{
  "block_id": "micro.error.server",
  "text": "Erro interno. Tente novamente ou entre em contato via WhatsApp.",
  "contact": "+55 11 99999-9999",
  "tone": "provides alternative contact method"
}
```

```json
{
  "block_id": "micro.error.rate_limit",
  "text": "Muitas tentativas. Aguarde alguns minutos e tente novamente.",
  "tone": "clear explanation of rate limiting"
}
```

---

## Trust & Security Elements

### Privacy & Data Protection
**Block ID Schema:** `micro.trust.*`

#### Privacy Reassurance
```json
{
  "block_id": "micro.trust.privacy",
  "text": "🔒 Seus dados estão seguros e não serão compartilhados",
  "placement": "Below form fields",
  "compliance": "LGPD transparency requirement"
}
```

```json
{
  "block_id": "micro.trust.spam",
  "text": "Sem spam. Apenas conteúdo relevante para sua transformação empresarial",
  "placement": "Near email field",
  "tone": "quality promise"
}
```

```json
{
  "block_id": "micro.trust.data_use",
  "text": "Informações usadas apenas para avaliar seu fit com a mentoria",
  "placement": "Form submission area",
  "compliance": "Purpose limitation disclosure"
}
```

#### Consent & Communication
```json
{
  "block_id": "micro.trust.email_consent",
  "text": "Ao enviar, você concorda em receber emails sobre transformação empresarial. Pode cancelar a qualquer momento.",
  "placement": "Submit button area",
  "compliance": "LGPD/GDPR consent clarity"
}
```

```json
{
  "block_id": "micro.trust.whatsapp_consent", 
  "text": "WhatsApp usado apenas para suporte da mentoria e agendamentos. Nunca para spam.",
  "placement": "Phone field explanation",
  "tone": "communication boundary setting"
}
```

### Security Indicators
```json
{
  "block_id": "micro.trust.ssl",
  "text": "🔐 Conexão segura (SSL)",
  "placement": "Footer or form area",
  "technical": "Visual security indicator"
}
```

```json
{
  "block_id": "micro.trust.data_protection",
  "text": "Dados protegidos conforme LGPD",
  "placement": "Privacy policy link area",
  "compliance": "Brazilian data protection reference"
}
```

---

## Loading & Progress States

### Loading Indicators
**Block ID Schema:** `micro.loading.*`

#### Form Submission Progress
```json
{
  "block_id": "micro.loading.form_submit",
  "text": "Enviando suas respostas...",
  "animation": "spinner or progress bar",
  "tone": "calm progress indication"
}
```

```json
{
  "block_id": "micro.loading.modal_open",
  "text": "Carregando formulário...",
  "duration": "< 2 seconds",
  "fallback": "Direct form display if loading fails"
}
```

#### Page/Content Loading
```json
{
  "block_id": "micro.loading.page",
  "text": "Carregando...",
  "tone": "simple, non-intrusive"
}
```

```json
{
  "block_id": "micro.loading.section", 
  "text": "Carregando conteúdo...",
  "context": "For lazy-loaded sections"
}
```

### Success States
**Block ID Schema:** `micro.success.*`

#### Form Completion Success
```json
{
  "block_id": "micro.success.form_submit",
  "text": "✅ Respostas enviadas com sucesso!",
  "tone": "celebration, achievement"
}
```

```json
{
  "block_id": "micro.success.redirect",
  "text": "Redirecionando para próximos passos...",
  "tone": "guidance, progression"
}
```

#### Email Confirmation
```json
{
  "block_id": "micro.success.email_sent",
  "text": "📧 Questionário enviado para seu email",
  "tone": "confirmation with next step hint"
}
```

---

## Navigation & Interaction Hints

### Call-to-Action Micro-Interactions
**Block ID Schema:** `micro.cta.*`

#### Button Hover States
```json
{
  "block_id": "micro.cta.hover.primary",
  "text": "Clique para começar sua transformação →",
  "interaction": "Appears on hover over primary CTA",
  "tone": "encouraging, directional"
}
```

```json
{
  "block_id": "micro.cta.hover.secondary",
  "text": "Ver mais detalhes →",
  "interaction": "Secondary CTA hover state",
  "tone": "informational navigation"
}
```

#### Mobile Touch Hints
```json
{
  "block_id": "micro.cta.mobile.tap",
  "text": "Toque aqui",
  "context": "Mobile-specific interaction hint",
  "usage": "For critical CTAs on mobile"
}
```

### Scroll & Navigation Hints
```json
{
  "block_id": "micro.navigation.scroll_down",
  "text": "↓ Role para saber mais",
  "placement": "Hero section bottom",
  "animation": "Subtle bounce animation"
}
```

```json
{
  "block_id": "micro.navigation.back_to_top",
  "text": "↑ Voltar ao topo",
  "placement": "Fixed position after scroll",
  "trigger": "After 50% page scroll"
}
```

---

## Accessibility Microcopy

### Screen Reader Support
**Block ID Schema:** `micro.a11y.*`

#### Form Accessibility
```json
{
  "block_id": "micro.a11y.form_instructions",
  "text": "Formulário de qualificação para Mentoria Seja Livre. Preencha todos os campos obrigatórios.",
  "usage": "Screen reader announcement",
  "placement": "Hidden text for assistive technology"
}
```

```json
{
  "block_id": "micro.a11y.required_fields",
  "text": "Campos marcados com asterisco são obrigatórios",
  "usage": "Form instruction for screen readers",
  "compliance": "WCAG 2.1 AA requirement"
}
```

#### Interactive Element Labels
```json
{
  "block_id": "micro.a11y.modal_close",
  "text": "Fechar modal de inscrição",
  "usage": "Close button aria-label",
  "interaction": "ESC key or click to close"
}
```

```json
{
  "block_id": "micro.a11y.expand_testimonial",
  "text": "Expandir depoimento completo",
  "usage": "Testimonial interaction aria-label"
}
```

### Keyboard Navigation
```json
{
  "block_id": "micro.a11y.keyboard_instructions",
  "text": "Use Tab para navegar e Enter para selecionar",
  "placement": "Hidden instruction for keyboard users",
  "context": "Complex interactive elements"
}
```

---

## Error Recovery & Help

### Helpful Error Recovery
**Block ID Schema:** `micro.help.*`

#### Form Completion Help
```json
{
  "block_id": "micro.help.form_stuck",
  "text": "Dificuldades para preencher? Entre em contato: [WhatsApp]",
  "trigger": "After multiple validation errors",
  "tone": "supportive, offers alternative"
}
```

```json
{
  "block_id": "micro.help.field_explanation",
  "text": "ℹ️ Por que pedimos essa informação?",
  "interaction": "Tooltip or expandable explanation",
  "content": "Para personalizar nossa abordagem ao seu momento empresarial"
}
```

#### Connection Issues
```json
{
  "block_id": "micro.help.offline",
  "text": "Sem conexão? Suas respostas foram salvas. Tente novamente quando voltar online.",
  "tone": "reassuring, progress preservation"
}
```

```json
{
  "block_id": "micro.help.slow_connection",
  "text": "Conexão lenta detectada. Aguarde um momento...",
  "tone": "patient understanding"
}
```

---

## Portuguese Localization Variants

### Portugal (pt-PT) Microcopy Variants
**Block ID Schema:** `micro.i18n.pt_pt.*`

#### Form Labels (PT)
```json
{
  "block_id": "micro.i18n.pt_pt.email.label",
  "pt_BR": "Seu melhor email",
  "pt_PT": "O seu melhor email",
  "note": "Portuguese includes definite article"
}
```

```json
{
  "block_id": "micro.i18n.pt_pt.phone.label",
  "pt_BR": "WhatsApp (com DDD)",
  "pt_PT": "WhatsApp (com indicativo)",
  "note": "Portugal uses 'indicativo' vs Brazilian 'DDD'"
}
```

```json
{
  "block_id": "micro.i18n.pt_pt.revenue.label", 
  "pt_BR": "Faturamento mensal atual",
  "pt_PT": "Facturação mensal actual",
  "note": "PT: facturação vs BR: faturamento, actual vs atual"
}
```

#### Validation Messages (PT)
```json
{
  "block_id": "micro.i18n.pt_pt.email_invalid",
  "pt_BR": "Digite um email válido",
  "pt_PT": "Introduza um email válido",
  "note": "PT: introduza vs BR: digite"
}
```

```json
{
  "block_id": "micro.i18n.pt_pt.phone_format",
  "pt_BR": "Digite o WhatsApp com DDD",
  "pt_PT": "Introduza o WhatsApp com indicativo",
  "note": "Consistent with localization patterns"
}
```

#### Trust Elements (PT)
```json
{
  "block_id": "micro.i18n.pt_pt.privacy",
  "pt_BR": "Seus dados estão seguros",
  "pt_PT": "Os seus dados estão seguros",
  "note": "Portuguese article preference"
}
```

### Currency & Business Context (PT)
```json
{
  "block_id": "micro.i18n.pt_pt.revenue_ranges",
  "adaptation": "Convert Brazilian Real ranges to Euro equivalents for Portuguese market",
  "pt_BR": ["Até R$ 10.000", "R$ 10.001 a R$ 20.000"],
  "pt_PT": ["Até € 2.500", "€ 2.501 a € 5.000"],
  "note": "Approximate currency conversion for local relevance"
}
```

---

## Implementation Guidelines

### Microcopy Hierarchy
```json
{
  "hierarchy": {
    "critical": "Error messages, validation, required field labels",
    "important": "Trust elements, CTA labels, success confirmations", 
    "helpful": "Tooltips, hints, progress indicators",
    "nice_to_have": "Hover states, animation labels, extra guidance"
  }
}
```

### Consistency Rules
```json
{
  "consistency_rules": {
    "tone": "Maintain Amanda avatar voice throughout all microcopy",
    "terminology": "Use consistent terms across all UI elements",
    "punctuation": "Brazilian Portuguese punctuation standards",
    "accessibility": "All interactive elements have clear labels",
    "localization": "PT variants available for key elements"
  }
}
```

### Quality Assurance
```json
{
  "qa_checklist": [
    "All form labels clearly describe purpose",
    "Error messages are helpful, not just prohibitive",
    "Trust elements address privacy concerns appropriately",
    "Loading states provide clear progress indication", 
    "Success states celebrate completion appropriately",
    "Accessibility labels support screen readers",
    "Portuguese variants maintain cultural appropriateness"
  ]
}
```

This Microcopy Library v1.0 ensures comprehensive coverage of all user interface interactions while maintaining Amanda avatar voice consistency and accessibility standards across Portuguese-speaking markets.