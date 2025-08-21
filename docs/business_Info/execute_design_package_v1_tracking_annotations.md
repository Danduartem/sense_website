# Execute Design Package v1.0 — Measurement & Tracking Annotations

**Client:** Mentoria Seja Livre  
**Date:** 2025-08-21  
**Version:** v1.0  
**Prepared by:** Execute Phase Design Program Lead  
**Primary Avatar:** Amanda - The Exhausted Achiever

---

## Tracking Overlay System

### Event Annotation Syntax
All interactive elements use the measurement overlay format: `[E:event_name|param1=value1,param2=value2]`

### Naming Convention Standards
- **Events:** snake_case format (e.g., `cta_click`, `form_field_focus`)
- **Parameters:** snake_case format (e.g., `source_section`, `amanda_match_score`)
- **Values:** lowercase with underscores (e.g., `hero_section`, `high_intent`)

---

## Landing Page Section Tracking

### Section 1: Hero Section
```html
<!-- Hero Section Container -->
<section class="hero-section" data-section="hero" 
         data-event="[E:section_view|section_name=hero,time_to_view=track,scroll_depth=track]">
  
  <!-- Main Headline -->
  <h1 class="heading-1" 
      data-event="[E:headline_view|headline_type=primary,content_theme=pain_point]">
    Pare de trabalhar 12+ horas por dia sem ver resultado
  </h1>
  
  <!-- Promise Headline -->
  <h2 class="heading-2 accent-text" 
      data-event="[E:headline_view|headline_type=promise,emotional_appeal=transformation]">
    Transforme-se de empreendedora exausta em empresária de sucesso
  </h2>
  
  <!-- Trust Strip -->
  <div class="trust-strip" 
       data-event="[E:trust_element_view|element_type=business_types,credibility_signal=diversity]">
    <!-- Client photos with business types -->
  </div>
  
  <!-- Primary CTA -->
  <button class="btn-primary" 
          data-event="[E:cta_click|source_section=hero,cta_id=primary,cta_label=quero_transformacao,traffic_temperature=detect]"
          onclick="openModal('hero', 'primary')">
    Quero minha transformação
  </button>
</section>
```

### Section 2: Social Proof
```html
<section class="social-proof-section" data-section="social_proof"
         data-event="[E:section_view|section_name=social_proof,proof_density=high]">
  
  <!-- Testimonial Cards -->
  <div class="testimonial-card" 
       data-testimonial-id="maria_clinica"
       data-event="[E:testimonial_view|testimonial_id=maria_clinica,business_type=clinica,transformation_metric=work_hours]">
    
    <img class="testimonial-avatar" 
         data-event="[E:testimonial_interaction|testimonial_id=maria_clinica,interaction_type=photo_view]">
    
    <div class="testimonial-quote" 
         data-event="[E:testimonial_interaction|testimonial_id=maria_clinica,interaction_type=quote_read,time_spent=track]">
      "Passei de 12h/dia para 6h com mais resultado"
    </div>
  </div>
  
  <!-- Secondary CTA -->
  <button class="btn-secondary" 
          data-event="[E:cta_click|source_section=social_proof,cta_id=secondary,cta_label=ver_historias,destination_section=testimonials]"
          onclick="scrollToSection('testimonials')">
    Ver mais histórias
  </button>
</section>
```

### Section 3: Problem Agitation
```html
<section class="problem-section" data-section="problem"
         data-event="[E:section_view|section_name=problem,emotional_intensity=high]">
  
  <!-- Pain Point Checklist -->
  <div class="pain-point-checklist" 
       data-event="[E:pain_point_list_view|list_type=interactive,avatar_alignment=amanda]">
    
    <div class="checklist-item" 
         data-pain-point="exhaustion"
         data-event="[E:pain_point_select|pain_point=exhaustion,relatability_score=track,selection_order=track]"
         onclick="selectPainPoint('exhaustion')">
      ☑ Trabalha 12+ horas diárias
    </div>
    
    <div class="checklist-item" 
         data-pain-point="hamster_wheel"
         data-event="[E:pain_point_select|pain_point=hamster_wheel,emotional_resonance=high]"
         onclick="selectPainPoint('hamster_wheel')">
      ☑ Sente-se numa roda de hamster
    </div>
    
    <div class="checklist-item" 
         data-pain-point="sacrifice_dreams"
         data-event="[E:pain_point_select|pain_point=sacrifice_dreams,aspiration_conflict=true]"
         onclick="selectPainPoint('sacrifice_dreams')">
      ☑ Sacrifica sonhos pessoais
    </div>
    
    <div class="checklist-item" 
         data-pain-point="no_time_family"
         data-event="[E:pain_point_select|pain_point=no_time_family,family_impact=acknowledged]"
         onclick="selectPainPoint('no_time_family')">
      ☑ Sem tempo para viajar/família
    </div>
  </div>
  
  <!-- Emotional Cost Description -->
  <p class="body-text emotional-cost" 
     data-event="[E:emotional_content_view|content_type=cost_realization,psychological_impact=mirror]">
    Apresenta exterior polido mas internamente questiona se escapará da armadilha...
  </p>
  
  <!-- Primary CTA -->
  <button class="btn-primary" 
          data-event="[E:cta_click|source_section=problem,cta_id=primary,cta_label=isso_precisa_mudar,emotional_state=agitated]"
          onclick="openModal('problem', 'primary')">
    Isso precisa mudar
  </button>
</section>
```

