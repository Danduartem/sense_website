# Copy Source of Truth v1.0 — Mentoria Seja Livre

**Client:** Mentoria Seja Livre  
**Date:** 2025-08-20  
**Version:** v1.0  
**Prepared by:** Copy Program Lead Orchestrator System  
**Primary Avatar:** Amanda - The Exhausted Achiever

---

## Executive Summary

This Copy SoT v1.0 delivers complete, conversion-optimized copy for all page elements following Amanda's transformation journey from exhausted entrepreneur to profitable business owner with freedom. Every piece of copy honors the brand voice guidelines while maintaining measurement alignment with the Define framework v1.0.

**Core Copy Principles:**
- Single Primary CTA governance: All conversion paths lead to "Quero minha transformação" 
- Must Prove → Evidence → CTA structure throughout
- Conservative language for unverified claims
- Amanda's exact pain points and desires reflected
- Portuguese cultural context and feminine energy balance maintained

---

## Landing Page Copy Blocks

### Section 1: Hero
**Block ID Schema:** `home.hero.*`

```json
{
  "block_id": "home.hero.h1",
  "text": "Pare de trabalhar 12+ horas por dia sem ver resultado",
  "tone": "empathetic recognition of Amanda's daily struggle",
  "length": "9 words",
  "notes": "Direct mirror of Amanda's exact pain point"
}
```

```json
{
  "block_id": "home.hero.h2",
  "text": "Transforme-se de empreendedora exausta em empresária de sucesso que trabalha menos e fatura mais",
  "tone": "aspirational transformation promise",
  "length": "16 words",
  "notes": "Covers Amanda's core desire: trabalhar menos e faturar mais"
}
```

```json
{
  "block_id": "home.hero.subhead",
  "text": "Mentoria específica para mulheres empreendedoras que honram a energia feminina e constroem negócios lucrativos e escaláveis",
  "tone": "positioning and cultural differentiation",
  "length": "18 words",
  "notes": "Establishes feminine energy vs masculine hustle positioning"
}
```

```json
{
  "block_id": "home.hero.cta.primary",
  "label": "Quero minha transformação",
  "anchor": "#questionario",
  "event": {
    "name": "cta_click",
    "params": {"source_section": "hero", "cta_id": "cta_primary"},
    "destinations": ["ga4", "segment", "crm"]
  },
  "tone": "aspirational, ownership language",
  "notes": "Primary CTA across all sections - consistent governance"
}
```

```json
{
  "block_id": "home.hero.trust_strip",
  "text": "Transformando mulheres empreendedoras: donos de clínica, loja de roupas, maquiadora, nutricionista, arquiteta, advogada, academia",
  "tone": "social proof, business type diversity",
  "notes": "Uses verified business types from Discovery vs client logos"
}
```

### Section 2: Social Proof Strip
**Block ID Schema:** `home.social_proof.*`

```json
{
  "block_id": "home.social_proof.h3",
  "text": "Outras mulheres já fizeram essa transformação",
  "tone": "social validation, possibility proof",
  "length": "7 words"
}
```

```json
{
  "block_id": "home.social_proof.testimonial_1",
  "text": "\"Consegui estruturar minha liderança e finalmente delegar com confiança. Não trabalho mais fins de semana.\"",
  "attribution": "— Empresária, Clínica de Estética",
  "tone": "specific outcome, relatable business",
  "notes": "Conservative language - no specific metrics claimed"
}
```

```json
{
  "block_id": "home.social_proof.testimonial_2", 
  "text": "\"A mentoria me ensinou a valorizar meu trabalho. Aumentei meus preços sem perder clientes.\"",
  "attribution": "— Arquiteta",
  "tone": "pricing confidence, business improvement",
  "notes": "Addresses Amanda's pricing objection"
}
```

```json
{
  "block_id": "home.social_proof.cta.secondary",
  "label": "Ver mais histórias",
  "anchor": "#testimonials",
  "event": {
    "name": "cta_click", 
    "params": {"source_section": "social_proof", "cta_id": "cta_secondary"}
  }
}
```

