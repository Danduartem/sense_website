# WhatsApp Templates — Mentoria Seja Livre

**Platform:** WhatsApp Business API  
**Target Avatar:** Amanda - The Exhausted Achiever  
**Compliance:** Europe/Lisbon timezone, GDPR compliant  
**Template Categories:** Utility (CUSTOMER) + Marketing (NO-PAY)  

---

## CUSTOMER Sequence Templates (Utility Category)

### Template 1: Immediate Access Delivery

**Template ID:** `customer_d0_access_delivery`  
**Category:** Utility  
**Language:** Portuguese (Portugal)  
**Trigger:** program_enrollment_complete + WhatsApp opt-in  

#### Template Content
```
Olá {{1}}! 🎉

Bem-vinda à **Mentoria Seja Livre**!

Seu acesso está pronto:

🎯 **Board da Mentoria:** {{2}}

📱 **Primeiros passos:**
1. Clique no link acima
2. Explore o Módulo 1.1
3. Faça o exercício de mapeamento

Precisa de ajuda? Responde aqui mesmo!

Sua transformação começa AGORA! ✨

_Juçanã | Mentoria Seja Livre_
```

#### Variable Mapping
```json
{
  "{{1}}": "first_name",
  "{{2}}": "trello_board_url_with_utm"
}
```

#### Button Configuration
```json
{
  "type": "URL",
  "text": "Acessar Mentoria",
  "url": "{{2}}"
}
```

#### UTM Parameters
```
?utm_source=whatsapp&utm_medium=automation&utm_campaign=customer&utm_content=d0_access
```

---

### Template 2: Day 3 Progress Check-in

**Template ID:** `customer_d3_progress_checkin`  
**Category:** Utility  
**Language:** Portuguese (Portugal)  
**Trigger:** 3 days after program_enrollment_complete  

#### Template Content
```
Oi {{1}}! 😊

Como está sendo sua experiência com o **Módulo 1.1**?

Já conseguiu:
✅ Ver o vídeo de boas-vindas?
✅ Fazer o mapeamento de crenças?
✅ Aplicar alguma técnica no dia a dia?

Me conta como está! 🗣️

Se tiver dúvida ou resistência, é normal. Estou aqui para ajudar!

Responde com:
**SIM** = Está indo bem
**AJUDA** = Preciso de suporte
**CONVERSAR** = Quero bater um papo

_Sua mentora, Juçanã_ 💕
```

#### Variable Mapping
```json
{
  "{{1}}": "first_name"
}
```

#### Quick Reply Buttons
```json
{
  "quick_replies": [
    {"id": "progress_sim", "title": "SIM"},
    {"id": "progress_ajuda", "title": "AJUDA"},
    {"id": "progress_conversar", "title": "CONVERSAR"}
  ]
}
```

---

### Template 3: Week 1 Milestone Celebration

**Template ID:** `customer_d7_milestone_celebration`  
**Category:** Utility  
**Language:** Portuguese (Portugal)  
**Trigger:** 7 days after program_enrollment_complete  

#### Template Content
```
{{1}}, PARABÉNS! 🎉

Você completou sua **primeira semana** na Mentoria Seja Livre!

Isso mostra seu compromisso com a transformação! 💪

🚀 **Próximo passo:** Módulo 1.4 (Liderança)

Aprenda a:
- Delegar sem perder controle
- Liderar equipes de alta performance
- Criar boundaries saudáveis

{{2}}

Como está se sentindo sobre a jornada até agora?

_Orgulhosa de você! Juçanã_ ✨
```

#### Variable Mapping
```json
{
  "{{1}}": "first_name",
  "{{2}}": "module_1_4_direct_url_with_utm"
}
```

#### Button Configuration
```json
{
  "type": "URL",
  "text": "Módulo Liderança",
  "url": "{{2}}"
}
```

---

## NO-PAY Sequence Templates (Marketing Category)

### Template 4: Day 5 Case Study Engagement

**Template ID:** `nopay_d5_case_study_engagement`  
**Category:** Marketing  
**Language:** Portuguese (Portugal)  
**Trigger:** Day 5 after lead_form_submit + WhatsApp opt-in  

#### Template Content
```
Oi {{1}}! 💕

Lembra da **Rita** que te contei no email?

Advogada que saiu de 14h/dia para 6h/dia em 8 semanas? 

👥 **Outras empreendedoras** como você também conseguiram:

📈 Marina (arquiteta): +40% faturamento, -50% horas
🏥 Ana (clínica): Equipe autônoma em 6 semanas  
👗 Carla (loja): 3 viagens/ano + R$35k/mês

**A diferença?** Mentalidade + método certo.

Que tal conversarmos sobre seu caso?

{{2}}

_Juçanã | Mentoria Seja Livre_
```

#### Variable Mapping
```json
{
  "{{1}}": "first_name",
  "{{2}}": "questionnaire_url_with_utm"
}
```

#### Button Configuration
```json
{
  "type": "URL",
  "text": "Quero meu plano",
  "url": "{{2}}"
}
```

#### UTM Parameters
```
?utm_source=whatsapp&utm_medium=automation&utm_campaign=nopay&utm_content=d5_case_study
```

---

### Template 5: Day 7 Final Opportunity

**Template ID:** `nopay_d7_final_opportunity`  
**Category:** Marketing  
**Language:** Portuguese (Portugal)  
**Trigger:** Day 7 after lead_form_submit + WhatsApp opt-in  