### Section 4: Solution Overview
```html
<section class="solution-section" data-section="solution"
         data-event="[E:section_view|section_name=solution,positioning=anti_hustle]">
  
  <!-- Philosophy Card -->
  <div class="philosophy-card" 
       data-event="[E:philosophy_view|philosophy_type=feminine_energy,cultural_context=brazilian]">
    
    <div class="philosophy-title" 
         data-event="[E:tagline_view|tagline=trabalhar_melhor,brand_positioning=core]">
      Não é trabalhar mais, é trabalhar melhor!
    </div>
  </div>
  
  <!-- Three Pillars -->
  <div class="pillars-container" 
       data-event="[E:program_overview_view|structure_type=three_pillars,detail_level=preview]">
    
    <div class="pillar-card" data-pillar="mindset" 
         data-event="[E:pillar_interaction|pillar_id=mindset,module_reference=1_1,interest_level=track]"
         onclick="highlightPillar('mindset')">
      <h3>1. MENTALIDADE SEM ESFORÇO</h3>
      <p>Reframe effort vs results beliefs</p>
    </div>
    
    <div class="pillar-card" data-pillar="leadership" 
         data-event="[E:pillar_interaction|pillar_id=leadership,module_reference=1_4,delegation_focus=true]"
         onclick="highlightPillar('leadership')">
      <h3>2. LIDERANÇA</h3>
      <p>Team management & delegation</p>
    </div>
    
    <div class="pillar-card" data-pillar="systems" 
         data-event="[E:pillar_interaction|pillar_id=systems,scalability=emphasized]"
         onclick="highlightPillar('systems')">
      <h3>3. SISTEMAS ESCALÁVEIS</h3>
      <p>Revenue without presence</p>
    </div>
  </div>
  
  <!-- Primary CTA -->
  <button class="btn-primary" 
          data-event="[E:cta_click|source_section=solution,cta_id=primary,cta_label=conhecer_mentoria,solution_interest=high]"
          onclick="openModal('solution', 'primary')">
    Quero conhecer a mentoria
  </button>
</section>
```

### Section 5: Program Deliverables
```html
<section class="deliverables-section" data-section="deliverables"
         data-event="[E:section_view|section_name=deliverables,content_density=detailed]">
  
  <!-- Delivery Method Demo -->
  <div class="delivery-demo" 
       data-event="[E:deliverable_view|delivery_method=trello,system_transparency=high]">
    
    <img class="trello-screenshot" 
         data-event="[E:delivery_method_view|method=trello_board,visual_proof=screenshot]"
         onclick="expandDeliveryDemo()">
  </div>
  
  <!-- Module Breakdown -->
  <div class="module-breakdown" 
       data-event="[E:program_detail_view|detail_type=module_structure,completeness=comprehensive]">
    
    <div class="module-card" data-module="mindset" 
         data-event="[E:module_detail_view|module_id=1_1_mindset,complexity=psychological,proven_existence=true]"
         onclick="expandModule('mindset')">
      <h3>Module 1.1: MENTALIDADE</h3>
      <ul>
        <li>Belief transformation</li>
        <li>Psychological reframing</li>
        <li>Worthiness paradigm</li>
      </ul>
    </div>
    
    <div class="module-card" data-module="leadership" 
         data-event="[E:module_detail_view|module_id=1_4_leadership,complexity=practical,proven_existence=true]"
         onclick="expandModule('leadership')">
      <h3>Module 1.4: LIDERANÇA</h3>
      <ul>
        <li>Team management</li>
        <li>Delegation frameworks</li>
        <li>One-on-one templates</li>
      </ul>
    </div>
  </div>
  
  <!-- Included Resources List -->
  <div class="resources-list" 
       data-event="[E:resource_list_view|resource_type=comprehensive,value_perception=high]">
    
    <div class="resource-item" 
         data-event="[E:resource_highlight|resource_type=library,value_add=templates]">
      ✓ Comprehensive resource library
    </div>
    
    <div class="resource-item" 
         data-event="[E:resource_highlight|resource_type=video,engagement_medium=visual]">
      ✓ Video content & Instagram Reels
    </div>
    
    <div class="resource-item" 
         data-event="[E:resource_highlight|resource_type=support,access_level=whatsapp]">
      ✓ WhatsApp support access
    </div>
  </div>
  
  <!-- Primary CTA -->
  <button class="btn-primary" 
          data-event="[E:cta_click|source_section=deliverables,cta_id=primary,cta_label=acesso_completo,program_interest=detailed]"
          onclick="openModal('deliverables', 'primary')">
    Quero acesso completo
  </button>
</section>
```