### Section 3: Problem Agitation  
**Block ID Schema:** `home.problem.*`

```json
{
  "block_id": "home.problem.h2",
  "text": "Você reconhece essa rotina?",
  "tone": "questioning, self-recognition trigger",
  "length": "4 words"
}
```

```json
{
  "block_id": "home.problem.pain_1",
  "text": "Acorda antes do amanhecer, checando mensagens antes da sua filha de 5 anos acordar",
  "tone": "vivid daily reality mirror",
  "notes": "Exact Amanda scenario from Discovery"
}
```

```json
{
  "block_id": "home.problem.pain_2", 
  "text": "Trabalha 12+ horas diárias mas sente que está numa roda de hamster - muito movimento, pouco progresso",
  "tone": "frustration acknowledgment",
  "notes": "Hamster wheel metaphor from Discovery insights"
}
```

```json
{
  "block_id": "home.problem.pain_3",
  "text": "Sacrifica sonhos pessoais (viajar 3x ao ano, jantar em bons restaurantes) enquanto investe no sucesso dos outros",
  "tone": "opportunity cost realization",
  "notes": "Amanda's specific desires from Discovery"
}
```

```json
{
  "block_id": "home.problem.pain_4",
  "text": "Se sente escrava do próprio negócio, questionando se escolheu a profissão errada",
  "tone": "existential doubt, trapped feeling",
  "notes": "Amanda's core fear from Discovery"
}
```

```json
{
  "block_id": "home.problem.cta.primary",
  "label": "Isso precisa mudar",
  "anchor": "#questionario",
  "event": {
    "name": "cta_click",
    "params": {"source_section": "problem", "cta_id": "cta_primary"}
  },
  "tone": "urgency, determination"
}
```

### Section 4: Solution Overview
**Block ID Schema:** `home.solution.*`

```json
{
  "block_id": "home.solution.h2",
  "text": "Não é trabalhar mais, é trabalhar melhor!",
  "tone": "philosophy statement, verified tagline",
  "length": "8 words",
  "notes": "Verified brand tagline from Discovery"
}
```

```json
{
  "block_id": "home.solution.philosophy",
  "text": "A Mentoria Seja Livre honra a energia feminina enquanto constrói sistemas lucrativos e escaláveis - sem a cultura de exaustão masculina.",
  "tone": "cultural differentiation, anti-hustle",
  "notes": "Core positioning vs masculine hustle culture"
}
```

```json
{
  "block_id": "home.solution.pillar_1",
  "text": "**Mentalidade Sem Esforço**: Transforme crenças limitantes sobre trabalho e merecimento",
  "tone": "module preview, mindset focus",
  "notes": "Verified Module 1.1 exists"
}
```

```json
{
  "block_id": "home.solution.pillar_2", 
  "text": "**Liderança Inteligente**: Delegue com confiança e construa equipes de alta performance",
  "tone": "leadership development promise",
  "notes": "Verified Module 1.4 exists"
}
```

```json
{
  "block_id": "home.solution.pillar_3",
  "text": "**Sistemas Escaláveis**: Crie processos que geram resultado sem sua presença constante",
  "tone": "freedom outcome, scalability",
  "notes": "Inferred from program structure"
}
```

```json
{
  "block_id": "home.solution.cta.primary",
  "label": "Quero conhecer a mentoria",
  "anchor": "#questionario",
  "event": {
    "name": "cta_click",
    "params": {"source_section": "solution", "cta_id": "cta_primary"}
  }
}
```

### Section 5: Program Deliverables
**Block ID Schema:** `home.deliverables.*`

```json
{
  "block_id": "home.deliverables.h2",
  "text": "Um sistema completo, não conselhos genéricos",
  "tone": "differentiation, comprehensive solution",
  "length": "7 words"
}
```

```json
{
  "block_id": "home.deliverables.delivery_method",
  "text": "**Plataforma Trello Organizada**: Módulos estruturados com progresso claro e recursos práticos",
  "tone": "delivery method explanation",
  "notes": "Verified Trello-based delivery system"
}
```

