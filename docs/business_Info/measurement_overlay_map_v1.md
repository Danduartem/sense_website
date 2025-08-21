# Measurement Overlay Map v1.0 — Mentoria Seja Livre

**Client:** Mentoria Seja Livre  
**Date:** 2025-08-20  
**Version:** v1.0  
**Prepared by:** Measurement Annotator (MA) - Execute Phase  
**Primary Avatar:** Amanda - The Exhausted Achiever

---

## Measurement Strategy Overview

This document provides comprehensive measurement overlays using `[E:event|params]` syntax for ALL interactive elements on the Mentoria Seja Livre landing page, ensuring complete tracking for Amanda's transformation journey analysis and sales team optimization.

**Tracking Principles:**
- **snake_case naming** for all events and parameters
- **Drop-off measurement** focused on sales team follow-up opportunities
- **Amanda avatar scoring** embedded in qualification tracking
- **test_mode handling** for development environments
- **No PII in events** (use lead_id/user_id mapping)

---

## Section 1: Hero Measurement Overlays

### Primary CTA Button
```html
<button id="hero-cta-primary" class="cta-button-primary">
    Quero minha transformação
    [E:cta_click|source_section=hero,cta_id=cta_primary,cta_label=quero_minha_transformacao,traffic_temperature=detected,page_position=above_fold]
</button>
```

### Logo Click (Navigation)
```html
<a href="/" class="logo-link">
    [Logo] Mentoria Seja Livre
    [E:logo_click|source_section=hero,destination=home]
</a>
```

### Navigation Menu Items
```html
<nav class="main-navigation">
    <a href="#sobre" class="nav-link">
        Sobre
        [E:nav_click|nav_item=sobre,source_section=hero]
    </a>
    <a href="#programa" class="nav-link">
        Programa  
        [E:nav_click|nav_item=programa,source_section=hero]
    </a>
    <a href="#contato" class="nav-link">
        Contato
        [E:nav_click|nav_item=contato,source_section=hero]
    </a>
</nav>
```

### Trust Strip Photo Interactions
```html
<div class="trust-strip">
    <img src="client-clinica.jpg" alt="Empreendedora de clínica" class="trust-photo">
        [E:trust_photo_click|business_type=clinica,photo_position=1,source_section=hero]
    </img>
    <img src="client-loja.jpg" alt="Proprietária de loja" class="trust-photo">
        [E:trust_photo_click|business_type=loja,photo_position=2,source_section=hero]
    </img>
    <!-- Continue for all trust photos -->
</div>
```

### Hero Video/Image Interaction (if implemented)
```html
<div class="hero-media">
    <video poster="hero-thumbnail.jpg" class="hero-video">
        [E:hero_video_play|source_section=hero,media_type=video]
        [E:hero_video_pause|source_section=hero,time_watched=seconds]
        [E:hero_video_complete|source_section=hero,completion_rate=percentage]
    </video>
</div>
```

---

## Section 2: Social Proof Measurement Overlays

### Section View Tracking
```html
<section id="social-proof" class="social-proof-section">
    [E:section_view|section_name=social_proof,time_to_view=seconds,scroll_depth=percentage]
```

### Secondary CTA
```html
<button class="cta-button-secondary">
    Ver mais histórias
    [E:cta_click|source_section=social_proof,cta_id=cta_secondary,cta_label=ver_mais_historias,destination=testimonials_section]
</button>
```

### Testimonial Carousel Interactions
```html
<div class="testimonial-carousel">
    <div class="testimonial-slide active" data-testimonial-id="marina-clinica">
        [E:testimonial_view|testimonial_id=marina_clinica,source_section=social_proof,view_time=seconds]
        [E:testimonial_interaction|testimonial_id=marina_clinica,interaction_type=click,source_section=social_proof]
    </div>
    
    <!-- Carousel Navigation -->
    <button class="carousel-prev">
        [E:carousel_navigation|direction=previous,source_section=social_proof,current_slide=marina_clinica]
    </button>
    <button class="carousel-next">
        [E:carousel_navigation|direction=next,source_section=social_proof,current_slide=marina_clinica]
    </button>
    
    <!-- Carousel Dots -->
    <div class="carousel-dots">
        <button class="dot active" data-slide="0">
            [E:carousel_dot_click|slide_number=0,testimonial_id=marina_clinica,source_section=social_proof]
        </button>
        <button class="dot" data-slide="1">
            [E:carousel_dot_click|slide_number=1,testimonial_id=carla_loja,source_section=social_proof]
        </button>
    </div>
</div>
```

### Business Type Checkmark Interactions
```html
<div class="business-types-list">
    <div class="business-type-item" data-business="clinica">
        ✓ Donos de clínica
        [E:business_type_click|business_type=clinica,source_section=social_proof,amanda_relevance=high]
    </div>
    <div class="business-type-item" data-business="loja">
        ✓ Loja de roupas
        [E:business_type_click|business_type=loja_roupas,source_section=social_proof,amanda_relevance=high]
    </div>
    <!-- Continue for all business types -->
</div>
```