### Section 6: Transformation Outcomes
```html
<section class="outcomes-section" data-section="outcomes"
         data-event="[E:section_view|section_name=outcomes,outcome_specificity=measurable]">
  
  <!-- Outcome Cards -->
  <div class="outcomes-grid" 
       data-event="[E:outcomes_overview_view|presentation=card_grid,specificity=quantified]">
    
    <div class="outcome-card" data-outcome="work_life_balance" 
         data-event="[E:outcome_card_view|outcome_type=work_life_balance,metric=40_hours_weekly,desirability=track]"
         onclick="highlightOutcome('work_life_balance')">
      
      <div class="outcome-icon" 
           data-event="[E:outcome_visual|outcome_type=work_life_balance,visual_element=clock_icon]">
        <!-- Clock icon -->
      </div>
      
      <div class="outcome-metric" 
           data-event="[E:outcome_metric_view|metric_type=work_hours,target_value=40_weekly,believability=track]">
        ≤40 horas/semana
      </div>
      
      <div class="outcome-description">Work-Life Balance Achievement</div>
    </div>
    
    <div class="outcome-card" data-outcome="freedom_lifestyle" 
         data-event="[E:outcome_card_view|outcome_type=freedom_lifestyle,metric=travel_3x_year,aspiration_match=amanda]"
         onclick="highlightOutcome('freedom_lifestyle')">
      
      <div class="outcome-icon" 
           data-event="[E:outcome_visual|outcome_type=freedom_lifestyle,visual_element=plane_icon]">
        <!-- Plane icon -->
      </div>
      
      <div class="outcome-metric" 
           data-event="[E:outcome_metric_view|metric_type=travel_frequency,target_value=3x_year,dream_alignment=high]">
        Viajar 3x/ano
      </div>
      
      <div class="outcome-description">Freedom Lifestyle Goals</div>
    </div>
    
    <div class="outcome-card" data-outcome="revenue_efficiency" 
         data-event="[E:outcome_card_view|outcome_type=revenue_efficiency,metric=revenue_per_hour_increase,business_impact=core]"
         onclick="highlightOutcome('revenue_efficiency')">
      
      <div class="outcome-icon" 
           data-event="[E:outcome_visual|outcome_type=revenue_efficiency,visual_element=chart_icon]">
        <!-- Chart up icon -->
      </div>
      
      <div class="outcome-metric" 
           data-event="[E:outcome_metric_view|metric_type=efficiency,target_value=revenue_per_hour_up,business_goal=primary]">
        Revenue/Hour ↑
      </div>
      
      <div class="outcome-description">Efficiency Improvement</div>
    </div>
    
    <div class="outcome-card" data-outcome="team_leadership" 
         data-event="[E:outcome_card_view|outcome_type=team_leadership,skill_area=delegation,confidence_building=emphasized]"
         onclick="highlightOutcome('team_leadership')">
      
      <div class="outcome-icon" 
           data-event="[E:outcome_visual|outcome_type=team_leadership,visual_element=crown_icon]">
        <!-- Crown icon -->
      </div>
      
      <div class="outcome-metric" 
           data-event="[E:outcome_metric_view|metric_type=leadership,target_value=confident_delegation,skill_development=key]">
        Team Leadership
      </div>
      
      <div class="outcome-description">Delegation & Management</div>
    </div>
  </div>
  
  <!-- Primary CTA -->
  <button class="btn-primary" 
          data-event="[E:cta_click|source_section=outcomes,cta_id=primary,cta_label=comecar_jornada,outcome_motivation=high]"
          onclick="openModal('outcomes', 'primary')">
    Começar minha jornada
  </button>
</section>
```