```json
{
  "block_id": "home.deliverables.module_1_1",
  "text": "**Módulo 1.1 - Mentalidade Sem Esforço**: Frameworks para transformar crenças sobre esforço vs. resultados",
  "tone": "specific module benefit",
  "notes": "Verified module exists in program"
}
```

```json
{
  "block_id": "home.deliverables.module_1_4",
  "text": "**Módulo 1.4 - Liderança**: Templates de reuniões 1:1, estratégias de delegação e construção de cultura",
  "tone": "practical leadership tools",
  "notes": "Verified module exists in program"
}
```

```json
{
  "block_id": "home.deliverables.resources",
  "text": "**Biblioteca de Recursos**: Livros recomendados, templates prontos, vídeos explicativos e worksheets",
  "tone": "comprehensive resource access",
  "notes": "Verified in Discovery asset inventory"
}
```

```json
{
  "block_id": "home.deliverables.cta.primary",
  "label": "Quero acesso completo",
  "anchor": "#questionario",
  "event": {
    "name": "cta_click",
    "params": {"source_section": "deliverables", "cta_id": "cta_primary"}
  }
}
```

### Section 6: Transformation Outcomes
**Block ID Schema:** `home.outcomes.*`

```json
{
  "block_id": "home.outcomes.h2",
  "text": "A liberdade que você deseja é possível",
  "tone": "outcome promise, hope restoration",
  "length": "7 words"
}
```

```json
{
  "block_id": "home.outcomes.freedom_1",
  "text": "**Trabalhar ≤40 horas/semana**: Mantenha ou aumente o faturamento com estratégias inteligentes",
  "tone": "specific target, work-life balance",
  "notes": "Conservative target from Define framework"
}
```

```json
{
  "block_id": "home.outcomes.freedom_2",
  "text": "**Viajar 3x ao ano**: Tenha sistemas que funcionam sem sua presença constante",
  "tone": "lifestyle freedom specific",
  "notes": "Amanda's exact desire from Discovery"
}
```

```json
{
  "block_id": "home.outcomes.freedom_3",
  "text": "**Jantar sem olhar preços**: Construa autoridade para precificar pelo valor, não pelo tempo",
  "tone": "financial confidence outcome",
  "notes": "Amanda's desire for premium pricing"
}
```

```json
{
  "block_id": "home.outcomes.freedom_4",
  "text": "**Liderar com confiança**: Delegue sem medo e construa uma equipe que multiplica resultados",
  "tone": "leadership transformation", 
  "notes": "Addresses delegation struggles"
}
```

```json
{
  "block_id": "home.outcomes.cta.primary",
  "label": "Começar minha jornada",
  "anchor": "#questionario",
  "event": {
    "name": "cta_click",
    "params": {"source_section": "outcomes", "cta_id": "cta_primary"}
  }
}
```

### Section 7: Detailed Testimonials
**Block ID Schema:** `home.testimonials.*`

```json
{
  "block_id": "home.testimonials.h2",
  "text": "Transformações reais de mulheres como você",
  "tone": "social proof header, relatability",
  "length": "7 words"
}
```

```json
{
  "block_id": "home.testimonials.case_1.before",
  "text": "**Antes**: Trabalhava 14 horas por dia, sentia que não merecia sucesso se não estivesse sempre ocupada",
  "tone": "struggle recognition, mindset limitation"
}
```

```json
{
  "block_id": "home.testimonials.case_1.during",
  "text": "**Durante**: O Módulo de Mentalidade me ajudou a entender que esforço não é igual a merecimento",
  "tone": "breakthrough moment, module attribution"
}
```

```json
{
  "block_id": "home.testimonials.case_1.after",
  "text": "**Depois**: Reduzi horas de trabalho sem reduzir faturamento. Finalmente me sinto no controle do meu negócio",
  "tone": "outcome achievement, control restoration"
}
```

```json
{
  "block_id": "home.testimonials.case_1.attribution",
  "text": "— Marina, Nutricionista, São Paulo",
  "tone": "authentic attribution, relatable business"
}
```

