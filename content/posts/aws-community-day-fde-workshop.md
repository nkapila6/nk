---
layout: post
title: "So You Want to Be an FDE?! A Workshop at AWS Community Day UAE"
description: A two-hour hands-on workshop where every team played forward deployed engineer for a fictional delivery company with a broken AI support bot.
tags:
  - aws
  - events
  - talks
  - fde
date: 2026-10-03
updated: 2026-10-03
---

# So You Want to Be an FDE?! A Workshop at AWS Community Day UAE

<video controls preload="none" playsinline poster="/posts/resources/aws-community-day-2026/bunty-thanks-poster.jpg" src="/posts/resources/aws-community-day-2026/bunty-thanks.mp4"></video>

<div class="photo-grid">
<img src="/posts/resources/aws-community-day-2026/room.jpg" alt="Nikhil presenting to a full room at AWS Community Day UAE" />
<img src="/posts/resources/aws-community-day-2026/certificate.jpg" alt="Certificate handover at AWS Community Day UAE" />
</div>

## Important note

- This was a two-hour workshop at the fifth edition of **AWS Community Day UAE**, 3 October 2026.
- **Venue:** Deriv office, One by Omniyat, Dubai.
- **Built with:** Mohammad Fazalullah, who designed it with me and joined remotely on the day.
- The film up top is a thank-you from our fictional COO, Bunty. Yes, really.

> [!INFO] TL;DR
> No slides about what a forward deployed engineer is. Every table *became* one for two hours: a broken AI support bot, a customer who keeps changing his mind, a support lead nobody asked, and an order system that falls over at peak hours. Nobody won by being the best coder in the room.

## Let's clear the air

FDE is having a moment. Every AI company is hiring them and every LinkedIn post has an opinion on what they are. So, quickly:

- **What is an FDE?** An engineer who goes to the customer, works out what they actually need, and ships it into their systems. That's it. One sentence.
- **So it's a solutions engineer with a fancier title?** No. A solutions engineer designs it before the contract. An FDE builds it after, inside someone else's mess, and then reports back to product what broke.
- **Is the hard part the code?** Nope. The hard part is "works out what they actually need", usually while three people on the customer side want three different things.
- **Does the title mean the same thing everywhere?** Not even close. Same title, different jobs. Read the bullet points, not the title.

## The setup: Jaldi Jaldi Express

Every table got the same customer: Jaldi Jaldi Express, a delivery company whose tagline is "Delivered jaldi. Mostly." They want an AI support chatbot live in thirty days, and the COO has already told the board. Classic.

The cast:

- **Bunty Bhalla, COO.** Paying for it. Wants it yesterday. Loves graphs. I played Bunty, and I will grill you.
- **Sudha Aunty, head of customer support.** 18 years in, 8 agents, 300+ messages a day. Only answers what you ask her, and nobody asked her team about this chatbot. To talk to her you had to walk to the support desk and video call her.
- **Chintu, the entire IT department.** Built the order system. Documented nothing. Fixes things by restarting. You never meet Chintu, you just live with Chintu's code.

Each team split into the roles you'd actually find around a real account:

| Role | Talks to | Owns |
| --- | --- | --- |
| FDE lead | Bunty | The scope, and what the COO hears |
| Builder | The code | `tools.py`, `prompt.md`, `make eval` |
| Customer investigator | Sudha Aunty | How support really works today |
| Reliability lead | Everyone | What would stop this going live |

<center><img src="/posts/resources/aws-community-day-2026/speaking.jpg" alt="Nikhil explaining the roles to the room" /></center>

## How the two hours ran

Everyone started from the same starter repo with a deliberately bad agent. Run `make eval` against twenty real customer messages and you get 8 out of 20. Then it gets worse.

1. **The demo breaks.** Read every failure, circle the one that would hurt Jaldi Jaldi the most.
2. **Talk to the customer. No code yet.** Write one sentence: *We will help ___ do ___. We'll know it worked when ___.*
3. **Build.** Fix `tools.py` and `prompt.md`, run the eval as often as you like.
4. **The customer keeps messaging.** Every few minutes Bunty showed up with something new:
   - "Board meeting moved up! Can you show me something working in fifteen minutes? Something shiny, please."
   - "While you're in there, can it also do sentiment analysis?"
   - "And one... small.. dashboard. The board loves graphs."
   - Then Chintu's order system started timing out at peak hours. Teams restarted their API in timeout mode and had to decide what the bot says when it can't check an order.
5. **Code freeze and scorecard.** Five categories, five points each: customer outcome, reliability, scope discipline, technical quality, handoff. The ticket count is one line out of five.
6. **Live demos.** Three minutes each, and I tried to break them.
7. **The handoff note.** You leave Jaldi Jaldi tomorrow and nobody has seen your code. What's safe to switch on, what isn't, who owns it, and what our product team needs to hear.

> [!WARNING] Scored this way on purpose
> A perfect bot that answers the wrong problem scores badly. That's deliberate. That's also the job.

<center><img src="/posts/resources/aws-community-day-2026/team.jpg" alt="A team working through the customer brief" /></center>

## What the teams found

The best bits weren't scripted. Teams found the bot leaking customer phone numbers and internal warehouse notes, and locked them up. Some taught it Arabic. And when Bunty asked for sentiment analysis and a dashboard before board day, the strongest teams just said "not in this build" and explained why.

Honestly? Best no I've heard. Saying no to the right thing is most of the job.

## Why build it like this?

Real FDE interview loops test three things: can you find your way around an unfamiliar codebase, can you turn a vague customer problem into something concrete, and do you notice the security holes. The workshop was two of those rounds wearing a costume. `agent/tools.py` was the unfamiliar codebase, Bunty and Sudha were the vague problem, and the leaking phone numbers were the security round.

If you're thinking about an FDE offer, here are the questions I'd ask before signing:

- Do I carry a quota, or does my bonus depend on deals?
- Do I report to engineering, or to sales?
- In my first 90 days, how much code goes to production?
- How many customers at once?
- When I report what the product gets wrong, who reads it?

If the answers are "yes", "sales", "not much", "lots" and "nobody", that's a sales job with a terminal.

## What's next

Engineering + customer delivery + AI + product feedback. That's forward deployed AI, and it's turning into its own profession. I'm exploring an **FDAI Summit for 2027**: a practitioner event just for this role. Want to attend, speak, sponsor, or hire FDEs? [Get in touch](/contact).

If you were in the room: keep the ZIP. `make eval2` has eight messages the first twenty didn't cover, and you can plug in a real model by setting `LLM_BASE_URL` and `LLM_API_KEY`. Watch what changes.

Thanks to the AWS Community Day UAE organisers, Deriv for the space, the sponsors, Fazalullah, and everyone who showed up and built with us. Our bot stopped lying to customers. Mostly.