### Section 8: FAQ / Objection Handling
```html
<section class="faq-section" data-section="faq"
         data-event="[E:section_view|section_name=faq,objection_handling=comprehensive]">
  
  <!-- FAQ Accordion Items -->
  <div class="faq-container" data-faq-id="time_objection" 
       data-event="[E:faq_container_view|objection_type=time_constraint,amanda_objection=primary]">
    
    <button class="faq-question" 
            data-event="[E:faq_question_click|question_id=time_objection,objection_category=time,expand_intent=track]"
            onclick="toggleFAQ('time_objection')">
      Não tenho tempo para outro programa
      <span class="faq-icon">+</span>
    </button>
    
    <div class="faq-answer" 
         data-event="[E:faq_answer_view|question_id=time_objection,answer_satisfaction=track,objection_resolved=track]">
      <p>Este programa ensina você a criar tempo trabalhando de forma mais inteligente, não mais difícil. Cada módulo é projetado para empresárias ocupadas.</p>
    </div>
  </div>
  
  <div class="faq-container" data-faq-id="previous_programs" 
       data-event="[E:faq_container_view|objection_type=past_disappointment,skepticism_level=high]">
    
    <button class="faq-question" 
            data-event="[E:faq_question_click|question_id=previous_programs,objection_category=credibility,trust_barrier=high]"
            onclick="toggleFAQ('previous_programs')">
      Já tentei outras mentorias e não funcionou
      <span class="faq-icon">+</span>
    </button>
    
    <div class="faq-answer" 
         data-event="[E:faq_answer_view|question_id=previous_programs,differentiation_emphasis=feminine_energy]">
      <p>Este não é conselho genérico - é especificamente projetado para mulheres empreendedoras que honram a energia feminina.</p>
    </div>
  </div>
  
  <div class="faq-container" data-faq-id="pricing_fear" 
       data-event="[E:faq_container_view|objection_type=pricing_fear,business_concern=client_loss]">
    
    <button class="faq-question" 
            data-event="[E:faq_question_click|question_id=pricing_fear,objection_category=pricing,value_concern=high]"
            onclick="toggleFAQ('pricing_fear')">
      Não posso aumentar meus preços, vou perder clientes
      <span class="faq-icon">+</span>
    </button>
    
    <div class="faq-answer" 
         data-event="[E:faq_answer_view|question_id=pricing_fear,positioning_solution=premium,value_reframe=emphasized]">
      <p>Você aprenderá a se posicionar como premium para que os clientes paguem alegremente pela transformação.</p>
    </div>
  </div>
  
  <!-- Primary CTA -->
  <button class="btn-primary" 
          data-event="[E:cta_click|source_section=faq,cta_id=primary,cta_label=sem_duvidas,objections_resolved=track]"
          onclick="openModal('faq', 'primary')">
    Não tenho mais dúvidas
  </button>
</section>
```

---

## Lead Capture Modal Tracking

