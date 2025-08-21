# SEO & OG Package v1.0 — Mentoria Seja Livre

**Client:** Mentoria Seja Livre  
**Date:** 2025-08-20  
**Version:** v1.0  
**Prepared by:** SLE (SEO & Localization Editor)  
**Target Market:** Brazilian & Portuguese female entrepreneurs

---

## Executive Summary

This SEO & OG Package v1.0 provides complete metadata optimization for Mentoria Seja Livre's landing page and supporting pages, targeting Amanda's search behavior and social sharing patterns. All content is optimized for Portuguese-speaking markets with cultural context and local search optimization.

**Key SEO Focus Areas:**
- Amanda-specific search intent targeting
- Brazilian and Portuguese market localization
- Social proof and transformation-focused descriptions
- Mobile-first meta descriptions
- Feminine entrepreneur positioning

---

## Landing Page SEO Package

### Primary Meta Tags
**Block ID Schema:** `seo.landing.*`

```json
{
  "block_id": "seo.landing.title",
  "content": "Mentoria para Mulheres Empreendedoras | Trabalhe Menos e Fature Mais",
  "length": "69 characters",
  "keywords": "mentoria, mulheres empreendedoras, trabalhar menos, faturar mais",
  "notes": "Under 70 chars, includes main value proposition"
}
```

```json
{
  "block_id": "seo.landing.description", 
  "content": "Transforme-se de empreendedora exausta em empresária de sucesso. Sistema exclusivo que honra a energia feminina e constrói negócios lucrativos e escaláveis.",
  "length": "154 characters",
  "keywords": "empreendedora exausta, empresária de sucesso, energia feminina, negócios lucrativos",
  "notes": "Within 155 char limit, emotional hook + solution"
}
```

```json
{
  "block_id": "seo.landing.keywords",
  "content": "mentoria empresarial para mulheres, trabalhar menos ganhar mais, energia feminina negócios, empreendedora exausta, liderança feminina, mentoria seja livre",
  "intent": "commercial investigation + transactional",
  "competition": "medium to low for specific feminine energy positioning"
}
```

### Open Graph Tags
**Block ID Schema:** `og.landing.*`

```json
{
  "block_id": "og.landing.title",
  "content": "Pare de Trabalhar 12+ Horas Sem Resultado | Mentoria Seja Livre",
  "length": "62 characters", 
  "notes": "Social-optimized version, pain point hook"
}
```

```json
{
  "block_id": "og.landing.description",
  "content": "Mentoria específica para mulheres empreendedoras que honram a energia feminina. Transforme exaustão em liberdade financeira e pessoal.",
  "length": "142 characters",
  "notes": "Social sharing description, emotional appeal"
}
```

```json
{
  "block_id": "og.landing.image",
  "url": "/assets/images/og-mentoria-seja-livre.jpg",
  "alt": "Mulher empreendedora confiante trabalhando em seu escritório moderno",
  "dimensions": "1200x630",
  "notes": "Amanda-representative imagery, professional yet approachable"
}
```

```json
{
  "block_id": "og.landing.type",
  "content": "website",
  "site_name": "Mentoria Seja Livre"
}
```

### Twitter Card Tags
**Block ID Schema:** `twitter.landing.*`

```json
{
  "block_id": "twitter.landing.card",
  "content": "summary_large_image"
}
```

```json
{
  "block_id": "twitter.landing.title",
  "content": "Mulheres Empreendedoras: Trabalhe Menos, Fature Mais",
  "length": "51 characters"
}
```

```json
{
  "block_id": "twitter.landing.description", 
  "content": "Sistema de mentoria que honra a energia feminina. Transforme exaustão em liberdade financeira.",
  "length": "98 characters"
}
```

### Structured Data (JSON-LD)
**Block ID Schema:** `schema.landing.*`

```json
{
  "block_id": "schema.landing.organization",
  "schema_type": "Organization",
  "content": {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Mentoria Seja Livre",
    "description": "Mentoria especializada para mulheres empreendedoras que buscam trabalhar menos e faturar mais",
    "url": "https://mentoriasejalivre.com.br",
    "sameAs": [
      "https://instagram.com/mentoriasejalivre"
    ],
    "areaServed": ["BR", "PT"],
    "serviceType": "Business Mentoring"
  }
}
```