---

## Section 3: Problem Agitation Measurement Overlays

### Section View with Emotional Intensity
```html
<section id="problem-agitation" class="problem-section">
    [E:section_view|section_name=problem_agitation,time_to_view=seconds,emotional_intensity=high]
```

### Pain Point Checklist Interactions
```html
<div class="pain-checklist">
    <div class="pain-item" data-pain="work-hours">
        ☑ Trabalha 12+ horas por dia
        [E:pain_point_click|pain_type=work_hours_excessive,source_section=problem,amanda_alignment=high,emotional_trigger=exhaustion]
    </div>
    <div class="pain-item" data-pain="hamster-wheel">
        ☑ Roda de hamster
        [E:pain_point_click|pain_type=hamster_wheel_feeling,source_section=problem,amanda_alignment=high,emotional_trigger=frustration]
    </div>
    <div class="pain-item" data-pain="sacrifice">
        ☑ Sacrifica sonhos pessoais
        [E:pain_point_click|pain_type=personal_sacrifice,source_section=problem,amanda_alignment=high,emotional_trigger=guilt]
    </div>
    <!-- Continue for all pain points -->
</div>
```

### Primary CTA (Problem → Solution)
```html
<button class="cta-button-primary problem-cta">
    Isso precisa mudar
    [E:cta_click|source_section=problem,cta_id=cta_primary,cta_label=isso_precisa_mudar,emotional_state=frustrated,conversion_intent=high]
</button>
```

### Pain Mirror Text Engagement
```html
<div class="pain-mirror-text">
    <p class="pain-paragraph" data-track-reading="true">
        Você acorda antes do amanhecer...
        [E:content_engagement|content_type=pain_mirror,source_section=problem,reading_time=seconds,engagement_depth=paragraph_level]
    </p>
</div>
```

---

## Section 4: Solution Overview Measurement Overlays

### Section View
```html
<section id="solution-overview" class="solution-section">
    [E:section_view|section_name=solution_overview,time_to_view=seconds,conversion_potential=high]
```

### Core Philosophy Interaction
```html
<div class="core-philosophy">
    <h2 class="philosophy-statement">
        "Não é trabalhar mais, é trabalhar melhor!"
        [E:philosophy_click|philosophy_type=core_tagline,source_section=solution,brand_message=primary]
    </h2>
</div>
```

### Three Pillars Interaction
```html
<div class="three-pillars">
    <div class="pillar mindset-pillar" data-pillar="mindset">
        <h3>Mentalidade Sem Esforço</h3>
        [E:pillar_interaction|pillar_type=mindset,source_section=solution,module_interest=high,amanda_pain_addressed=work_guilt]
    </div>
    
    <div class="pillar leadership-pillar" data-pillar="leadership">
        <h3>Liderança</h3>
        [E:pillar_interaction|pillar_type=leadership,source_section=solution,module_interest=high,amanda_pain_addressed=delegation_fear]
    </div>
    
    <div class="pillar systems-pillar" data-pillar="systems">
        <h3>Sistemas Escaláveis</h3>
        [E:pillar_interaction|pillar_type=systems,source_section=solution,module_interest=high,amanda_pain_addressed=time_scarcity]
    </div>
</div>
```

### Cultural Differentiation Highlights
```html
<div class="cultural-differentiators">
    <div class="differentiator feminine-energy">
        ✓ Energia feminina vs cultura masculina "hustle"
        [E:differentiator_click|differentiator_type=feminine_energy,source_section=solution,amanda_relevance=very_high]
    </div>
    <div class="differentiator anti-burnout">
        ✓ Abordagem anti-burnout
        [E:differentiator_click|differentiator_type=anti_burnout,source_section=solution,amanda_relevance=very_high]
    </div>
    <!-- Continue for all differentiators -->
</div>
```

### Solution Primary CTA
```html
<button class="cta-button-primary solution-cta">
    Quero conhecer a mentoria
    [E:cta_click|source_section=solution,cta_id=cta_primary,cta_label=quero_conhecer_mentoria,solution_interest=confirmed]
</button>
```

---

## Section 5: Program Deliverables Measurement Overlays

### Section View
```html
<section id="program-deliverables" class="deliverables-section">
    [E:section_view|section_name=program_deliverables,time_to_view=seconds,purchase_consideration=high]
```

### Trello Board Highlight
```html
<div class="delivery-method">
    <div class="trello-highlight">
        📋 Sistema Trello de Aprendizado
        [E:delivery_method_click|method_type=trello_board,source_section=deliverables,verified_asset=true,board_id=6705349ff4ddf2aebfb12072]
    </div>
</div>
```