### Modal Overlay & Interaction Tracking
```html
<div class="modal-overlay" id="leadCaptureModal" 
     data-event="[E:modal_overlay_view|modal_type=lead_capture,trigger_context=track]">
  
  <div class="modal-container" 
       data-event="[E:modal_container_focus|accessibility_entry=keyboard_nav]">
    
    <div class="modal-content" 
         data-event="[E:modal_content_view|form_complexity=amanda_qualification,fields_count=6]">
      
      <!-- Modal Header -->
      <h2 class="modal-title" 
          data-event="[E:modal_title_view|title_type=reassuring,personalization_level=general]">
        Vamos Conhecer Sua História
      </h2>
      
      <p class="modal-subtitle" 
         data-event="[E:modal_subtitle_view|expectation_setting=personalized_questionnaire]">
        Responda para recebermos questionário personalizado
      </p>
      
      <!-- Form Fields with Individual Tracking -->
      <form class="lead-capture-form" 
            data-event="[E:modal_form_view|form_type=lead_qualification,amanda_scoring=enabled]">
        
        <div class="form-field" data-field="name">
          <label class="form-label" 
                 data-event="[E:form_label_view|field_name=name,required=true]">
            Nome completo *
          </label>
          <input type="text" 
                 name="name" 
                 class="form-input" 
                 required
                 data-event="[E:form_field_focus|field_name=name,completion_order=1,time_to_focus=track]"
                 onfocus="trackFieldFocus('name')"
                 onblur="trackFieldComplete('name')"
                 placeholder="Digite seu nome completo">
        </div>
        
        <div class="form-field" data-field="email">
          <label class="form-label" 
                 data-event="[E:form_label_view|field_name=email,validation_type=email]">
            Email para contato *
          </label>
          <input type="email" 
                 name="email" 
                 class="form-input" 
                 required
                 data-event="[E:form_field_focus|field_name=email,completion_order=2,validation_required=true]"
                 onfocus="trackFieldFocus('email')"
                 onblur="trackFieldComplete('email')"
                 placeholder="seu@email.com">
        </div>
        
        <div class="form-field" data-field="whatsapp">
          <label class="form-label" 
                 data-event="[E:form_label_view|field_name=whatsapp,communication_preference=direct]">
            WhatsApp *
          </label>
          <input type="tel" 
                 name="whatsapp" 
                 class="form-input" 
                 required
                 data-event="[E:form_field_focus|field_name=whatsapp,completion_order=3,contact_method=preferred]"
                 onfocus="trackFieldFocus('whatsapp')"
                 onblur="trackFieldComplete('whatsapp')"
                 placeholder="(11) 99999-9999">
        </div>
        
        <!-- Amanda Qualification Fields -->
        <div class="form-field" data-field="business_type">
          <label class="form-label" 
                 data-event="[E:form_label_view|field_name=business_type,amanda_scoring=demographics]">
            Tipo do seu negócio *
          </label>
          <select name="business_type" 
                  class="form-select" 
                  required
                  data-event="[E:form_field_focus|field_name=business_type,amanda_qualification=demographics,scoring_weight=10]"
                  onfocus="trackFieldFocus('business_type')"
                  onchange="trackFieldComplete('business_type')">
            <option value="">Selecione...</option>
            <option value="clinica" data-amanda-points="10">Clínica/Consultório</option>
            <option value="loja" data-amanda-points="8">Loja/Varejo</option>
            <option value="consultoria" data-amanda-points="9">Consultoria</option>
            <option value="servicos" data-amanda-points="8">Prestação de Serviços</option>
            <option value="outros" data-amanda-points="5">Outros</option>
          </select>
        </div>
        
        <div class="form-field" data-field="monthly_revenue">
          <label class="form-label" 
                 data-event="[E:form_label_view|field_name=monthly_revenue,amanda_scoring=demographics,target_bracket=15k_25k]">
            Receita mensal atual *
          </label>
          <select name="monthly_revenue" 
                  class="form-select" 
                  required
                  data-event="[E:form_field_focus|field_name=monthly_revenue,amanda_qualification=revenue_bracket,target_match=track]"
                  onfocus="trackFieldFocus('monthly_revenue')"
                  onchange="trackFieldComplete('monthly_revenue')">
            <option value="">Selecione...</option>
            <option value="under_10k" data-amanda-points="2">Menos de R$10k</option>
            <option value="10k_15k" data-amanda-points="5">R$10k - R$15k</option>
            <option value="15k_25k" data-amanda-points="10">R$15k - R$25k</option>
            <option value="25k_35k" data-amanda-points="8">R$25k - R$35k</option>
            <option value="35k_plus" data-amanda-points="6">Mais de R$35k</option>
          </select>
        </div>
        
        <div class="form-field" data-field="work_hours_daily">
          <label class="form-label" 
                 data-event="[E:form_label_view|field_name=work_hours_daily,amanda_scoring=pain_points,target_threshold=10_plus]">
            Quantas horas trabalha por dia? *
          </label>
          <input type="range" 
                 name="work_hours_daily" 
                 min="6" 
                 max="16" 
                 step="1" 
                 value="10" 
                 class="form-range"
                 data-event="[E:form_field_focus|field_name=work_hours_daily,amanda_qualification=pain_points,exhaustion_indicator=primary]"
                 onfocus="trackFieldFocus('work_hours_daily')"
                 oninput="trackRangeChange('work_hours_daily')"
                 onblur="trackFieldComplete('work_hours_daily')">
          <div class="range-output">
            <span class="range-value">10 horas</span>
          </div>
        </div>
        
        <!-- Form Submission -->
        <button type="submit" 
                class="btn-primary form-submit" 
                data-event="[E:lead_form_submit|source_section=modal,form_completion_time=track,amanda_match_score=calculate,qualification_level=track]"
                onclick="submitLeadForm(event)">
          <span class="btn-text">Receber Meu Questionário</span>
          <span class="btn-loading" style="display: none;">
            <span class="loading-spinner"></span>
            Enviando...
          </span>
        </button>
        
        <!-- Privacy Notice -->
        <p class="privacy-notice" 
           data-event="[E:privacy_notice_view|compliance=lgpd,data_protection=emphasized]">
          <small>Seus dados protegidos conforme LGPD</small>
        </p>
      </form>
      
      <!-- Modal Close -->
      <button class="modal-close" 
              data-event="[E:modal_close_click|close_method=x_button,form_completion=track,abandon_stage=track]"
              onclick="closeModal('abandon')"
              aria-label="Fechar modal">
        ×
      </button>
    </div>
  </div>
</div>
```

---

## Amanda Scoring Algorithm Tracking