```json
{
  "block_id": "schema.landing.service",
  "schema_type": "Service", 
  "content": {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Mentoria Seja Livre Program",
    "description": "Programa de mentoria para transformar mulheres empreendedoras exaustas em empresárias de sucesso",
    "provider": {
      "@type": "Organization",
      "name": "Mentoria Seja Livre"
    },
    "areaServed": {
      "@type": "Country",
      "name": ["Brazil", "Portugal"]
    },
    "audience": {
      "@type": "Audience",
      "audienceType": "Female Entrepreneurs"
    }
  }
}
```

---

## Supporting Pages SEO

### Thank You Page
**Block ID Schema:** `seo.thankyou.*`

```json
{
  "block_id": "seo.thankyou.title",
  "content": "Obrigada! Próximos Passos da Sua Transformação | Mentoria Seja Livre",
  "length": "68 characters"
}
```

```json
{
  "block_id": "seo.thankyou.description",
  "content": "Respostas recebidas! Aguarde o questionário detalhado no seu email para completar sua candidatura à Mentoria Seja Livre.",
  "length": "125 characters",
  "robots": "noindex, nofollow"
}
```

### Privacy Policy Page
**Block ID Schema:** `seo.privacy.*`

```json
{
  "block_id": "seo.privacy.title", 
  "content": "Política de Privacidade | Mentoria Seja Livre",
  "length": "44 characters"
}
```

```json
{
  "block_id": "seo.privacy.description",
  "content": "Como protegemos seus dados pessoais na Mentoria Seja Livre. Transparência total sobre coleta, uso e proteção de informações.",
  "length": "131 characters"
}
```

### Terms of Service Page
**Block ID Schema:** `seo.terms.*`

```json
{
  "block_id": "seo.terms.title",
  "content": "Termos de Uso | Mentoria Seja Livre",
  "length": "35 characters"
}
```

```json
{
  "block_id": "seo.terms.description",
  "content": "Termos e condições para participação na Mentoria Seja Livre. Direitos, responsabilidades e políticas do programa.",
  "length": "116 characters"
}
```

---

## Canonical URLs & Technical SEO

### URL Structure
**Block ID Schema:** `canonical.*`

```json
{
  "block_id": "canonical.landing",
  "url": "https://mentoriasejalivre.com.br/",
  "alternates": {
    "pt-PT": "https://mentoriasejalivre.com.br/pt/",
    "pt-BR": "https://mentoriasejalivre.com.br/"
  }
}
```

```json
{
  "block_id": "canonical.thankyou", 
  "url": "https://mentoriasejalivre.com.br/obrigada",
  "robots": "noindex, nofollow"
}
```

```json
{
  "block_id": "canonical.privacy",
  "url": "https://mentoriasejalivre.com.br/privacidade"
}
```

```json
{
  "block_id": "canonical.terms",
  "url": "https://mentoriasejalivre.com.br/termos"
}
```

### Hreflang Implementation
**Block ID Schema:** `hreflang.*`

```json
{
  "block_id": "hreflang.structure",
  "implementation": {
    "pt-BR": "https://mentoriasejalivre.com.br/",
    "pt-PT": "https://mentoriasejalivre.com.br/pt/", 
    "x-default": "https://mentoriasejalivre.com.br/"
  },
  "notes": "Primary market is Brazil, Portugal as secondary"
}
```

---

## Localization Package (pt-PT Variants)

### Portuguese (Portugal) Copy Variants
**Block ID Schema:** `i18n.pt_pt.*`

#### Hero Section Localization
```json
{
  "block_id": "i18n.pt_pt.hero.h1",
  "pt_BR": "Pare de trabalhar 12+ horas por dia sem ver resultado",
  "pt_PT": "Deixe de trabalhar mais de 12 horas por dia sem ver resultados",
  "notes": "PT uses 'deixe de' vs BR 'pare de'"
}
```

```json
{
  "block_id": "i18n.pt_pt.hero.h2",
  "pt_BR": "Transforme-se de empreendedora exausta em empresária de sucesso",
  "pt_PT": "Transforme-se de empresária exausta numa empreendedora de sucesso",
  "notes": "PT: 'numa' vs BR: 'em', word order preference"
}
```