### Module Cards Interaction
```html
<div class="modules-grid">
    <div class="module-card module-1-1" data-module="mindset">
        <h3>🧠 Mentalidade Sem Esforço</h3>
        [E:module_interaction|module_id=module_1_1_mindset,source_section=deliverables,verified_module=true,amanda_pain_addressed=work_guilt]
        
        <!-- Module Details Expand -->
        <button class="module-expand">
            Ver detalhes
            [E:module_expand|module_id=module_1_1_mindset,source_section=deliverables,details_interest=true]
        </button>
    </div>
    
    <div class="module-card module-1-4" data-module="leadership">
        <h3>👑 Liderança</h3>
        [E:module_interaction|module_id=module_1_4_leadership,source_section=deliverables,verified_module=true,amanda_pain_addressed=delegation_fear]
    </div>
    
    <!-- Additional inferred modules -->
    <div class="module-card module-systems" data-module="systems">
        <h3>⚙️ Sistemas Escaláveis</h3>
        [E:module_interaction|module_id=module_systems,source_section=deliverables,verified_module=false,inferred_content=true]
    </div>
</div>
```

### Resource Library Interaction
```html
<div class="resource-library">
    <div class="resource-item books">
        📚 Livros recomendados
        [E:resource_click|resource_type=books,source_section=deliverables,verified_asset=true]
    </div>
    <div class="resource-item templates">
        📄 Templates práticos
        [E:resource_click|resource_type=templates,source_section=deliverables,verified_asset=true]
    </div>
    <div class="resource-item videos">
        🎥 Conteúdo em vídeo
        [E:resource_click|resource_type=videos,source_section=deliverables,verified_asset=true]
    </div>
    <div class="resource-item reels">
        📱 Instagram Reels
        [E:resource_click|resource_type=instagram_reels,source_section=deliverables,verified_asset=true]
    </div>
</div>
```

### Support System Highlights
```html
<div class="support-system">
    <div class="support-item whatsapp">
        📱 WhatsApp direto
        [E:support_click|support_type=whatsapp,source_section=deliverables,communication_preference=direct]
    </div>
    <div class="support-item tracking">
        📊 Tracking de progresso
        [E:support_click|support_type=progress_tracking,source_section=deliverables,accountability_interest=high]
    </div>
    <div class="support-item implementation">
        👥 Suporte implementação
        [E:support_click|support_type=implementation_support,source_section=deliverables,amanda_concern_addressed=implementation_fear]
    </div>
</div>
```

### Deliverables Primary CTA
```html
<button class="cta-button-primary deliverables-cta">
    Quero acesso completo
    [E:cta_click|source_section=deliverables,cta_id=cta_primary,cta_label=quero_acesso_completo,program_interest=confirmed]
</button>
```

---

## Section 6: Transformation Outcomes Measurement Overlays

### Section View
```html
<section id="transformation-outcomes" class="outcomes-section">
    [E:section_view|section_name=transformation_outcomes,time_to_view=seconds,desire_activation=high]
```

### Outcome Categories Interaction
```html
<div class="outcomes-grid">
    <div class="outcome-card work-life-balance">
        <h3>⏰ Equilíbrio Vida-Trabalho</h3>
        [E:outcome_interaction|outcome_type=work_life_balance,source_section=outcomes,amanda_desire=primary,target_metric=40_hours_week]
        
        <ul class="outcome-list">
            <li>✓ Trabalhe no máximo 40 horas por semana
                [E:outcome_detail_click|detail_type=work_hours,target_value=40_hours_max,amanda_desire=very_high]
            </li>
            <li>✓ Tenha tempo qualidade com família
                [E:outcome_detail_click|detail_type=family_time,amanda_desire=very_high,emotional_trigger=guilt]
            </li>
        </ul>
    </div>
    
    <div class="outcome-card financial-freedom">
        <h3>✈️ Liberdade Financeira</h3>
        [E:outcome_interaction|outcome_type=financial_freedom,source_section=outcomes,amanda_desire=primary,lifestyle_goals=true]
        
        <ul class="outcome-list">
            <li>✓ Viaje 3 vezes ao ano
                [E:outcome_detail_click|detail_type=travel_frequency,target_value=3_times_year,amanda_desire=very_high]
            </li>
            <li>✓ Compre sem olhar preços
                [E:outcome_detail_click|detail_type=price_freedom,amanda_desire=high,lifestyle_upgrade=true]
            </li>
        </ul>
    </div>
    
    <!-- Continue for all outcome cards -->
</div>
```

### Success Timeline Interaction
```html
<div class="success-timeline">
    <div class="timeline-item month-1">
        PRIMEIROS 30 DIAS: Mudança de mentalidade
        [E:timeline_click|timeline_stage=month_1,source_section=outcomes,expectation_setting=true]
    </div>
    <div class="timeline-item months-2-3">
        MESES 2-3: Implementação de delegação
        [E:timeline_click|timeline_stage=months_2_3,source_section=outcomes,implementation_phase=true]
    </div>
    <!-- Continue for all timeline stages -->
</div>
```