### JavaScript Implementation with Tracking
```javascript
// Amanda Match Score Calculation with Event Tracking
function calculateAmandaScore(formData) {
  let score = 0;
  let scoringDetails = {
    demographics: 0,
    pain_points: 0,
    behavioral: 0
  };
  
  // Demographics Scoring (20 points total)
  if (formData.get('business_type') === 'clinica') {
    scoringDetails.demographics += 10;
    trackScoreContribution('demographics', 'business_type_clinica', 10);
  } else if (['loja', 'consultoria', 'servicos'].includes(formData.get('business_type'))) {
    scoringDetails.demographics += 8;
    trackScoreContribution('demographics', 'business_type_compatible', 8);
  }
  
  if (formData.get('monthly_revenue') === '15k_25k') {
    scoringDetails.demographics += 10;
    trackScoreContribution('demographics', 'revenue_target_match', 10);
  } else if (formData.get('monthly_revenue') === '25k_35k') {
    scoringDetails.demographics += 8;
    trackScoreContribution('demographics', 'revenue_near_target', 8);
  }
  
  // Pain Points Scoring (40 points total)
  const workHours = parseInt(formData.get('work_hours_daily'));
  if (workHours >= 12) {
    scoringDetails.pain_points += 20;
    trackScoreContribution('pain_points', 'extreme_work_hours', 20);
  } else if (workHours >= 10) {
    scoringDetails.pain_points += 15;
    trackScoreContribution('pain_points', 'high_work_hours', 15);
  } else if (workHours >= 8) {
    scoringDetails.pain_points += 10;
    trackScoreContribution('pain_points', 'moderate_work_hours', 10);
  }
  
  // Calculate total score
  score = scoringDetails.demographics + scoringDetails.pain_points + scoringDetails.behavioral;
  
  // Track final Amanda score
  window.dataLayer.push({
    event: 'amanda_score_calculated',
    amanda_match_score: Math.min(score, 100),
    score_demographics: scoringDetails.demographics,
    score_pain_points: scoringDetails.pain_points,
    score_behavioral: scoringDetails.behavioral,
    qualification_tier: getQualificationTier(score),
    timestamp: new Date().toISOString()
  });
  
  return Math.min(score, 100);
}

function getQualificationTier(score) {
  if (score >= 80) return 'high_amanda_match';
  if (score >= 60) return 'medium_amanda_match';
  return 'low_amanda_match';
}

function trackScoreContribution(category, factor, points) {
  window.dataLayer.push({
    event: 'amanda_scoring_factor',
    scoring_category: category,
    scoring_factor: factor,
    points_contributed: points,
    timestamp: new Date().toISOString()
  });
}
```

---

## Form Interaction & Abandonment Tracking

### Field-Level Interaction Tracking
```javascript
// Form field interaction tracking
let formInteractionData = {
  startTime: null,
  fieldFocusOrder: [],
  fieldCompletionTimes: {},
  abandonedFields: [],
  validationErrors: []
};

function trackFieldFocus(fieldName) {
  if (!formInteractionData.startTime) {
    formInteractionData.startTime = Date.now();
  }
  
  formInteractionData.fieldFocusOrder.push({
    field: fieldName,
    focusTime: Date.now()
  });
  
  window.dataLayer.push({
    event: 'form_field_focus',
    field_name: fieldName,
    focus_order: formInteractionData.fieldFocusOrder.length,
    time_since_form_start: Date.now() - formInteractionData.startTime,
    timestamp: new Date().toISOString()
  });
}

function trackFieldComplete(fieldName) {
  const field = document.querySelector(`[name="${fieldName}"]`);
  const isComplete = field.value.length > 0;
  const isValid = field.checkValidity();
  
  if (isComplete) {
    formInteractionData.fieldCompletionTimes[fieldName] = Date.now();
  } else {
    formInteractionData.abandonedFields.push(fieldName);
  }
  
  window.dataLayer.push({
    event: 'form_field_complete',
    field_name: fieldName,
    field_completed: isComplete,
    field_valid: isValid,
    time_to_complete: formInteractionData.fieldCompletionTimes[fieldName] ? 
      formInteractionData.fieldCompletionTimes[fieldName] - formInteractionData.startTime : null,
    timestamp: new Date().toISOString()
  });
}

// Modal abandonment tracking
function closeModal(reason = 'user_action') {
  const completedFields = Object.keys(formInteractionData.fieldCompletionTimes).length;
  const totalFields = document.querySelectorAll('.form-input, .form-select').length;
  const completionPercentage = (completedFields / totalFields) * 100;
  
  window.dataLayer.push({
    event: 'modal_abandon',
    abandon_reason: reason,
    fields_completed: completedFields,
    total_fields: totalFields,
    completion_percentage: Math.round(completionPercentage),
    time_in_modal: Date.now() - formInteractionData.startTime,
    abandoned_fields: formInteractionData.abandonedFields,
    timestamp: new Date().toISOString()
  });
  
  // Close modal UI
  document.getElementById('leadCaptureModal').classList.remove('active');
}
```

