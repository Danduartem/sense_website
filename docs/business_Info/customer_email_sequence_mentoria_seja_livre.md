# CUSTOMER Email Sequence — Mentoria Seja Livre

**Sequence Type:** Post-Purchase Onboarding  
**Target Avatar:** Amanda - The Exhausted Achiever (Paying Customer)  
**Sequence Length:** 3 emails over 7 days  
**Primary Goal:** Program activation + early engagement success  

---

## Email 1: Day 0 - Welcome & Access Delivery

**Asset ID:** `customer.d0.email.welcome`  
**Trigger:** program_enrollment_complete (immediate)  
**Primary CTA:** Access Trello board + first module  

### Email Content

**Subject Line:** "🎉 Bem-vinda à Mentoria Seja Livre! Seu acesso está aqui"

**From:** Juçanã | Mentoria Seja Livre  
**Reply-To:** jucana@mentoriasejalivre.com.br

**Body:**
```
Oi {{first_name}}! 🌟

QUE ALEGRIA TER VOCÊ AQUI!

Você acabou de dar o passo mais importante da sua jornada empreendedora: investir na sua transformação de empreendedora exausta para empresária de sucesso que trabalha menos e fatura mais.

**🎯 SEUS PRÓXIMOS PASSOS:**

**PASSO 1: Acesse seu Board da Mentoria**
👉 **[Clique aqui para acessar]({{trello_board_url}}?utm_source=email&utm_medium=automation&utm_campaign=customer&utm_content=d0_welcome_board)**

Este é o seu centro de comando! Lá você encontra:
- Todos os módulos organizados em sequência lógica
- Materiais complementares e templates
- Vídeos explicativos e exercícios práticos
- Recursos extras para cada etapa

**PASSO 2: Comece pelo Módulo 1.1 - Mentalidade Sem Esforço**
É fundamental começar por aqui! Este módulo vai desmontar as crenças limitantes que estão sabotando sua liberdade financeira.

**PASSO 3: Me mande uma mensagem no WhatsApp**
👉 **[Confirme aqui que recebeu tudo]({{mentor_whatsapp_url}}?utm_source=email&utm_medium=automation&utm_campaign=customer&utm_content=d0_welcome_whatsapp)**

Quero saber que você conseguiu acessar tudo e tirar qualquer dúvida que surgir.

**🔥 SUA PRIMEIRA TAREFA (PARA HOJE):**

1. Acesse o Board e explore a estrutura completa
2. Assista ao vídeo de boas-vindas no Módulo 1.1
3. Leia o material "Desconstruindo a Crença do Trabalho Duro"
4. Me confirme no WhatsApp que conseguiu acessar tudo

**💡 DICA ESPECIAL:**

Reserve 30 minutos hoje para essa primeira exploração. Não precisa estudar tudo de uma vez - a ideia é você se familiarizar com o ambiente e entender a jornada que está pela frente.

Lembre-se: sua transformação começa HOJE. 

Cada dia que você se dedica a implementar o que ensino aqui é um dia a mais de liberdade que você conquista.

Estou aqui para te apoiar em cada passo! 💪

Um abraço de coração,
Juçanã

**P.S.:** Se por algum motivo não conseguir acessar o Board, me mande uma mensagem imediatamente no WhatsApp. Vou resolver em minutos!

---

**🎁 BÔNUS DE BOAS-VINDAS:**

Como você está começando sua jornada, preparei alguns presentes especiais:

📚 **Biblioteca de Livros Recomendados** - Já está no seu Board  
📝 **Template de Autoavaliação Empreendedora** - Para mapear seu ponto de partida  
🎥 **Vídeos Motivacionais** - Para os dias que bater o desânimo  
📱 **Acesso VIP ao WhatsApp** - Suporte direto comigo  

Sua nova vida começa AGORA! 🚀
```

**UTM Parameters:**
```json
{
  "utm_source": "email",
  "utm_medium": "automation",
  "utm_campaign": "customer",
  "utm_content": "d0_welcome"
}
```

**Tracking Events:**
- `email_open`: customer.d0.email.welcome
- `trello_board_click`: board_access_attempt
- `whatsapp_click`: mentor_contact
- `module_click`: module_1_1_access

---

## Email 2: Day 1 - Onboarding Check-in

**Asset ID:** `customer.d1.email.onboarding`  
**Trigger:** Day 1 after program_enrollment_complete  
**Primary CTA:** Start Module 1.1 implementation  

### Email Content

**Subject Line:** "Como foi seu primeiro dia na Mentoria? (+ dica crucial)"

**From:** Juçanã | Mentoria Seja Livre  
**Reply-To:** jucana@mentoriasejalivre.com.br