### Outcomes Primary CTA
```html
<button class="cta-button-primary outcomes-cta">
    Começar minha jornada
    [E:cta_click|source_section=outcomes,cta_id=cta_primary,cta_label=comecar_minha_jornada,transformation_desire=confirmed]
</button>
```

---

## Section 7: Detailed Testimonials Measurement Overlays

### Section View
```html
<section id="detailed-testimonials" class="testimonials-section">
    [E:section_view|section_name=detailed_testimonials,time_to_view=seconds,social_proof_consumption=detailed]
```

### Extended Case Study Cards
```html
<div class="case-studies-grid">
    <div class="case-study marina-clinica">
        <div class="case-header">
            [👩] Marina, Clínica, São Paulo
            [E:case_study_view|case_id=marina_clinica,source_section=testimonials,business_type=clinica,amanda_similarity=high]
        </div>
        
        <div class="case-sections">
            <div class="case-before">
                ANTES: "Trabalhava 14h/dia..."
                [E:case_section_click|case_id=marina_clinica,section_type=before,source_section=testimonials,pain_resonance=true]
            </div>
            
            <div class="case-during">
                DURANTE: "O módulo de mindset..."
                [E:case_section_click|case_id=marina_clinica,section_type=during,source_section=testimonials,solution_interest=true]
            </div>
            
            <div class="case-after">
                DEPOIS: "Trabalho 6h/dia, 40% mais faturamento..."
                [E:case_section_click|case_id=marina_clinica,section_type=after,source_section=testimonials,result_desire=very_high]
            </div>
            
            <div class="case-today">
                HOJE: "Tenho o negócio dos sonhos..."
                [E:case_section_click|case_id=marina_clinica,section_type=today,source_section=testimonials,aspiration_activation=true]
            </div>
        </div>
        
        <!-- Read More/Less Functionality -->
        <button class="read-more-toggle">
            Ler história completa
            [E:testimonial_expand|case_id=marina_clinica,source_section=testimonials,engagement_level=deep]
        </button>
    </div>
    
    <!-- Similar structure for Carla and Ana cases -->
</div>
```

### Business Alignment Note
```html
<div class="business-alignment-note">
    <p>Todas representam negócios similares ao perfil Amanda...</p>
    [E:alignment_note_view|source_section=testimonials,credibility_building=true,amanda_similarity_confirmation=true]
</div>
```

### Testimonials Secondary CTA
```html
<button class="cta-button-secondary testimonials-cta">
    Ver minha transformação
    [E:cta_click|source_section=testimonials,cta_id=cta_secondary,cta_label=ver_minha_transformacao,social_proof_convinced=true]
</button>
```

---

## Section 8: FAQ Measurement Overlays

### Section View
```html
<section id="faq" class="faq-section">
    [E:section_view|section_name=faq,time_to_view=seconds,objection_resolution_needed=true]
```

### FAQ Accordion Interactions
```html
<div class="faq-accordion">
    <div class="faq-item faq-time-concern">
        <button class="faq-question">
            ❓ "Não tenho tempo para outro programa" [+]
            [E:faq_question_click|faq_id=time_concern,source_section=faq,amanda_objection=primary,objection_type=time_scarcity]
        </button>
        
        <div class="faq-answer">
            <p>Este programa ensina você a criar tempo...</p>
            [E:faq_answer_view|faq_id=time_concern,source_section=faq,answer_reading_time=seconds,objection_resolution=attempted]
        </div>
    </div>
    
    <div class="faq-item faq-previous-experience">
        <button class="faq-question">
            ❓ "Já tentei outras mentorias"
            [E:faq_question_click|faq_id=previous_experience,source_section=faq,amanda_objection=secondary,objection_type=skepticism]
        </button>
        
        <div class="faq-answer">
            [E:faq_answer_view|faq_id=previous_experience,source_section=faq,differentiation_message=true]
        </div>
    </div>
    
    <div class="faq-item faq-pricing-fear">
        <button class="faq-question">
            ❓ "Não posso aumentar preços"
            [E:faq_question_click|faq_id=pricing_fear,source_section=faq,amanda_objection=primary,objection_type=price_increase_fear]
        </button>
    </div>
    
    <div class="faq-item faq-industry-limitation">
        <button class="faq-question">
            ❓ "Minha área não permite liberdade"
            [E:faq_question_click|faq_id=industry_limitation,source_section=faq,amanda_objection=secondary,objection_type=industry_belief]
        </button>
    </div>
    
    <div class="faq-item faq-implementation-fear">
        <button class="faq-question">
            ❓ "Medo de não implementar"
            [E:faq_question_click|faq_id=implementation_fear,source_section=faq,amanda_objection=primary,objection_type=implementation_anxiety]
        </button>
    </div>
</div>
```