#### Template Content
```
{{1}}, última mensagem... 🕊️

Nos últimos 7 dias mostrei como **transformar exaustão em liberdade**.

Você viu:
✅ Por que trabalhar mais ≠ ganhar mais
✅ História real da Rita (14h → 6h)
✅ Como sair da "roda de hamster"

**Agora é sua escolha:**

Continuar como está OU transformar sua realidade.

Se escolher transformação:
{{2}}

Se não, desejo muito sucesso! 

Mas lembre: você MERECE trabalhar menos e ganhar mais.

_Com carinho, Juçanã_ 💕

*Para não receber mais mensagens, responda PARAR*
```

#### Variable Mapping
```json
{
  "{{1}}": "first_name", 
  "{{2}}": "questionnaire_url_with_utm"
}
```

#### Button Configuration
```json
{
  "type": "URL",
  "text": "Sim, quero transformar",
  "url": "{{2}}"
}
```

#### UTM Parameters
```
?utm_source=whatsapp&utm_medium=automation&utm_campaign=nopay&utm_content=d7_final_opportunity
```

---

## Technical Implementation

### Template Approval Requirements

#### Utility Templates (CUSTOMER)
- **Approval Risk:** LOW
- **Justification:** Customer service and onboarding support
- **Required Documentation:**
  - Business verification certificate
  - Customer relationship proof
  - Template usage intent statement

#### Marketing Templates (NO-PAY)
- **Approval Risk:** MEDIUM  
- **Justification:** Promotional content with opt-in consent
- **Required Documentation:**
  - Explicit opt-in consent mechanism
  - Clear unsubscribe process ("PARAR")
  - Content approval from compliance team

### Variable Configuration

#### Core Variables (All Templates)
```json
{
  "first_name": {
    "source": "crm_contact_field",
    "fallback": "empreendedora",
    "validation": "string_max_15_chars"
  },
  "trello_board_url_with_utm": {
    "source": "environment_variable",
    "utm_append": true,
    "validation": "valid_url"
  },
  "questionnaire_url_with_utm": {
    "source": "environment_variable", 
    "utm_append": true,
    "validation": "valid_url"
  },
  "module_1_4_direct_url_with_utm": {
    "source": "computed_from_base_url",
    "path": "/module-1-4",
    "utm_append": true
  }
}
```

### Delivery Configuration

#### Timing & Quiet Hours
```json
{
  "timezone": "Europe/Lisbon",
  "quiet_hours": {
    "start": "21:00",
    "end": "09:00"
  },
  "weekend_delivery": {
    "saturday": false,
    "sunday": false
  },
  "delivery_window": "09:00-18:00",
  "retry_logic": {
    "max_attempts": 3,
    "retry_interval": "2_hours"
  }
}
```

#### Rate Limiting
```json
{
  "customer_templates": {
    "rate_limit": "no_limit",
    "category": "utility"
  },
  "nopay_templates": {
    "rate_limit": "1000_per_24h",
    "category": "marketing"
  }
}
```

### Compliance Framework

#### GDPR Requirements
- **Opt-in Consent:** Explicit checkbox on landing page form
- **Opt-out Mechanism:** "PARAR" keyword triggers immediate removal
- **Data Processing:** Documented legal basis (legitimate interest/consent)
- **Cross-Border:** Adequate safeguards for Portugal-Brazil transfers

#### Consent Tracking
```json
{
  "consent_record": {
    "contact_id": "lead_id_or_user_id",
    "consent_type": "whatsapp_marketing",
    "consent_given": "timestamp_iso_8601",
    "consent_method": "landing_page_checkbox",
    "ip_address": "consent_ip_for_audit",
    "consent_withdrawn": null
  }
}
```

### Integration Specifications

#### CRM Webhook Fields
```json
{
  "whatsapp_delivery": {
    "template_id": "template_identifier",
    "delivery_status": "sent|delivered|read|failed",
    "delivery_timestamp": "iso_8601_timestamp",
    "contact_id": "lead_id_or_user_id",
    "response_received": "boolean",
    "response_content": "user_reply_text"
  }
}
```

#### Analytics Events
```json
{
  "whatsapp_message_sent": {
    "template_id": "string",
    "contact_id": "string", 
    "campaign": "customer|nopay",
    "message_type": "utility|marketing",
    "delivery_status": "string"
  },
  "whatsapp_link_click": {
    "template_id": "string",
    "contact_id": "string",
    "url_clicked": "string",
    "utm_parameters": "object"
  }
}
```

### Success Metrics

#### CUSTOMER Templates
- **Delivery Rate:** >95%
- **Response Rate:** >60%
- **Link Click Rate:** >40%
- **Trello Access Rate:** >90% within 24h

#### NO-PAY Templates  
- **Delivery Rate:** >90%
- **Response Rate:** >20%
- **Questionnaire Click Rate:** >15%
- **Opt-out Rate:** <5%

### Testing & Validation

#### Pre-Launch Checklist
- [ ] All variables render correctly with test data
- [ ] UTM parameters append properly to all URLs
- [ ] Button links functional and tracked
- [ ] Quiet hours enforcement working
- [ ] Opt-out mechanism tested and verified
- [ ] Template approval documentation ready
- [ ] Integration webhooks tested with staging data
- [ ] Analytics events firing correctly

---

## Template Approval Submission Guide

### Documentation Required

#### For WhatsApp Business API Approval
1. **Business Verification Certificate**
2. **Template Intent Documentation**
3. **Sample Use Cases with Screenshots**
4. **Opt-in Consent Mechanism Proof**
5. **Unsubscribe Process Documentation**

#### Template Submission Sequence
1. **Submit Utility Templates First** (customer_d0, customer_d3, customer_d7)
2. **Wait for Approval** (typically 1-3 business days)
3. **Submit Marketing Templates** (nopay_d5, nopay_d7)
4. **Prepare Fallback Content** in case of rejection

---

*These WhatsApp templates were created by the Messaging Program Lead system with full compliance requirements for Portuguese/Brazilian markets and integration with the Mentoria Seja Livre customer journey.*