**Body:**
```
Oi {{first_name}}!

Como foi seu primeiro dia como aluna da Mentoria Seja Livre? 

Espero que você tenha conseguido acessar o Board e dar uma olhada no que preparei para sua transformação.

**🔍 RAPIDINHA: VOCÊ JÁ FEZ ISSO?**

✅ Acessou o Board principal  
✅ Assistiu ao vídeo de boas-vindas  
✅ Leu o material sobre "Desconstruindo a Crença do Trabalho Duro"  
✅ Me mandou uma mensagem no WhatsApp confirmando acesso  

Se ainda não fez algum desses passos, sem problemas! Mas reserve um tempinho hoje para colocar em dia, ok?

**💡 DICA CRUCIAL PARA SEU SUCESSO:**

Nos primeiros 7 dias de mentoria são fundamentais para criar o momentum da sua transformação.

As alunas que mais se transformam rapidamente são aquelas que se dedicam intensamente nas primeiras duas semanas.

Por isso, quero te dar uma estratégia simples:

**📅 PLANEJAMENTO DOS PRÓXIMOS 7 DIAS:**

**Dias 1-3:** Foque APENAS no Módulo 1.1 (Mentalidade Sem Esforço)
- Não se distraia com outros módulos ainda
- Faça todos os exercícios de autoconhecimento
- Aplique as técnicas de desconstrução de crenças limitantes

**Dias 4-7:** Comece a implementação prática
- Aplique o que aprendeu no seu dia a dia
- Observe suas reações e resistências
- Anote suas descobertas para nossa próxima conversa

**🎯 AÇÃO PARA HOJE:**

Se você ainda não começou o Módulo 1.1, faça isso HOJE:

👉 **[Ir para Módulo 1.1 agora]({{trello_board_url}}/module-1-1?utm_source=email&utm_medium=automation&utm_campaign=customer&utm_content=d1_module_access)**

**📝 EXERCÍCIO ESPECIAL:**

No final do Módulo 1.1, tem um exercício chamado "Mapeando Suas Crenças Limitantes".

Esse exercício é TRANSFORMADOR. Várias alunas me relataram insights poderosos fazendo ele.

Reserve pelo menos 20 minutos para fazer com calma e sinceridade.

**🤝 PRECISA DE AJUDA?**

Se surgirem dúvidas ou você sentir alguma resistência (é normal!), me procura no WhatsApp:

👉 **[Mandar mensagem para Juçanã]({{mentor_whatsapp_url}}?utm_source=email&utm_medium=automation&utm_campaign=customer&utm_content=d1_support)**

Estou aqui para garantir que você tenha TODO o suporte necessário para sua transformação.

**{{first_name}}, você fez a escolha certa investindo em si mesma.**

Agora é hora de honrar esse investimento com dedicação e implementação.

Sua empresária de sucesso interior está ansiosa para ser libertada! 💫

Um abraço cheio de expectativa,
Juçanã

P.S.: Amanhã vou te mandar algumas dicas específicas sobre como superar a resistência inicial que quase toda empreendedora sente quando está mudando mindset. Fica ligada!
```

**UTM Parameters:**
```json
{
  "utm_source": "email",
  "utm_medium": "automation",
  "utm_campaign": "customer",
  "utm_content": "d1_onboarding"
}
```

---

## Email 3: Day 7 - Week 1 Progress Assessment

**Asset ID:** `customer.d7.email.progress`  
**Trigger:** Day 7 after program_enrollment_complete  
**Primary CTA:** Continue to Module 1.4 + schedule check-in  

### Email Content

**Subject Line:** "Uma semana de transformação! Como você está se sentindo?"

**From:** Juçanã | Mentoria Seja Livre  
**Reply-To:** jucana@mentoriasejalivre.com.br