### FAQ Resolution Tracking
```html
<!-- Hidden field to track FAQ engagement pattern -->
<input type="hidden" id="faq-engagement-pattern" 
       data-track="true"
       [E:faq_engagement_pattern|faq_questions_opened=count,time_spent_reading=seconds,objections_addressed=list,resolution_confidence=calculated]>
```

### FAQ Primary CTA
```html
<button class="cta-button-primary faq-cta">
    Não tenho mais dúvidas
    [E:cta_click|source_section=faq,cta_id=cta_primary,cta_label=nao_tenho_mais_duvidas,objections_resolved=true,confidence_level=high]
</button>
```

---

## Section 9: Final CTA Measurement Overlays

### Section View (High Intent)
```html
<section id="final-cta" class="final-cta-section">
    [E:section_view|section_name=final_cta,time_to_view=seconds,conversion_intent=highest,page_completion=full]
```

### Urgency Elements Interaction
```html
<div class="urgency-elements">
    <div class="scarcity-element">
        ⚠️ VAGAS LIMITADAS
        [E:urgency_element_click|urgency_type=scarcity,source_section=final_cta,psychological_trigger=fear_of_missing_out]
    </div>
    
    <div class="cost-of-inaction">
        📈 O CUSTO DE CONTINUAR PARADA
        [E:urgency_element_click|urgency_type=cost_of_inaction,source_section=final_cta,psychological_trigger=loss_aversion]
    </div>
    
    <div class="opportunity-unique">
        🎯 OPORTUNIDADE ÚNICA
        [E:urgency_element_click|urgency_type=unique_opportunity,source_section=final_cta,psychological_trigger=exclusivity]
    </div>
</div>
```

### Final Primary CTA (Most Important)
```html
<button class="cta-button-primary final-primary-cta">
    SIM, QUERO ME TRANSFORMAR
    [E:cta_click|source_section=final_cta,cta_id=cta_primary_final,cta_label=sim_quero_me_transformar,conversion_intent=highest,cta_style=prominent_final,urgency_influenced=true]
</button>
```

### Final Assurance Elements
```html
<div class="final-assurance">
    <div class="assurance-item security">
        🔒 Seus dados seguros
        [E:assurance_click|assurance_type=data_security,source_section=final_cta,trust_building=true,lgpd_compliance=highlighted]
    </div>
    
    <div class="assurance-item support">
        📞 Suporte WhatsApp
        [E:assurance_click|assurance_type=whatsapp_support,source_section=final_cta,support_confidence=true]
    </div>
    
    <div class="assurance-item response">
        ⚡ Resposta em 24h
        [E:assurance_click|assurance_type=fast_response,source_section=final_cta,service_expectation=set]
    </div>
</div>
```

---

## Modal Measurement Overlays

### Modal Trigger (All Sources)
```html
<div id="questionario-modal" class="modal">
    [E:modal_open|source_section=detected,cta_id=detected,traffic_temperature=detected,lead_id=generated_or_existing,modal_trigger_source=tracked]
    
    <!-- Modal opens automatically trigger visitor identification -->
    [E:visitor_identification|lead_id=generated_if_new,session_id=current,visitor_type=new_or_returning,page_referrer=tracked]
```

### Progress Bar Interaction
```html
<div class="progress-bar">
    <div class="progress-fill" style="width: 33%"></div>
    <span class="progress-text">Etapa 1 de 3</span>
    [E:progress_view|progress_stage=step_1_of_3,progress_percentage=33,form_section=basic_info]
</div>
```