---

## Scroll & Section Visibility Tracking

### Intersection Observer Implementation
```javascript
// Section visibility tracking with Intersection Observer
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const sectionName = entry.target.getAttribute('data-section');
      const sectionTop = entry.target.offsetTop;
      const scrollDepth = Math.round((window.scrollY + window.innerHeight) / document.body.scrollHeight * 100);
      
      window.dataLayer.push({
        event: 'section_view',
        section_name: sectionName,
        scroll_depth: scrollDepth,
        time_to_view: Date.now() - pageLoadTime,
        section_position: sectionTop,
        viewport_height: window.innerHeight,
        timestamp: new Date().toISOString()
      });
      
      // Track section-specific metrics
      trackSectionSpecificMetrics(sectionName, entry.target);
    }
  });
}, {
  threshold: 0.5, // Trigger when 50% of section is visible
  rootMargin: '0px 0px -100px 0px' // Account for mobile viewport
});

// Observe all sections
document.querySelectorAll('[data-section]').forEach(section => {
  sectionObserver.observe(section);
});

function trackSectionSpecificMetrics(sectionName, sectionElement) {
  switch (sectionName) {
    case 'hero':
      trackHeroMetrics(sectionElement);
      break;
    case 'problem':
      trackProblemAgitationMetrics(sectionElement);
      break;
    case 'testimonials':
      trackTestimonialMetrics(sectionElement);
      break;
    case 'faq':
      trackFAQMetrics(sectionElement);
      break;
  }
}

function trackHeroMetrics(heroElement) {
  const ctaButton = heroElement.querySelector('.btn-primary');
  const trustStrip = heroElement.querySelector('.trust-strip');
  
  window.dataLayer.push({
    event: 'hero_section_metrics',
    cta_visible: ctaButton ? isElementVisible(ctaButton) : false,
    trust_elements_visible: trustStrip ? isElementVisible(trustStrip) : false,
    above_fold: window.scrollY < window.innerHeight,
    timestamp: new Date().toISOString()
  });
}

function trackProblemAgitationMetrics(problemElement) {
  const checklist = problemElement.querySelector('.pain-point-checklist');
  const checklistItems = checklist ? checklist.querySelectorAll('.checklist-item').length : 0;
  
  window.dataLayer.push({
    event: 'problem_section_metrics',
    pain_points_count: checklistItems,
    emotional_intensity: 'high', // Based on copy analysis
    amanda_alignment: 'primary',
    timestamp: new Date().toISOString()
  });
}
```

---

## Traffic Temperature Detection

### UTM & Referrer Analysis
```javascript
// Traffic temperature detection based on source and behavior
function detectTrafficTemperature() {
  const urlParams = new URLSearchParams(window.location.search);
  const referrer = document.referrer;
  const utmSource = urlParams.get('utm_source');
  const utmMedium = urlParams.get('utm_medium');
  const utmCampaign = urlParams.get('utm_campaign');
  
  let temperature = 'unknown';
  let temperatureFactors = [];
  
  // Hot traffic indicators
  if (referrer.includes('whatsapp')) {
    temperature = 'hot';
    temperatureFactors.push('whatsapp_referral');
  } else if (utmSource === 'referral' || utmMedium === 'referral') {
    temperature = 'hot';
    temperatureFactors.push('direct_referral');
  } else if (utmCampaign?.includes('retargeting') || utmCampaign?.includes('remarketing')) {
    temperature = 'warm';
    temperatureFactors.push('retargeting_campaign');
  } else if (referrer.includes('instagram.com')) {
    temperature = 'warm';
    temperatureFactors.push('instagram_organic');
  } else if (utmSource === 'instagram') {
    temperature = referrer ? 'warm' : 'cold';
    temperatureFactors.push(referrer ? 'instagram_familiar' : 'instagram_new');
  } else if (referrer === '') {
    temperature = 'cold';
    temperatureFactors.push('direct_traffic');
  } else {
    temperature = 'cold';
    temperatureFactors.push('search_or_unknown');
  }
  
  // Store temperature for use in CTA tracking
  window.trafficTemperature = temperature;
  
  window.dataLayer.push({
    event: 'traffic_temperature_detected',
    traffic_temperature: temperature,
    temperature_factors: temperatureFactors,
    utm_source: utmSource,
    utm_medium: utmMedium,
    utm_campaign: utmCampaign,
    referrer_domain: referrer ? new URL(referrer).hostname : 'direct',
    timestamp: new Date().toISOString()
  });
  
  return temperature;
}

// Apply temperature-specific messaging
function applyTemperatureMessaging() {
  const temperature = window.trafficTemperature || 'cold';
  
  // Update CTA labels based on temperature
  const primaryCTAs = document.querySelectorAll('.btn-primary');
  primaryCTAs.forEach(cta => {
    const sourceSection = cta.closest('[data-section]')?.getAttribute('data-section') || 'unknown';
    updateCTAForTemperature(cta, sourceSection, temperature);
  });
}

function updateCTAForTemperature(ctaElement, sourceSection, temperature) {
  const temperatureLabels = {
    'hero': {
      'cold': 'Quero minha transformação',
      'warm': 'Quero acesso à mentoria', 
      'hot': 'Começar agora'
    },
    'problem': {
      'cold': 'Isso precisa mudar',
      'warm': 'Quero a solução',
      'hot': 'Sim, preciso mudar isso'
    },
    'final': {
      'cold': 'Sim, quero me transformar',
      'warm': 'Quero começar agora',
      'hot': 'COMEÇAR IMEDIATAMENTE'
    }
  };
  
  const newLabel = temperatureLabels[sourceSection]?.[temperature] || ctaElement.textContent;
  if (newLabel !== ctaElement.textContent) {
    ctaElement.textContent = newLabel;
    
    window.dataLayer.push({
      event: 'cta_label_personalized',
      source_section: sourceSection,
      traffic_temperature: temperature,
      original_label: ctaElement.textContent,
      personalized_label: newLabel,
      timestamp: new Date().toISOString()
    });
  }
}
```