**Body:**
```
Oi {{first_name}}!

Uma semana inteira como aluna da Mentoria Seja Livre! 🎉

Como você está se sentindo? Que mudanças já consegue perceber?

**🔍 VAMOS FAZER UMA AVALIAÇÃO RÁPIDA:**

Sobre o **Módulo 1.1 - Mentalidade Sem Esforço:**

▫️ Você identificou suas principais crenças limitantes?  
▫️ Conseguiu fazer o exercício de mapeamento completo?  
▫️ Já notou alguma mudança na forma como você se relaciona com o trabalho?  
▫️ Aplicou alguma das técnicas de desconstrução no seu dia a dia?  

**💬 ME CONTA NO WHATSAPP:**

Estou curiosa para saber como está sendo sua experiência! 

👉 **[Mandar mensagem contando como está sendo]({{mentor_whatsapp_url}}?utm_source=email&utm_medium=automation&utm_campaign=customer&utm_content=d7_progress_share)**

Pode ser só um áudio rápido ou algumas linhas. Quero saber:
- O que mais te impactou até agora
- Qual foi sua maior resistência
- Que resultado já conseguiu perceber

**🚀 PRÓXIMO PASSO: MÓDULO 1.4 - LIDERANÇA**

Se você já finalizou o Módulo 1.1 (parabéns!), é hora de partir para o próximo nível:

**Módulo 1.4 - Liderança** é onde você aprende a:
- Delegar sem perder o controle da qualidade
- Conduzir reuniões de one-on-one eficazes
- Criar uma cultura de alta performance na sua equipe
- Desenvolver autoridade sem autoritarismo

👉 **[Acessar Módulo 1.4 - Liderança]({{trello_board_url}}/module-1-4?utm_source=email&utm_medium=automation&utm_campaign=customer&utm_content=d7_leadership_access)**

**⚠️ SE VOCÊ AINDA NÃO TERMINOU O MÓDULO 1.1:**

Sem pressa! Cada uma tem seu ritmo.

Mas é importante não dispersar. Foque em finalizar o 1.1 antes de partir para o próximo.

A transformação real acontece na implementação, não na velocidade.

**📅 DICA DE ORGANIZAÇÃO:**

Sugestão de cronograma para as próximas 2 semanas:

**Semana 2:** Módulo 1.4 (Liderança) + implementação prática  
**Semana 3:** Revisar e aplicar ambos os módulos no dia a dia  

**🎁 BONUS ESPECIAL:**

Como você completou sua primeira semana, liberti um conteúdo extra no seu Board:

**"Templates de Reunião de One-on-One"** - Já está disponível na seção de recursos do Módulo 1.4.

**{{first_name}}, estou muito orgulhosa de você!**

Investir em si mesma já é um ato de coragem. Manter a disciplina na primeira semana mostra que você está realmente comprometida com sua transformação.

Continue assim! Sua empresária de sucesso está emergindo a cada dia. ✨

**🤗 QUER BATER UM PAPO COMIGO?**

Se quiser conversar sobre sua experiência até agora ou tirar dúvidas específicas, estou disponível no WhatsApp.

Pode ser para:
- Compartilhar uma descoberta que fez
- Tirar dúvida sobre algum exercício
- Pedir orientação sobre implementação
- Ou só para me contar como está se sentindo!

👉 **[Conversar com Juçanã]({{mentor_whatsapp_url}}?utm_source=email&utm_medium=automation&utm_campaign=customer&utm_content=d7_chat_invite)**

Um abraço cheio de admiração,
Juçanã

P.S.: A partir da próxima semana, você vai receber e-mails mais espaçados, focados em acompanhar sua evolução nos módulos. Mas o WhatsApp está sempre aberto para o que precisar! 💕
```

**UTM Parameters:**
```json
{
  "utm_source": "email",
  "utm_medium": "automation",
  "utm_campaign": "customer",
  "utm_content": "d7_progress"
}
```

---

## Technical Configuration

### Sequence Triggers
```json
{
  "sequence_id": "customer_onboarding",
  "entry": {
    "event": "program_enrollment_complete",
    "conditions": ["payment_success", "access_granted"]
  },
  "exit": ["refund_success", "account_cancelled"],
  "suppression": ["do_not_email"],
  "timezone": "Europe/Lisbon",
  "quiet_hours": "09:00-18:00",
  "skip_weekends": false
}
```

### Success Metrics
- **Primary KPI:** Program activation rate >90%
- **Trello Access Rate:** >95% within 24 hours
- **Module 1.1 Start Rate:** >80% within 1 week
- **WhatsApp Engagement:** >60% response rate
- **Email Open Rate:** >40% (higher than nurture sequence)

### Key Performance Indicators
- **Day 0:** Trello board access within 2 hours of enrollment
- **Day 1:** Module 1.1 video view or material download
- **Day 7:** Progress communication via WhatsApp or email response
- **Week 2:** Module 1.4 access indicating progression

### Automation Logic
```json
{
  "onboarding_automation": {
    "welcome_email": "immediate_after_payment",
    "checkin_email": "24_hours_later",
    "progress_email": "7_days_later",
    "whatsapp_integration": "triggered_by_email_links",
    "suppression_rules": {
      "refund_issued": "exit_all_sequences",
      "support_ticket_active": "pause_promotional_emails",
      "high_engagement": "continue_all_sequences"
    }
  }
}
```

---

*This CUSTOMER sequence was created by the Messaging Program Lead system specifically for Amanda - The Exhausted Achiever avatar post-purchase onboarding, focusing on program activation and early success indicators.*