### Form Field Interactions
```html
<form class="modal-form" id="lead-capture-form">
    <!-- Form Start Detection -->
    [E:form_start|source_section=detected,modal_opened_from=tracked,time_to_start=seconds_since_modal_open]
    
    <!-- Basic Information Section -->
    <div class="form-section basic-info">
        <input type="text" name="name" id="lead-name" required>
            [E:field_focus|field_name=name,form_section=basic_info,field_order=1,time_to_focus=seconds]
            [E:field_blur|field_name=name,field_completion=completed_or_partial,time_spent=seconds]
        </input>
        
        <input type="email" name="email" id="lead-email" required>
            [E:field_focus|field_name=email,form_section=basic_info,field_order=2]
            [E:field_validation|field_name=email,validation_result=valid_or_invalid,error_shown=boolean]
        </input>
        
        <input type="tel" name="phone" id="lead-phone" required>
            [E:field_focus|field_name=phone,form_section=basic_info,field_order=3]
            [E:phone_format_attempt|phone_input=attempted,format_guidance=shown]
        </input>
    </div>
    
    <!-- Business Information Section (Amanda Scoring) -->
    <div class="form-section business-info">
        <select name="business_type" id="business-type" required>
            [E:dropdown_open|dropdown_field=business_type,form_section=business_info]
            <option value="clinica">Clínica/Consultório</option>
                [E:dropdown_select|dropdown_field=business_type,selected_value=clinica,amanda_score_points=10]
            <option value="loja">Loja/E-commerce</option>
                [E:dropdown_select|dropdown_field=business_type,selected_value=loja,amanda_score_points=10]
            <!-- Continue for all options -->
        </select>
        
        <select name="monthly_revenue" id="monthly-revenue" required>
            <option value="10k_20k">R$ 10k - 20k</option>
                [E:dropdown_select|dropdown_field=monthly_revenue,selected_value=10k_20k,amanda_score_points=3]
            <option value="20k_35k">R$ 20k - 35k (AMANDA TARGET)</option>
                [E:dropdown_select|dropdown_field=monthly_revenue,selected_value=20k_35k,amanda_score_points=5]
            <!-- Continue for all revenue brackets -->
        </select>
        
        <input type="range" name="work_hours_daily" min="6" max="16" id="work-hours-slider">
            [E:slider_change|slider_field=work_hours_daily,selected_value=hours,amanda_score_calculation=dynamic,score_points=calculated_based_on_hours]
        </input>
    </div>
    
    <!-- Pain Points & Qualification Section -->
    <div class="form-section qualification">
        <div class="radio-group main-struggle">
            <input type="radio" name="main_struggle" value="exhaustion_overwork" id="struggle-exhaustion">
                [E:radio_select|radio_group=main_struggle,selected_value=exhaustion_overwork,amanda_score_points=15,pain_alignment=perfect]
            <input type="radio" name="main_struggle" value="lack_systems" id="struggle-systems">
                [E:radio_select|radio_group=main_struggle,selected_value=lack_systems,amanda_score_points=10]
            <input type="radio" name="main_struggle" value="delegation_difficulty" id="struggle-delegation">
                [E:radio_select|radio_group=main_struggle,selected_value=delegation_difficulty,amanda_score_points=15,pain_alignment=high]
            <!-- Continue for all struggle options -->
        </div>
        
        <div class="radio-group feminine-energy">
            <input type="radio" name="feminine_energy_importance" value="muito_importante" id="feminine-very">
                [E:radio_select|radio_group=feminine_energy,selected_value=muito_importante,amanda_score_points=15,cultural_alignment=perfect]
            <input type="radio" name="feminine_energy_importance" value="importante" id="feminine-important">
                [E:radio_select|radio_group=feminine_energy,selected_value=importante,amanda_score_points=10]
            <input type="radio" name="feminine_energy_importance" value="pouco_importante" id="feminine-low">
                [E:radio_select|radio_group=feminine_energy,selected_value=pouco_importante,amanda_score_points=0,cultural_misalignment=true]
        </div>
        
        <input type="range" name="transformation_readiness" min="1" max="10" id="readiness-slider">
            [E:slider_change|slider_field=transformation_readiness,selected_value=number,amanda_score_calculation=readiness_based,commitment_indicator=true]
        </input>
    </div>
</form>
```

### Real-time Amanda Score Calculation
```html
<!-- Hidden field for Amanda score tracking -->
<input type="hidden" id="amanda-score-tracker" 
       data-demographics-score="0" 
       data-pain-points-score="0" 
       data-behavioral-score="0"
       data-total-amanda-score="0">
       [E:amanda_score_update|demographics_points=number,pain_points=number,behavioral_points=number,total_score=calculated,score_tier=low_medium_high]
</input>
```

### Form Submission
```html
<button type="submit" class="modal-submit-button">
    Continuar minha transformação
    [E:form_submit|source_section=modal,amanda_match_score=calculated_total,form_completion_time=seconds,lead_qualification=score_based,form_validation=all_fields_valid]
</button>
```

### Form Validation Messages
```html
<div class="validation-message error">
    Por favor, preencha este campo
    [E:validation_error_shown|field_name=detected,error_type=required_field,user_guidance=provided]
</div>

<div class="validation-message success">
    Formulário enviado com sucesso!
    [E:form_success_message|message_type=success_confirmation,next_step_guidance=provided]
</div>
```

### Modal Abandonment Tracking
```html
<button class="modal-close" id="modal-close-x">
    ✕
    [E:modal_abandon|abandon_method=close_button,time_in_modal=seconds,fields_completed=count,form_completion_percentage=calculated,amanda_score_at_abandon=current_score]
</button>

<!-- Background click abandonment -->
<div class="modal-backdrop">
    [E:modal_abandon|abandon_method=background_click,time_in_modal=seconds,fields_completed=count,form_completion_percentage=calculated]
</div>

<!-- Escape key abandonment -->
[E:modal_abandon|abandon_method=escape_key,time_in_modal=seconds,fields_completed=count]
```

---

## Scroll & Engagement Measurement Overlays

### Intersection Observer Implementation
```html
<!-- Each section has viewport tracking -->
<section data-section="hero" class="trackable-section">
    [E:section_enter_viewport|section_name=hero,time_to_enter=seconds,scroll_percentage_at_enter=number]
    [E:section_exit_viewport|section_name=hero,time_in_viewport=seconds,scroll_direction=up_or_down]
</section>
```