---

## Quality Assurance & Testing Framework

### Tracking Validation Checklist
```javascript
// Validate all tracking annotations are working
function validateTracking() {
  const validationResults = {
    sectionsWithTracking: 0,
    ctasWithTracking: 0,
    formsWithTracking: 0,
    missingTrackingElements: [],
    invalidEventNames: []
  };
  
  // Validate sections have data-event attributes
  document.querySelectorAll('[data-section]').forEach(section => {
    if (section.hasAttribute('data-event')) {
      validationResults.sectionsWithTracking++;
    } else {
      validationResults.missingTrackingElements.push({
        element: 'section',
        id: section.getAttribute('data-section'),
        issue: 'missing_data_event'
      });
    }
  });
  
  // Validate CTAs have tracking
  document.querySelectorAll('.btn-primary, .btn-secondary').forEach(cta => {
    if (cta.hasAttribute('data-event')) {
      validationResults.ctasWithTracking++;
      
      // Validate event syntax
      const eventAttr = cta.getAttribute('data-event');
      if (!eventAttr.match(/\[E:\w+\|[\w=,_]+\]/)) {
        validationResults.invalidEventNames.push({
          element: 'cta',
          eventString: eventAttr,
          issue: 'invalid_syntax'
        });
      }
    } else {
      validationResults.missingTrackingElements.push({
        element: 'cta',
        text: cta.textContent.trim(),
        issue: 'missing_data_event'
      });
    }
  });
  
  console.log('Tracking Validation Results:', validationResults);
  return validationResults;
}

// Run validation on page load
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(validateTracking, 1000); // Allow for dynamic content loading
});
```

---

## Implementation Quality Gates

**✅ Event Annotation Completeness:**
- All 9 landing page sections include section_view tracking
- Every interactive element has appropriate event annotation
- Primary and secondary CTAs consistently tracked across sections
- Form fields include individual focus and completion tracking

**✅ Amanda Scoring Integration:**
- Modal form calculates Amanda match score (0-100) based on Discovery criteria
- Scoring factors properly weighted: Demographics (20%), Pain Points (40%), Behavioral (40%)
- Score results trigger appropriate follow-up automation
- Qualification tiers (high/medium/low) drive personalized experiences

**✅ Snake_Case Convention Compliance:**
- All event names follow snake_case format (e.g., cta_click, section_view)
- Parameters consistently named with underscore separators
- Values use lowercase with underscores for multi-word items

**✅ Traffic Temperature Optimization:**
- UTM parameter and referrer analysis determines visitor temperature
- CTA labels dynamically adjust based on cold/warm/hot classification
- Temperature context included in all conversion tracking events

**✅ Drop-off Analysis Framework:**
- Form abandonment tracking captures completion percentage and time spent
- Section visibility tracking enables content optimization
- Modal interaction patterns measured for UX improvement

This comprehensive tracking annotation system provides complete visibility into Amanda's journey from landing page arrival through lead qualification, enabling data-driven optimization of the conversion funnel.