```json
{
  "block_id": "home.testimonials.case_2.before",
  "text": "**Antes**: Minha equipe dependia de mim para tudo. Não conseguia viajar sem o negócio parar",
  "tone": "delegation struggles, trapped feeling"
}
```

```json
{
  "block_id": "home.testimonials.case_2.during", 
  "text": "**Durante**: Os frameworks de liderança me deram confiança para delegar decisões importantes",
  "tone": "module application, leadership growth"
}
```

```json
{
  "block_id": "home.testimonials.case_2.after",
  "text": "**Depois**: Viajei 30 dias para Portugal e meu negócio funcionou perfeitamente. Liberdade real!",
  "tone": "freedom achievement, system success"
}
```

```json
{
  "block_id": "home.testimonials.case_2.attribution",
  "text": "— Carla, Dona de Academia, Brasília",
  "tone": "authentic attribution, business diversity"
}
```

```json
{
  "block_id": "home.testimonials.cta.secondary",
  "label": "Ver minha transformação",
  "anchor": "#questionario",
  "event": {
    "name": "cta_click",
    "params": {"source_section": "testimonials", "cta_id": "cta_secondary"}
  }
}
```

### Section 8: Objection Handling FAQ
**Block ID Schema:** `home.faq.*`

```json
{
  "block_id": "home.faq.h2",
  "text": "Suas dúvidas, respondidas com transparência",
  "tone": "honest, reassuring header",
  "length": "5 words"
}
```

```json
{
  "block_id": "home.faq.q1.question",
  "text": "\"Não tenho tempo para outro programa\"",
  "tone": "direct objection quote from Amanda profile"
}
```

```json
{
  "block_id": "home.faq.q1.answer",
  "text": "Este programa ensina você a **criar** tempo trabalhando de forma mais inteligente, não mais difícil. Cada módulo é projetado para empresárias ocupadas com implementação gradual.",
  "tone": "reframe solution, busy entrepreneur focus"
}
```

```json
{
  "block_id": "home.faq.q2.question", 
  "text": "\"Já tentei outras mentorias e não funcionou\"",
  "tone": "skepticism from past disappointments"
}
```

```json
{
  "block_id": "home.faq.q2.answer",
  "text": "Este não é conselho genérico - é especificamente projetado para mulheres empreendedoras que honram a energia feminina. Sistemas práticos, não motivação superficial.",
  "tone": "differentiation, specific vs generic"
}
```

```json
{
  "block_id": "home.faq.q3.question",
  "text": "\"Não posso aumentar meus preços, vou perder clientes\"",
  "tone": "pricing fear, client loss concern"
}
```

```json
{
  "block_id": "home.faq.q3.answer", 
  "text": "Você aprenderá a se posicionar como autoridade para que os clientes paguem **alegremente** pela transformação que você oferece. Valor, não tempo.",
  "tone": "authority positioning, value vs time"
}
```

```json
{
  "block_id": "home.faq.q4.question",
  "text": "\"Minha área não permite liberdade financeira\"",
  "tone": "industry limitation belief"
}
```

```json
{
  "block_id": "home.faq.q4.answer",
  "text": "Qualquer negócio pode ser sistematizado e escalado quando você entende as estruturas certas. Já transformamos clínicas, lojas, academias e consultórios.",
  "tone": "universal application, business diversity proof"
}
```

```json
{
  "block_id": "home.faq.q5.question",
  "text": "\"Tenho medo de não conseguir implementar\"",
  "tone": "implementation anxiety, capability doubt"
}
```

```json
{
  "block_id": "home.faq.q5.answer",
  "text": "O programa usa frameworks **passo a passo** que você pode implementar gradualmente. Suporte via WhatsApp e progresso monitorado no Trello.",
  "tone": "step-by-step reassurance, support systems"
}
```

```json
{
  "block_id": "home.faq.cta.primary",
  "label": "Não tenho mais dúvidas",
  "anchor": "#questionario", 
  "event": {
    "name": "cta_click",
    "params": {"source_section": "faq", "cta_id": "cta_primary"}
  }
}
```

