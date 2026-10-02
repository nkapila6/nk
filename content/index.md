---
title: Welcome, let's backpropagate together!
description: Engineer working from lighting control and embedded hardware up to GPU inference. Systems & AI Engineer and Partner at Luxtron, MS CS (AI) from Georgia Tech.
comments: false
exclude: true
date: 2023-12-11
updated: 2026-10-02
---
Hi, I'm Nikhil 👋

I build things that sit between real hardware and AI. My background is building automation and lighting control, and these days I'm building LLM agents that drive real hardware.

I'm a Systems & AI Engineer and Partner at Luxtron, full time. I joined in 2018 in technical sales and became a partner in 2020, and since then I've been moving the business from hardware distribution to integrated building control, and now towards AI. I've designed and commissioned DALI and Casambi networks for 150+ control systems across the GCC. These days I lead R&D: embedding agentic AI into building automation, bridging lighting into HVAC and BMS over Modbus and BACnet, building a Raspberry Pi kit for commissioning DALI networks remotely, and a custom AI employee harness to offload repetitive work across the business. I'm also exploring where inference and robotics fit in.

From Dec 2025 to Jun 2026 I also worked with a British education group in the UAE, first as an AI consultant and then as Group Data & AI Manager, looking for places to embed AI across the organization. I built ETL and enrollment analysis over 32K+ records, competitive-intelligence scrapers across 326 schools, geospatial lead generation from Overture Maps, a multi-node LangGraph content engine, and a WordPress plugin plus a from-scratch C CLI that generate llms.txt so AI agents can read the sites.

Outside of that, I go deep on GPUs and inference: learning CUDA and GPU architecture, serving models on cloud GPUs, and writing a small inference engine for ARM64. The goal is simple: run AI well on edge hardware, not just in a data center.

I have an MS in Computer Science (AI) from `Georgia Tech` (4.0 GPA), where I also did research on cross-building transfer learning with the Human-Augmented Analytics Group and TA'd CS7641 (Machine Learning). I founded the OMSCS UAE chapter, which went from 3 to 80+ members.

## Things I've built

- **[mcp-helvarnet](https://github.com/nkapila6/mcp-helvarnet)**: MCP server that lets LLMs control Helvar DALI lighting over the HelvarNet TCP protocol.
- **[mcp-local-rag](https://github.com/nkapila6/mcp-local-rag)**: local web search for LLMs with semantic reranking, no API keys. Listed in the official MCP servers repo.
- **[[posts/small-talk|Small Talk]]**: AI-to-AI robot podcast. Won NVIDIA Nemotron Community Choice and the Modal category (3,000 USD in credits) at the Hugging Face Build Small Hackathon.
- **[[posts/mcp-openvto-talk|mcp-openvto]]**: virtual try-on app shrunk from 1.2GB to 1.3MB and exposed as a C++ MCP server.
- **[CNN attention paper](https://arxiv.org/abs/2412.11657)**: co-author.

## GPUs and inference

- **[llama-modal-serve](https://github.com/nkapila6/llama-modal-serve)**: serves Nemotron-3-Nano-4B (GGUF via llama.cpp) and Qwen3-TTS on Modal A10Gs with scale-to-zero. This is the backend behind Small Talk, and the whole hackathon ran on about 30 USD of GPU time.
- **[cuda-man](https://github.com/nkapila6/cuda-man)**: offline man pages for the CUDA API, so `man 3 cudaStreamCreate` works again. Python 3, standard library only.
- **[cs149](https://github.com/nkapila6/cs149)**: working through Stanford's parallel computing course (SIMD, multi-core, CUDA) to get the fundamentals right.

More on [GitHub](https://github.com/nkapila6), and my PRs are [here](https://github.com/search?q=is%3Apr%20author%3Ankapila6&type=pullrequests).

## Talks

- [[posts/mcp-openvto-talk|From 1.2GB to 1.3MB]], AI Tinkerers Dubai
- [[posts/ml-primer|A ML Primer]], UAE SWE Group
- Jury member, BITS Pilani Tech Fest Hackathon, Dubai (2025)

## Work with me

I take on freelance and part-time work in MCP integrations, agents for industrial and building systems, and GPU/edge inference. Email me at [blog@nkapila.me](mailto:blog@nkapila.me) or find me on [LinkedIn](https://linkedin.com/in/nikhilkapila).

## The blog

This site is called Backpropagation with NK. [Backprop](https://en.wikipedia.org/wiki/Backpropagation) is how a neural net updates its weights, and these posts are me updating mine.

- [[posts]]: things I learned and how I think about them
- [[masters]]: Georgia Tech OMSCS course reviews and notes
- [[life]]: everything else

If something here helped you, you can buy me a coffee.

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/X8X51MK4A1)

---

> [!info] Attribution
> This website was built using [Quartz](https://github.com/jackyzha0/quartz) and the notes are written using [Obsidian](https://obsidian.md/).