#### CTA Localization  
```json
{
  "block_id": "i18n.pt_pt.cta.primary",
  "pt_BR": "Quero minha transformação",
  "pt_PT": "Quero a minha transformação", 
  "notes": "PT includes definite article 'a'"
}
```

#### Business Context Localization
```json
{
  "block_id": "i18n.pt_pt.business_examples",
  "pt_BR": "donos de clínica, loja de roupas, maquiadora, nutricionista",
  "pt_PT": "proprietários de clínica, loja de roupa, maquilhadora, nutricionista",
  "notes": "PT: proprietários vs donos, roupa vs roupas, maquilhadora vs maquiadora"
}
```

#### Pain Points Localization
```json
{
  "block_id": "i18n.pt_pt.pain_travel",
  "pt_BR": "viajar 3x ao ano",
  "pt_PT": "viajar 3 vezes por ano",
  "notes": "PT prefers spelled out numbers in this context"
}
```

#### Form Fields Localization
```json
{
  "block_id": "i18n.pt_pt.form.phone",
  "pt_BR": "WhatsApp (com DDD)",
  "pt_PT": "WhatsApp (com indicativo)",
  "notes": "PT: indicativo vs BR: DDD for area code"
}
```

```json
{
  "block_id": "i18n.pt_pt.form.revenue",
  "pt_BR": "Faturamento mensal atual", 
  "pt_PT": "Facturação mensal actual",
  "notes": "PT: facturação vs faturamento, actual vs atual"
}
```

### Currency & Number Localization
**Block ID Schema:** `i18n.currency.*`

```json
{
  "block_id": "i18n.currency.br_real",
  "symbol": "R$",
  "format": "R$ 20.000",
  "market": "Brazil",
  "notes": "Brazilian Real formatting with periods for thousands"
}
```

```json
{
  "block_id": "i18n.currency.euro_context",
  "symbol": "€", 
  "format": "€ 5.000",
  "market": "Portugal",
  "adaptation": "Convert Brazilian revenue ranges to Portuguese context",
  "notes": "For Portuguese market, adjust revenue ranges to Euro equivalent"
}
```

---

## Internal Linking Strategy

### Navigation Links
**Block ID Schema:** `internal_links.*`

```json
{
  "block_id": "internal_links.testimonials",
  "anchor_text": "Ver histórias de sucesso",
  "target": "#testimonials",
  "context": "Social proof navigation from hero section"
}
```

```json
{
  "block_id": "internal_links.deliverables",
  "anchor_text": "Ver módulos detalhados", 
  "target": "#deliverables",
  "context": "Program details navigation from solution section"
}
```

### Footer Links
```json
{
  "block_id": "internal_links.privacy",
  "anchor_text": "Política de Privacidade",
  "target": "/privacidade",
  "rel": "nofollow"
}
```

```json
{
  "block_id": "internal_links.terms",
  "anchor_text": "Termos de Uso",
  "target": "/termos", 
  "rel": "nofollow"
}
```

---

## Mobile SEO Optimization

### Mobile-Specific Meta Tags
**Block ID Schema:** `mobile_seo.*`

```json
{
  "block_id": "mobile_seo.viewport",
  "content": "width=device-width, initial-scale=1.0"
}
```

```json
{
  "block_id": "mobile_seo.app_capable",
  "content": "yes",
  "apple_mobile_web_app_capable": "yes"
}
```

```json
{
  "block_id": "mobile_seo.theme_color",
  "content": "#8B5CF6",
  "notes": "Purple theme matching brand colors"
}
```

### Mobile-Optimized Descriptions
```json
{
  "block_id": "mobile_seo.short_description",
  "content": "Transforme exaustão em liberdade. Mentoria para mulheres empreendedoras.",
  "length": "75 characters",
  "usage": "Mobile search results and app descriptions"
}
```

---

## Search Intent Targeting

### Primary Keywords by Intent

#### Commercial Investigation Intent
```json
{
  "intent": "commercial_investigation",
  "keywords": [
    "mentoria para mulheres empreendedoras",
    "como trabalhar menos e ganhar mais",
    "energia feminina nos negócios",
    "mentoria empresarial feminina",
    "transformação empresarial para mulheres"
  ],
  "content_mapping": "Problem + Solution sections"
}
```