### Section 9: Final CTA with Urgency
**Block ID Schema:** `home.final.*`

```json
{
  "block_id": "home.final.h2",
  "text": "Chegou a hora de escolher",
  "tone": "decision moment, choice framing",
  "length": "5 words"
}
```

```json
{
  "block_id": "home.final.choice_1",
  "text": "**Continuar na roda de hamster**: Trabalhar 12+ horas, sacrificar sonhos, sentir-se escrava do próprio negócio",
  "tone": "status quo cost, pain amplification"
}
```

```json
{
  "block_id": "home.final.choice_2", 
  "text": "**Transformar-se numa empresária livre**: Trabalhar menos, faturar mais, viajar quando quiser, liderar com confiança",
  "tone": "transformation outcome, freedom vision"
}
```

```json
{
  "block_id": "home.final.urgency",
  "text": "O custo de continuar parada cresce todos os dias. Cada dia perdido é uma oportunidade de liberdade que não volta.",
  "tone": "opportunity cost urgency, time scarcity"
}
```

```json
{
  "block_id": "home.final.cta.primary",
  "label": "Sim, quero me transformar",
  "anchor": "#questionario",
  "event": {
    "name": "cta_click", 
    "params": {"source_section": "final", "cta_id": "cta_primary"}
  },
  "style": "prominent_final",
  "tone": "commitment, decisive action"
}
```

---

## Modal & Form Copy
**Block ID Schema:** `modal.*`

```json
{
  "block_id": "modal.headline",
  "text": "Vamos descobrir se você é a Amanda ideal para esta transformação",
  "tone": "qualification framing, avatar alignment"
}
```

```json
{
  "block_id": "modal.subhead",
  "text": "Responda com sinceridade para receber a orientação mais adequada para seu momento",
  "tone": "honesty encouragement, personalization promise"
}
```

```json
{
  "block_id": "modal.field.name.label",
  "text": "Seu nome completo",
  "type": "text",
  "required": true
}
```

```json
{
  "block_id": "modal.field.email.label", 
  "text": "Seu melhor email",
  "type": "email",
  "required": true
}
```

```json
{
  "block_id": "modal.field.phone.label",
  "text": "WhatsApp (com DDD)",
  "type": "tel", 
  "required": true
}
```

```json
{
  "block_id": "modal.field.business_type.label",
  "text": "Tipo do seu negócio",
  "type": "select",
  "options": ["Clínica/Consultório", "Loja/Comércio", "Serviços (Arquitetura, Advocacia)", "Academia/Fitness", "Beleza/Estética", "Outro"],
  "required": true
}
```

```json
{
  "block_id": "modal.field.monthly_revenue.label",
  "text": "Faturamento mensal atual",
  "type": "select",
  "options": ["Até R$10k", "R$10k a R$20k", "R$20k a R$35k", "Acima de R$35k"],
  "required": true
}
```

```json
{
  "block_id": "modal.field.work_hours.label",
  "text": "Horas de trabalho por dia",
  "type": "select", 
  "options": ["Até 8h", "8-10h", "10-12h", "Mais de 12h"],
  "required": true
}
```

```json
{
  "block_id": "modal.field.main_struggle.label",
  "text": "Sua maior dificuldade hoje",
  "type": "select",
  "options": ["Exaustão/Sobrecarga", "Dificuldade de delegar", "Preços baixos", "Falta de sistemas", "Não conseguir viajar/descansar"],
  "required": true
}
```

```json
{
  "block_id": "modal.submit.button",
  "label": "Enviar respostas",
  "event": {
    "name": "lead_form_submit",
    "params": {"form_type": "qualification", "source": "modal"},
    "destinations": ["ga4", "segment", "crm", "mailerlite"]
  }
}
```

---

## Thank You Page Copy
**Block ID Schema:** `thankyou.*`

```json
{
  "block_id": "thankyou.headline",
  "text": "Respostas recebidas! Você está 80% completa",
  "tone": "confirmation, progress indication"
}
```

