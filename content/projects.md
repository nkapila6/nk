---
title: Projects
description: Things I've built across building control, MCP servers, and GPU inference.
comments: false
exclude: true
date: 2026-10-02
---

Things I've built, roughly grouped by what I care about: getting AI to drive real hardware, keeping tools small, and running models cheaply.

## Building control + AI

### mcp-helvarnet

An MCP server that lets an LLM query and control a live Helvar DALI lighting network over the HelvarNet TCP protocol. An agent can query the network and change light levels in plain language, talking to the Helvar routers directly. Built on [FastMCP](https://gofastmcp.com) and [aiohelvar](https://github.com/tomplayford/aiohelvar), and I've demoed it to enterprise clients at Luxtron.

<center><iframe width="500" height="300" src="https://www.youtube.com/embed/cjotGWdjD44" title="mcp-helvarnet demo" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></center>

**Stack:** Python, FastMCP, HelvarNet TCP

## MCP servers

### mcp-local-rag

"Primitive" RAG-style web search for LLMs that runs entirely locally, with no API keys. It searches across multiple engines, ranks results by semantic similarity to the query, then pulls clean markdown from the top pages back into the model's context. It's listed in the official Model Context Protocol servers repo and has 130+ stars.

- **Code:** [nkapila6/mcp-local-rag](https://github.com/nkapila6/mcp-local-rag)
- **Stack:** Python, MediaPipe text embeddings, DuckDuckGo and other search backends

### mcp-openvto

Virtual try-on over MCP: you chat with an LLM, it picks garments from a vector database and runs a diffusion try-on model on your photo. My first MCP server (mcp-local-rag) shipped as a ~1.2GB Docker image, which felt absurd for what's basically a JSON pipe, so I wrote this one in C++. The whole server compiles to a 1.3MB binary. I gave a talk on it at AI Tinkerers Dubai: [[posts/mcp-openvto-talk|From 1.2GB to 1.3MB]].

- **Code:** [nkapila6/mcp-openvto](https://github.com/nkapila6/mcp-openvto)
- **Stack:** C++, cpp-mcp, Eigen, Ollama, Couchbase vector search, Replicate (IDM-VTON)

## GPUs and inference

### Small Talk

An AI-to-AI podcast hosted by Reachy Mini robots. Give it a topic and 2 to 5 robot hosts write the script, design their own voices, and go live on a WebRTC call, with 3D digital twins and an optional real Reachy Mini on air. Built with [Gaurav Gosain](https://github.com/Gaurav-Gosain) for the Hugging Face Build Small Hackathon, where it won NVIDIA Nemotron Community Choice and the Modal category. Write-up: [[posts/small-talk|Small Talk]].

<center><iframe width="500" height="300" src="https://www.youtube.com/embed/obP4C1eH77I" title="Small Talk demo" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></center>

- **Code:** [Gaurav-Gosain/small-talk](https://github.com/Gaurav-Gosain/small-talk)
- **Live:** [HF Space](https://huggingface.co/spaces/build-small-hackathon/small-talk) | [HF blog write-up](https://huggingface.co/blog/build-small-hackathon/small-talk)
- **Stack:** Gradio, Modal, llama.cpp, Nemotron, Qwen3-TTS, Reachy Mini

### llama-modal-serve

The inference backend behind Small Talk. The HF Space runs CPU-only and sends all model calls to Modal: a quantized Nemotron-3-Nano-4B (GGUF) behind an OpenAI-compatible llama.cpp server, plus Qwen3-TTS for voices, both on A10Gs that scale to zero. The whole hackathon ran on about 30 USD of GPU time.

- **Code:** [nkapila6/llama-modal-serve](https://github.com/nkapila6/llama-modal-serve)
- **Stack:** Python, Modal, llama-cpp-python, faster-qwen3-tts

### cuda-man

NVIDIA stopped shipping man pages with the CUDA Toolkit, so this pulls the API reference and turns it into groff man pages. `man 3 cudaStreamCreate` works offline again. A Python 3, standard-library-only rewrite of sangmank/cudaman.

- **Code:** [nkapila6/cuda-man](https://github.com/nkapila6/cuda-man)

### cs149

Me working through Stanford's parallel computing course: threads, SIMD intrinsics, ISPC, and CUDA. It's groundwork for a small inference engine for ARM64.

- **Code:** [nkapila6/cs149](https://github.com/nkapila6/cs149)

## Research

### CNNtention

Co-authored arXiv preprint comparing attention-module augmentations on a ResNet-20, from Georgia Tech's Deep Learning course. I implemented the self-attention and multi-head attention modules.

- **Paper:** [arXiv:2412.11657](https://arxiv.org/abs/2412.11657)
- **Code:** [AttentionSeekers/CNNtention](https://github.com/AttentionSeekers/CNNtention)

---

More on [GitHub](https://github.com/nkapila6).