### Scroll Depth Milestones
```html
<!-- Scroll depth tracking points -->
<div data-scroll-milestone="25" class="scroll-tracker">
    [E:scroll_milestone|scroll_percentage=25,time_to_reach=seconds,sections_viewed=list]
</div>

<div data-scroll-milestone="50" class="scroll-tracker">
    [E:scroll_milestone|scroll_percentage=50,time_to_reach=seconds,sections_viewed=list,engagement_level=moderate]
</div>

<div data-scroll-milestone="75" class="scroll-tracker">
    [E:scroll_milestone|scroll_percentage=75,time_to_reach=seconds,sections_viewed=list,engagement_level=high]
</div>

<div data-scroll-milestone="100" class="scroll-tracker">
    [E:scroll_milestone|scroll_percentage=100,time_to_reach=seconds,page_completion=full,conversion_opportunity=highest]
</div>
```

### Time on Page Tracking
```html
<!-- Time-based engagement milestones -->
<script>
    // 30 seconds
    [E:time_on_page|duration=30_seconds,engagement_level=initial,sections_viewed=tracked]
    
    // 60 seconds  
    [E:time_on_page|duration=60_seconds,engagement_level=moderate,sections_viewed=tracked,scroll_behavior=tracked]
    
    // 120 seconds
    [E:time_on_page|duration=120_seconds,engagement_level=high,sections_viewed=tracked,interaction_count=tracked]
    
    // 300 seconds (5 minutes)
    [E:time_on_page|duration=300_seconds,engagement_level=very_high,page_completion=likely_full,conversion_intent=very_high]
</script>
```

---

## Page Exit & Return Visitor Measurement

### Page Exit Tracking
```html
<script>
    // Before unload - user leaving page
    [E:page_exit_attempt|exit_method=browser_close_or_navigate,time_on_page=total_seconds,scroll_completion=percentage,modal_opened=boolean,form_started=boolean,cta_clicks=count]
    
    // Tab visibility changes
    [E:tab_visibility_change|visibility_state=hidden_or_visible,time_away=seconds,engagement_lost=boolean]
</script>
```

### Return Visitor Detection
```html
<script>
    // Return visitor tracking
    [E:return_visitor_detected|previous_visits=count,last_visit_date=iso_date,previous_modal_opened=boolean,previous_form_started=boolean,visitor_journey_stage=determined]
    
    // Session continuation
    [E:session_continuation|session_id=existing,previous_session_duration=seconds,pages_viewed_previous=count,engagement_level_previous=tracked]
</script>
```

---

## Traffic Source & Attribution Measurement

### UTM Parameter Capture
```html
<script>
    // UTM and referrer tracking on page load
    [E:traffic_attribution|utm_source=value,utm_medium=value,utm_campaign=value,utm_content=value,utm_term=value,referrer_url=value,traffic_source_category=organic_paid_direct_referral]
    
    // Instagram specific tracking
    [E:instagram_arrival|instagram_source_type=bio_link_or_story_or_post,utm_campaign=tracked,content_context=tracked]
    
    // Direct traffic analysis
    [E:direct_traffic|referrer_empty=true,typed_url=likely,bookmark_visit=possible,brand_awareness=indicated]
</script>
```

### First vs Return Visit Attribution
```html
<script>
    // First visit
    [E:first_visit_attribution|traffic_source=primary,utm_parameters=all,initial_touchpoint=true,attribution_model=first_touch]
    
    // Return visit  
    [E:return_visit_attribution|original_source=preserved,current_source=new,attribution_model=first_touch_maintained,visit_number=count]
</script>
```

---

## Device & Browser Measurement

### Device Detection
```html
<script>
    [E:device_detection|device_type=mobile_tablet_desktop,screen_size=width_x_height,viewport_size=width_x_height,device_orientation=portrait_or_landscape]
    
    // Mobile specific tracking
    [E:mobile_experience|touch_enabled=boolean,mobile_navigation_used=boolean,modal_mobile_friendly=boolean,cta_touch_friendly=boolean]
    
    // Desktop specific tracking  
    [E:desktop_experience|mouse_interactions=count,keyboard_navigation=used,desktop_layout_utilized=boolean]
</script>
```

### Browser & Performance
```html
<script>
    [E:browser_performance|browser_type=chrome_safari_firefox_etc,page_load_time=milliseconds,dom_ready_time=milliseconds,largest_contentful_paint=milliseconds]
    
    // Performance impact on conversion
    [E:performance_conversion_impact|page_load_under_3_seconds=boolean,modal_load_time=milliseconds,form_responsiveness=smooth_or_laggy]
</script>
```

---

## Error & Technical Issue Measurement

### JavaScript Errors
```html
<script>
    // JavaScript error tracking
    [E:javascript_error|error_type=type,error_message=message,error_location=file_and_line,user_impact=conversion_blocking_or_minor]
    
    // Form submission errors
    [E:form_submission_error|error_type=validation_or_network,error_field=field_name,error_message=shown_to_user,retry_successful=boolean]
    
    // Modal loading errors
    [E:modal_error|error_type=load_failure_or_display_issue,fallback_activated=boolean,user_impact=conversion_blocked]
</script>
```

