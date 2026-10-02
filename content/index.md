---
title: Nikhil Kapila
description: Engineer working from lighting control and embedded hardware up to GPU inference. Systems Engineer and Partner at Luxtron, MS CS (AI) from Georgia Tech.
comments: false
exclude: true
date: 2023-12-11
updated: 2026-10-02
---
Hi, I'm Nikhil 👋

I build things that sit between real hardware and AI. Most of my work is in building automation and lighting control, and lately in getting LLM agents to drive those systems.

I'm a Systems Engineer and Partner at Luxtron, where I've spent 7+ years on lighting control (DALI, Helvar, Casambi, KNX) across the GCC. Right now I'm building the layer that connects these systems to PLC, HVAC and BMS platforms, so an agent can actually operate a building.

The other half of my time goes into GPUs and inference. I'm learning CUDA and GPU architecture, serving models on cloud GPUs, and writing a small inference engine for ARM64. The goal is simple: run AI well on edge hardware, not just in a data center.

I have an MS in Computer Science (AI) from `Georgia Tech`.

## Things I've built

- **[mcp-helvarnet](https://github.com/nkapila6/mcp-helvarnet) / [mcp-casambi](https://github.com/nkapila6/mcp-casambi)**: MCP servers that let LLMs control Helvar and Casambi lighting. Built by reverse-engineering the protocols.
- **[[posts/small-talk|Small Talk]]**: AI-to-AI robot podcast. Won NVIDIA Nemotron Community Choice and Modal credits at the Hugging Face Build Small Hackathon.
- **[[posts/mcp-openvto-talk|mcp-openvto]]**: virtual try-on app shrunk from 1.2GB to 1.3MB and exposed as a C++ MCP server.
- **[CNN attention paper](https://arxiv.org/abs/2412.11657)**: co-author.

## GPUs and inference

- **[llama-modal-serve](https://github.com/nkapila6/llama-modal-serve)**: serves Nemotron-3-Nano-4B (GGUF via llama.cpp) and Qwen3-TTS on Modal A10Gs with scale-to-zero. This is the backend behind Small Talk, and the whole hackathon ran on about 30 USD of GPU time.
- **[ggufparser](https://github.com/nkapila6/ggufparser)**: a GGUF model file parser in Rust.
- **[cuda-man](https://github.com/nkapila6/cuda-man)**: offline man pages for the CUDA API, so `man 3 cudaStreamCreate` works again. Python 3, standard library only.
- **[cs149](https://github.com/nkapila6/cs149)**: working through Stanford's parallel computing course (SIMD, multi-core, CUDA) to get the fundamentals right.

More on [GitHub](https://github.com/nkapila6), and my PRs are [here](https://github.com/search?q=is%3Apr%20author%3Ankapila6&type=pullrequests).

## Talks

- [[posts/mcp-openvto-talk|From 1.2GB to 1.3MB]], AI Tinkerers Dubai
- [[posts/ml-primer|A ML Primer]], UAE SWE Group

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