#### Transactional Intent
```json
{
  "intent": "transactional",
  "keywords": [
    "mentoria seja livre",
    "curso para mulheres empreendedoras",
    "programa de mentoria empresarial",
    "mentoria transformação empresarial"
  ],
  "content_mapping": "CTA sections + Deliverables"
}
```

#### Informational Intent
```json
{
  "intent": "informational", 
  "keywords": [
    "como delegar no negócio",
    "mulher empreendedora exausta",
    "trabalhar menos faturar mais",
    "liderança feminina empresarial",
    "energia feminina vs masculina negócios"
  ],
  "content_mapping": "Educational content + Testimonials"
}
```

### Long-tail Keyword Targeting
```json
{
  "long_tail_keywords": [
    "mentoria para mulheres empreendedoras que trabalham muito",
    "como parar de trabalhar 12 horas por dia",
    "empresária exausta precisa de ajuda",
    "mentoria que respeita energia feminina",
    "transformação de empreendedora para empresária"
  ],
  "content_integration": "Naturally integrated throughout copy sections"
}
```

---

## Performance & Technical SEO

### Core Web Vitals Optimization
```json
{
  "performance_targets": {
    "LCP": "< 2.5 seconds",
    "FID": "< 100 milliseconds", 
    "CLS": "< 0.1",
    "implementation": "Optimized images, minimal JavaScript, critical CSS inline"
  }
}
```

### Image SEO
**Block ID Schema:** `image_seo.*`

```json
{
  "block_id": "image_seo.hero_image",
  "alt": "Mulher empreendedora confiante trabalhando em laptop moderno",
  "title": "Transformação de empreendedora exausta em empresária de sucesso",
  "filename": "empreendedora-confiante-mentoria-seja-livre.jpg"
}
```

```json
{
  "block_id": "image_seo.testimonial_photos",
  "alt_template": "{{Client_Name}}, {{Business_Type}}, cliente da Mentoria Seja Livre",
  "example": "Marina, Nutricionista, cliente da Mentoria Seja Livre"
}
```

---

## Local SEO (Brazil & Portugal)

### Geographic Targeting
**Block ID Schema:** `local_seo.*`

```json
{
  "block_id": "local_seo.brazil_targeting",
  "regions": [
    "São Paulo", "Rio de Janeiro", "Brasília", "Belo Horizonte", 
    "Porto Alegre", "Salvador", "Recife", "Curitiba"
  ],
  "content_integration": "Business examples from major Brazilian cities"
}
```

```json
{
  "block_id": "local_seo.portugal_targeting", 
  "regions": ["Lisboa", "Porto", "Braga", "Coimbra"],
  "content_adaptation": "Portuguese business context and cultural references"
}
```

### Business Schema for Multi-Location
```json
{
  "block_id": "schema.business_location",
  "schema_type": "LocalBusiness",
  "content": {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Mentoria Seja Livre",
    "areaServed": [
      {"@type": "Country", "name": "Brazil"},
      {"@type": "Country", "name": "Portugal"}
    ],
    "serviceType": "Business Mentoring",
    "audience": {
      "@type": "BusinessAudience",
      "name": "Female Entrepreneurs"
    }
  }
}
```

---

## Implementation Checklist

### Technical Implementation
- [ ] All meta tags implemented with proper character limits
- [ ] Open Graph tags configured for social sharing optimization
- [ ] Structured data (JSON-LD) implemented for rich snippets
- [ ] Canonical URLs set for all pages
- [ ] Hreflang implementation for Portuguese markets
- [ ] Mobile-specific meta tags configured
- [ ] Image alt text optimized for accessibility and SEO

### Content Optimization
- [ ] Primary keywords naturally integrated throughout copy
- [ ] Meta descriptions written for click-through optimization
- [ ] Internal linking strategy implemented for user navigation
- [ ] Portuguese localization variants created for key markets
- [ ] Local business context integrated for Brazil and Portugal

### Performance Monitoring
- [ ] Core Web Vitals baseline established
- [ ] Search Console integration configured
- [ ] Analytics tracking for organic search performance
- [ ] Social sharing performance monitoring
- [ ] Mobile search optimization validated

This SEO & OG Package v1.0 ensures comprehensive search optimization and localization for Amanda's discovery journey across Portuguese-speaking markets, supporting both organic acquisition and social sharing effectiveness.