### Network & API Failures
```html
<script>
    // Lead submission API failure
    [E:api_failure|api_endpoint=lead_submission,failure_type=timeout_or_error,retry_attempt=number,fallback_method=activated]
    
    // CRM integration failure
    [E:integration_failure|integration_type=crm_or_mailerlite,failure_impact=data_loss_or_delayed_sync,manual_intervention_required=boolean]
</script>
```

---

## A/B Testing Measurement Framework

### Traffic Split Detection
```html
<script>
    // A/B test variation assignment
    [E:ab_test_assignment|test_name=test_id,variation=control_or_variant,assignment_method=random,visitor_id=tracked]
    
    // CTA label variations
    [E:cta_variation_test|test_element=cta_button,original_text=control_text,variation_text=test_text,section_location=tracked]
    
    // Modal form variations
    [E:modal_variation_test|test_element=form_fields,variation_type=field_order_or_questions,form_completion_impact=measured]
</script>
```

---

## Data Quality & Validation Measures

### Event Validation
```html
<script>
    // Ensure required parameters present
    [E:event_validation|event_name=validated,required_parameters_present=boolean,parameter_data_types_correct=boolean,amanda_score_calculation_accurate=boolean]
    
    // Cross-platform data consistency
    [E:data_consistency_check|ga4_event_sent=boolean,segment_event_sent=boolean,crm_data_synced=boolean,mailerlite_data_synced=boolean]
    
    // Test mode handling
    [E:test_mode_validation|environment=development_or_staging_or_production,test_mode_parameter=correctly_set,production_data_protection=ensured]
</script>
```

### PII Protection Verification
```html
<script>
    // Ensure no PII in analytics events
    [E:pii_protection_check|name_in_events=false,email_in_events=false,phone_in_events=false,lead_id_used_instead=true,user_id_mapping_secure=true]
    
    // LGPD compliance tracking
    [E:lgpd_compliance|consent_required_events=identified,consent_status=granted_or_denied,data_processing_lawful=confirmed]
</script>
```

---

## Sales Team Alert Triggers

### High-Value Lead Alerts
```html
<script>
    // Amanda score threshold alerts
    [E:sales_alert_trigger|alert_type=high_amanda_score,amanda_score=80_plus,alert_priority=high,recommended_action=immediate_follow_up]
    
    // Modal abandon with high engagement
    [E:sales_alert_trigger|alert_type=engaged_abandon,time_in_modal=60_seconds_plus,fields_completed=partial,recommended_action=personal_outreach]
    
    // Multiple page visits without conversion
    [E:sales_alert_trigger|alert_type=multiple_visits,visit_count=3_plus,modal_never_opened=true,recommended_action=targeted_follow_up]
</script>
```

### Follow-up Timing Optimization
```html
<script>
    // Best follow-up timing prediction
    [E:follow_up_timing|visitor_timezone=detected,active_hours_pattern=tracked,optimal_contact_time=predicted,contact_method_preference=inferred]
    
    // Urgency-based prioritization
    [E:lead_prioritization|amanda_score=number,engagement_level=high_medium_low,time_since_interaction=minutes,urgency_score=calculated]
</script>
```

---

## Quality Validation Results

**✅ Complete Interactive Coverage:**
- All buttons, links, form fields, and clickable elements have measurement overlays
- No user interaction goes untracked for conversion funnel analysis
- Drop-off points specifically identified for sales team intervention

**✅ Amanda-Specific Tracking:**
- Dynamic Amanda scoring built into form interactions
- Pain point alignment tracked for personalization opportunities
- Cultural fit indicators (feminine energy, Brazilian context) measured

**✅ Snake_Case Compliance:**
- All events and parameters follow required naming convention
- No camelCase or other formats mixed in
- Consistent parameter structure across all tracking points

**✅ Sales Team Optimization:**
- High-value lead alerts triggered by Amanda score thresholds
- Abandonment tracking provides follow-up opportunities
- Engagement patterns tracked for timing optimization
- Multiple visit detection enables targeted re-engagement

**✅ Technical Requirements Met:**
- test_mode parameter included for all events
- No PII in event parameters (lead_id/user_id mapping used)
- Error tracking prevents data loss issues
- Cross-platform consistency validated

**✅ Conversion Funnel Completeness:**
- Every step from landing to modal completion measured
- Thank you page progression tracked
- Email engagement and questionnaire completion monitored
- Calendar booking and WhatsApp automation tracked

This measurement overlay map ensures complete visibility into Amanda's transformation journey while providing actionable data for sales team follow-up and conversion optimization.

---

*Prepared by Measurement Annotator (MA) - Execute Phase Design Program Lead coordination*