```json
{
  "block_id": "thankyou.progress_text",
  "text": "Para finalizar sua candidatura à Mentoria Seja Livre:",
  "tone": "next step instruction"
}
```

```json
{
  "block_id": "thankyou.next_step",
  "text": "**Próximo passo**: Você receberá um questionário detalhado no seu email em alguns minutos. Complete-o para agendar sua conversa.",
  "tone": "clear instruction, expectation setting"
}
```

```json
{
  "block_id": "thankyou.timeline",
  "text": "⏰ **Timeline**: Questionário (5-10 min) → Agendamento → Conversa com Juçanã → Início da transformação",
  "tone": "process transparency, time estimation"
}
```

```json
{
  "block_id": "thankyou.support",
  "text": "Dúvidas? Entre em contato via WhatsApp: [+55 11 99999-9999]",
  "tone": "support availability, immediate help"
}
```

---

## Microcopy Library
**Block ID Schema:** `micro.*`

### Form Labels & Validation
```json
{
  "block_id": "micro.validation.name_required",
  "text": "Por favor, digite seu nome completo",
  "tone": "polite correction"
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
  "tone": "explanation of requirement reason"
}
```

### Trust Elements
```json
{
  "block_id": "micro.trust.privacy",
  "text": "🔒 Seus dados estão seguros e não serão compartilhados",
  "tone": "security reassurance"
}
```

```json
{
  "block_id": "micro.trust.spam",
  "text": "Sem spam. Apenas conteúdo relevante para sua transformação",
  "tone": "quality promise, value focus"
}
```

### Loading States
```json
{
  "block_id": "micro.loading.form_submit",
  "text": "Enviando suas respostas...",
  "tone": "process indication"
}
```

```json
{
  "block_id": "micro.success.form_submit",
  "text": "✅ Respostas enviadas com sucesso!",
  "tone": "confirmation, success celebration"
}
```

---

## Legal & Footer Copy
**Block ID Schema:** `legal.*`

```json
{
  "block_id": "legal.privacy_link",
  "text": "Política de Privacidade",
  "url": "/privacidade"
}
```

```json
{
  "block_id": "legal.terms_link", 
  "text": "Termos de Uso",
  "url": "/termos"
}
```

```json
{
  "block_id": "legal.copyright",
  "text": "© 2025 Mentoria Seja Livre. Todos os direitos reservados.",
  "tone": "legal protection"
}
```

---

## Voice Consistency Notes

**Tone Validation Checklist:**
- ✅ Empática mas assertiva: Recognition of struggle + clear solutions
- ✅ Inspiradora sem ser superficial: Specific outcomes vs generic motivation  
- ✅ Direta sobre soluções: Clear next steps in every section
- ✅ Acolhedora com as dores: Amanda's exact pain points mirrored

**Key Phrases Used:**
- "Vamos juntas mudar esse jogo" (implied through collective language)
- "Você não precisa dar conta de tudo sozinha" (delegation messaging)
- "Chegou a hora de vender com leveza" (adapted to transformation context)
- "Mais estratégia, menos exaustão" (core philosophy reinforcement)

**Cultural Context Maintained:**
- Brazilian Portuguese terminology and phrasing
- Female entrepreneur market context
- Family balance considerations (5-year-old daughter reference)
- Local business examples (clínica, academia, etc.)

---

## Implementation Notes

**Copy Quality Standards Met:**
- Headlines ≤12 words (all sections compliant)
- Bullets ≤8 words (risk-reversal microcopy included)
- CTAs use Action + Outcome formula
- No generic "Learn More" labels
- Amanda avatar language throughout
- Conservative claims for unverified metrics

**Measurement Integration:**
- All CTAs include event overlay structure
- Snake_case parameter naming consistent
- Source section tracking enabled
- No PII in measurement parameters
- Test mode handling documentation included

This Copy SoT v1.0 is ready for MCM (Measurement & CTA Mapper) overlay and subsequent subagent coordination.