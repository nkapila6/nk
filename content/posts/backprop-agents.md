---
title: "How to Backpropagate Your Way to Agents: A Roadmap"
date: 2026-06-28
tags:
  - machine-learning
  - deep-learning
  - llm
  - agents
  - mcp
  - roadmap
---

# How to Backpropagate Your Way to Agents: A Roadmap

So you want to build agents?
Cool. Same. Half the people on Twitter are also building agents, the other half are writing think pieces on why agents are not real. Pick your side, I guess.

This post is the roadmap I wish someone had handed me before I went down the rabbit hole. Not a "20 days to LLM mastery" sales funnel, just an honest path from ✨I sort of know what a derivative is✨ to ✨I can write an MCP server and a ReAct loop without copy-pasting from a YouTube tutorial✨.

> [!WARNING] No Shortcuts
> This roadmap assumes you actually want to understand things, not just `pip install langchain` and ship a chatbot. If you just want to ship a chatbot, close this tab. Go forth, ship, prosper.

## Let's clear the air

A few things upfront because I see the same questions in every Discord I'm in.

- **Do I need to do ML before DL before agents?** Short answer: yes. Long answer: yes, and the people who skip steps usually end up confidently wrong on Twitter. ML is where you learn bias-variance, why your model overfits, how to read a learning curve, and why hyperparameters matter. Skip it and you'll spend months wondering why your fine-tuned model is "behaving weirdly".
- **Can I just use [framework X]?** Yeah you can. But the goal here is to *understand*, not to *use*. Frameworks change every 3 months. Intuition compounds.
- **Do I need to write a transformer from scratch?** You don't *need* to. But the first time you implement attention in NumPy and watch loss drop on a tiny dataset, something clicks that no amount of reading the [Attention Is All You Need](https://arxiv.org/abs/1706.03762) paper will give you. I'm biased because I did it. Sue me.
- **How long will this take?** If you're working full-time and learning in the evenings: 8 to 12 months to be ✨dangerous✨. 2 years to be good. People who say 3 months are lying or have no job.
- **What math do I need?** Linear algebra, multivariate calculus, basic probability. You don't need to be a mathematician but if you can't compute a Jacobian or read $\nabla$, you'll struggle.
- **GPUs?** Colab free tier or [Lightning AI](https://lightning.ai/) gets you through 95% of this. Don't buy a 4090 to learn `torch.nn.Linear`.

> [!INFO] TL;DR
> TL;DR of the roadmap below: ML → DL (from scratch in NumPy → PyTorch → transformers) → LLMs and post-training → tool calling → MCP → agents. If you're already past ML/DL, jump to Phase 3.

## Phase 0: Math prereqs

I'm not going to spend much time here because I already wrote about it in my [CS7643 prep](https://nkapila.me/masters/cs7643-dl-prep) and [CS7641 review](https://nkapila.me/masters/cs7641-review). Quick recap.

**Bare minimum**:

1. [3b1b: Essence of Linear Algebra](https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab) (watch it, no excuses)
2. [3b1b: Essence of Calculus](https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr) (same)
3. [The Matrix Calculus You Need For Deep Learning](https://explained.ai/matrix-calculus/) (this is the *entire* point of backprop, please read it twice)
4. [An Intuitive Introduction to Probability](https://www.coursera.org/learn/introductiontoprobability) (you'll need this for VAEs, diffusion, RLHF, basically all of the interesting stuff)

> [!WARNING] Vibes-Based Backprop
> If you skip the matrix calculus reading, your understanding of backprop will be vibes-based. Vibes-based backprop is how you end up wondering why your gradients are exploding while staring at a `.backward()` call.

If you have time, also do [Math for ML](https://mml-book.github.io/). It's free, the chapters are short, and it'll make every paper you read 10x more digestible.

## Phase 1: Machine Learning

Yes you still need this. No, "I read the sklearn docs" doesn't count.

The goal of ML phase is not to memorize 47 algorithms. The goal is to internalize:

- **Bias-variance tradeoff**: why your model sucks (it's almost always one of these two).
- **Generalization**: why training accuracy of 99% might still mean your model is useless.
- **Hyperparameters and their effects**: develop the intuition that hyperparameters are knobs that *do specific things*, not magic numbers you grid-search.
- **What different algorithms actually do**: decision trees split, SVMs find margins, KNN is lazy, ensembles average out variance. You should be able to picture the decision surface in your head.

**Resources**:

- [Andrew Ng's Coursera ML](https://www.coursera.org/learn/machine-learning) is still a fine starting point, the new version is more practical
- [StatQuest](https://www.youtube.com/@statquest) for intuition (the "BAM!" guy, you'll love him)
- [Mitchell's textbook](https://www.cs.cmu.edu/~tom/mlbook.html) if you want the classic theory. Old but good. I wrote about why it's still worth reading [here](https://nkapila.me/masters/mitchell).
- If you're at OMSCS or want a structured deep-dive, my [CS7641 review](https://nkapila.me/masters/cs7641-review) has the full reading list.

**What to actually build**:

1. Linear regression and logistic regression from scratch (NumPy only, no sklearn)
2. A decision tree from scratch (you'll appreciate ID3 / CART after)
3. KMeans and PCA from scratch (UL is sneakily important for embeddings later)
4. A small project: pick a Kaggle dataset, run 4-5 algorithms, write up *why* each one performed how it did. Not "X got 87%". Why X got 87%.

> [!INFO] Inductive Biases
> The "why" matters more than the accuracy. I wrote about this in [Algorithmic Biases in Supervised Learning](https://nkapila.me/posts/sl-biases). Every algorithm has inductive biases. Learn them. They show up everywhere downstream.

Skip RL for now. You don't need it for agents in the LLM sense. You'll come back to it when you want to understand RLHF / GRPO / DPO.

## Phase 2: Deep Learning

This is where it gets fun. Or painful. Usually both.

### 2.1: Neural networks from scratch (NumPy)

Build a 2-layer MLP in NumPy. No PyTorch, no autograd. Implement:

- Forward pass
- Backward pass (manually compute gradients for each layer)
- SGD update
- Train it on MNIST

**Resources**:

- [Andrej Karpathy: Neural Networks Zero to Hero](https://www.youtube.com/playlist?list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ). If you watch only one playlist this year, make it this one. The micrograd video alone is worth 6 months of reading papers.
- [UMich Lecture 6: Backpropagation](https://www.youtube.com/watch?v=dB-u77Y5a6A)
- [Blog: Backpropagation for a Linear Layer](https://web.eecs.umich.edu/~justincj/teaching/eecs442/notes/linear-backprop.html)

**What you should be able to do at the end**:

- Hand-derive the gradient of cross-entropy loss + softmax (no peeking).
- Explain why the gradient for the last layer simplifies to $\hat{y} - y$ (this is one of those moments where math gets ✨beautiful✨).
- Know why `einsum` is your best friend for matrix shape gymnastics. See [Einsum Is All You Need](https://www.youtube.com/watch?v=pkVwUVEHmfI).

### 2.2: Autograd / autodiff in NumPy

This is the step most people skip. Don't.

Build a tiny autograd library. A `Tensor` class that tracks its own computation graph and can call `.backward()` on itself. Karpathy's [micrograd](https://github.com/karpathy/micrograd) is the canonical reference. Watch the video, then *do not copy his code*. Write your own. When you get stuck, peek. When you don't get stuck, keep going.

What you're learning here:

- Computational graphs and how they get built dynamically
- Reverse-mode autodiff (the chain rule, but managed by a topological sort)
- Why `requires_grad` and `.detach()` exist in PyTorch (oh, *that's* what they do)

**Resources**:

- [Karpathy: micrograd lecture](https://www.youtube.com/watch?v=VMj-3S1tku0)
- [MyGrad](https://github.com/rsokl/MyGrad): a real autodiff lib for NumPy. Read the source after you've built your own. It's a great study.
- [What is Automatic Differentiation?](https://www.youtube.com/watch?v=wG_nF1awSSY)

> [!INFO] Salute
> The day you write your own autograd and it correctly computes gradients for a 3-layer MLP, you will gain a permanent and unshakeable respect for the people who built PyTorch and JAX. Saluteee 🫡

### 2.3: CNNs with autodiff in NumPy

Now do the same for convolutions. Implement `Conv2d`, `MaxPool2d`, `BatchNorm2d` (BN is sneakily tricky, the gradient is non-trivial), and run a small CNN on CIFAR-10.

Yes it'll be slow. That's the point. Once you've felt how slow `for` loops over kernels are, you'll appreciate why GPUs exist and why `im2col` was a clever idea.

**Resources**:

- I wrote some of this up in [DL A2 - CNNs using NumPy tips](https://nkapila.me/masters/dl-a2)
- [UMich Lecture 7: Convolutional Networks](https://www.youtube.com/watch?v=ANyxBVxmdZ0)
- [cs231n: Convolutional Networks](https://cs231n.github.io/convolutional-networks/)
- [Backpropagation in CNNs](https://youtu.be/z9hJzduHToc)
- [numpy.lib.stride_tricks.as_strided](https://numpy.org/doc/stable/reference/generated/numpy.lib.stride_tricks.as_strided.html): cursed but powerful, lets you vectorize convolutions without explicit loops

**What you should be able to do**:

- Hand-derive the gradient of a conv layer w.r.t. both inputs and weights
- Explain what a 1x1 conv actually does ([hint](https://www.youtube.com/watch?v=wf2HblQbP-U))
- Understand why ResNets work (the residual connection is doing something *very* specific to the gradient flow)

### 2.4: RNNs and LSTMs (switch to PyTorch)

At this point, stop doing things in NumPy. You've earned it. Switch to PyTorch.

Build:

1. A vanilla RNN, train it on character-level Shakespeare
2. An LSTM, do the same. Notice how it actually trains long sequences without exploding
3. Bonus: a GRU. (It's an LSTM with fewer gates. That's the joke.)

**Resources**:

- [Karpathy: The Unreasonable Effectiveness of RNNs](https://karpathy.github.io/2015/05/21/rnn-effectiveness/) (the OG blog post, still relevant)
- [StatQuest: LSTMs explained](https://www.youtube.com/watch?v=YCzL96nL7j0)
- [UMich Lecture 12: RNNs](https://youtu.be/dUzLD91Sj-o)
- [Colah's blog: Understanding LSTMs](https://colah.github.io/posts/2015-08-Understanding-LSTMs/) (the diagrams everyone steals)

**What you should be able to do**:

- Explain why vanilla RNNs have the vanishing gradient problem (and why LSTMs fix it with their gate machinery)
- Sketch the LSTM cell from memory (yes, including the forget gate, the input gate, the output gate, the cell state, all of it. It's not that bad.)
- Write a training loop that uses BPTT (backpropagation through time) and not lose your mind

If you want to go deep, I trained LSTMs on the [Building Genome 2 dataset](https://nkapila.me/masters/mscs-research-work) for my MS research. The dataset is fun, energy time-series with real noise.

### 2.5: RNN/LSTM + Attention

Before transformers, attention was bolted onto RNN encoder-decoders for translation. This is the historical path and it's pedagogically gold because you can *see* attention being added to something you already understand.

Build a seq2seq translation model with Bahdanau or Luong attention. German to English is the classic. The DL A3 (or A4 depending on semester) at Georgia Tech does exactly this, I covered it in my [CS7643 review](https://nkapila.me/masters/cs7643-review).

**Resources**:

- [Bahdanau et al. 2014: Neural Machine Translation by Jointly Learning to Align and Translate](https://arxiv.org/abs/1409.0473) (this is where attention starts)
- [StatQuest: Attention for Neural Networks](https://www.youtube.com/watch?v=PSs6nxngL6k)
- [UMich Lecture 13: Attention](https://youtu.be/YAgjfMR9R_M)

**What you should be able to do**:

- Explain attention in one sentence: *a weighted sum of values, where the weights are computed from queries and keys*. That's the entire idea. Everything else is engineering.
- Understand why attention is permutation-equivariant and why we need positional encodings to compensate
- Realize that "context vectors" in seq2seq are early embeddings of an entire sequence's meaning. This is the same idea you'll see in CLIP, sentence-transformers, every retrieval model ever.

### 2.6: Transformer / GPT from scratch

This is the boss fight. Once you do this, you're past the hard part.

Build a small GPT in PyTorch. Train it on tiny Shakespeare. Make it generate gibberish that sounds like Shakespeare. I did this and put it up at [nkapila6/gpt](https://github.com/nkapila6/gpt) if you want a reference. Karpathy's [nanoGPT](https://github.com/karpathy/nanoGPT) is the gold standard reference, but again: write your own first.

Components to implement:

1. Tokenizer (BPE is the norm. [Karpathy's tokenizer video](https://www.youtube.com/watch?v=zduSFxRajkE) is the best resource. Tokenization is way weirder than you think.)
2. Token + positional embeddings
3. Multi-head self-attention (with masking for causal language modeling)
4. Feedforward MLP block
5. LayerNorm (and learn why pre-norm vs post-norm matters)
6. Residual connections (please, please understand why these exist)
7. Final output head with weight tying

**Resources**:

- [Karpathy: Let's build GPT from scratch](https://www.youtube.com/watch?v=kCc8FmEb1nY) (mandatory)
- [Attention Is All You Need](https://arxiv.org/abs/1706.03762) (read it 3 times, you'll understand more each time)
- [The Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/) (when the math gets confusing, look at the pictures)
- [3b1b: Attention in Transformers, visually explained](https://youtu.be/eMlx5fFNoYc)
- [The Annotated Transformer](http://nlp.seas.harvard.edu/2018/04/03/attention.html) (Harvard's line-by-line PyTorch annotation of the original paper)
- For RoPE and modern positional schemes: [RoPE explained](https://blog.eleuther.ai/rotary-embeddings/)

**What you should be able to do**:

- Sketch the transformer block on a whiteboard
- Explain why we divide by $\sqrt{d_k}$ in scaled dot-product attention (gradient stability, not magic)
- Implement KV cache and explain why inference is so much faster than training
- Read any modern LLM paper (Llama, Mistral, Qwen) and understand 80% of it without crying

> [!INFO] Side Quest
> Bonus side quest: if you're feeling brave, after building GPT, do a small finetuning run with LoRA. You'll learn what "adapter parameters" means and why everyone's doing PEFT. The [HuggingFace PEFT docs](https://huggingface.co/docs/peft) are decent.

At this point, congrats: you understand how LLMs work. Time to make them *do things*.

## Phase 3: Agentic Shit

Now the interesting part.

### 3.1: LLMs as systems, not just models

Before you can build agents, you need to understand what's happening when you hit a chat API.

Concepts to internalize:

- **Pretraining vs post-training**: base models predict next token. Chat models have been instruction-tuned and RLHF'd. They're not the same thing. The [InstructGPT paper](https://arxiv.org/abs/2203.02155) and [Anthropic's Constitutional AI paper](https://arxiv.org/abs/2212.08073) are good starts.
- **Sampling**: temperature, top-k, top-p, repetition penalty. These are not random knobs.
- **Context windows and KV caches**: why long contexts are expensive (it's quadratic in attention, linear with KV cache during decode).
- **Quantization**: GPTQ, AWQ, GGUF, bitsandbytes. You'll need this when you try to run a 70B model on a 24GB card and cry.
- **Inference engines**: vLLM, SGLang, llama.cpp. Each makes different tradeoffs.

**Resources**:

- [Lilian Weng's blog](https://lilianweng.github.io/) is the single best resource on LLM research. Just read the whole thing. Twice.
- [The Illustrated GPT-2](https://jalammar.github.io/illustrated-gpt2/)
- [HuggingFace LLM Course](https://huggingface.co/learn/llm-course) (free, good)
- [GPU Mode](https://www.youtube.com/@GPUMODE) and [Stas Bekman's ML Engineering book](https://github.com/stas00/ml-engineering) if you want to go deep on infra

### 3.2: Function calling / tool use

This is the hinge. Without tool use, an LLM is a fancy text predictor. With tool use, it's the beginning of an agent.

Pick one provider (OpenAI, Anthropic, Gemini, whoever) and write a 50-line script that:

1. Takes a user question
2. Sends it to an LLM with a `get_weather(city)` tool
3. Parses the tool call from the response
4. Executes the function
5. Sends the result back to the LLM
6. Returns the final answer

Yes that's an agent. A really primitive one but technically yes.

Things to understand:

- The model isn't *calling* your function. It's *emitting JSON* that you parse and execute. The model has no idea what your function does.
- Tool schemas matter. The model picks tools based on names and descriptions. Bad descriptions = bad tool use.
- Error handling: what does the model do when your tool returns an error? (Usually: tries again. Sometimes: hallucinates. Plan for both.)

**Resources**:

- [Anthropic tool use docs](https://docs.claude.com/en/docs/agents-and-tools/tool-use)
- [OpenAI function calling docs](https://platform.openai.com/docs/guides/function-calling)
- [Hugging Face Agents course](https://huggingface.co/learn/agents-course)

### 3.3: MCP (Model Context Protocol)

Once you've done one tool-calling app, you'll notice you're rewriting the same plumbing every project. MCP is the open standard that fixes this. Think of it as ✨USB-C for tools✨.

Three pieces:

- **MCP server**: exposes tools, resources, prompts. Written by whoever owns the capability (you, or a third party).
- **MCP host**: the app the user actually talks to (Claude Desktop, Cursor, your custom thing).
- **MCP client**: lives inside the host, talks to one server. There are N clients per host (one per server). People use "host" and "client" interchangeably. The right term is host. I will die on this hill.

**Build your own MCP server**. It's the single most useful exercise in this entire roadmap because it forces you to think about *what* an LLM can usefully do with *what* tools.

Some ideas:

- Wrap your favorite API as MCP tools (Notion, Linear, your home assistant, whatever)
- Build a RAG MCP server (I did this: [mcp-local-rag](https://github.com/nkapila6/mcp-local-rag), 120+ stars, runs locally, no APIs)
- Build something silly (I also did this: [mcp-meme-sticky](https://github.com/nkapila6/mcp-meme-sticky), generates memes and stickers)
- Wrap a hardware protocol (also did this: [mcp-helvarnet](https://github.com/nkapila6/mcp-helvarnet) controls Helvar lighting routers over their binary TCP protocol. Lighting + LLMs is unreasonably fun.)

**Resources**:

- [Official MCP docs](https://modelcontextprotocol.io/)
- [MCP Python SDK](https://github.com/modelcontextprotocol/python-sdk)
- [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
- The actual [MCP spec](https://spec.modelcontextprotocol.io/). Read it. It's short.

> [!WARNING] MCP Is Moving Fast
> MCP is moving fast. The transport layer (stdio vs HTTP+SSE vs streamable HTTP) has been in flux. Pick stdio first, it's the simplest. Add HTTP transport when you actually need it.

### 3.4: Agents (the real meat)

An "agent" is just an LLM in a loop. The loop is:

```
while not done:
    response = llm(messages + tools)
    if response.has_tool_call():
        result = execute(response.tool_call)
        messages.append(result)
    else:
        return response
```

Yeah. That's it. Everything else (planning, memory, multi-agent, etc.) is variation on this theme.

Patterns to learn:

- **ReAct** ([paper](https://arxiv.org/abs/2210.03629)): reasoning + acting interleaved. Model thinks, then acts, then observes, repeat. This is the default agent loop pattern.
- **Plan-and-execute**: model writes a plan first, then executes step by step. Good for multi-step tasks. Bad when the plan needs to adapt mid-execution.
- **Reflexion** ([paper](https://arxiv.org/abs/2303.11366)): agent reflects on its own failures and retries. Surprisingly effective.
- **Tool-use chains**: just plain old multi-step tool calls. No fancy patterns. Often works fine.

**Frameworks** (pick one, don't try to learn all four):

- [LangGraph](https://langchain-ai.github.io/langgraph/): explicit state machine, my favorite for production
- [LlamaIndex](https://www.llamaindex.ai/): good for RAG-heavy stuff
- [Pydantic AI](https://ai.pydantic.dev/): typed and clean
- [Anthropic's Claude Agent SDK](https://docs.claude.com/en/api/agent-sdk): focused, opinionated

Or skip frameworks entirely. Honestly, for a single-agent ReAct loop with 3-4 tools, a `while` loop and 100 lines of Python beats most frameworks. Reach for a framework when you have actual complexity: branching workflows, state persistence, human-in-the-loop checkpoints.

**What to actually build**:

1. A ReAct agent over an MCP server you wrote. Pick a real task (e.g. "find me the cheapest flight to Tokyo next month" or "summarize my unread emails"). Watch it fail in interesting ways. Fix the failures.
2. A multi-step research agent: takes a question, searches the web, reads pages, synthesizes an answer. This is what Perplexity is. You can build a worse version of it in an afternoon.
3. A coding agent: give it shell access (sandboxed!) and ask it to write tests, run them, fix the code. This is what Cursor/Claude Code/Codex are doing.

**Resources**:

- [Anthropic: Building Effective Agents](https://www.anthropic.com/research/building-effective-agents) (the best practical writeup that exists)
- [Lilian Weng: LLM Powered Autonomous Agents](https://lilianweng.github.io/posts/2023-06-23-agent/)
- [Eugene Yan's blog](https://eugeneyan.com/writing/) on LLM patterns

### 3.5: The stuff nobody warns you about

- **Evals**: how do you know your agent is good? Not "vibes". Real evals. [Inspect](https://inspect.aisi.org.uk/) and [Braintrust](https://www.braintrust.dev/) are good starts.
- **Cost**: agents call LLMs in loops. Loops are expensive. Track tokens like your wallet depends on it. Because it does.
- **Latency**: every tool call is a round trip. Stack them serially and the user waits 30 seconds. Parallelize aggressively.
- **Prompt injection**: when an agent reads untrusted content (web pages, emails, PDFs), that content can hijack the agent. This is a real problem and there is no clean fix yet. [Simon Willison writes about this](https://simonwillison.net/tags/prompt-injection/) more than anyone.
- **Determinism**: you don't have it. Same input, different outputs. Plan accordingly.

## Closing thoughts

A few honest takes after a couple of years of grinding through this:

- **The fundamentals compound**. The 6 months I spent doing things from scratch in NumPy felt slow at the time. They were not slow in hindsight. They are why I can read a paper and immediately know if the trick is real or just a re-skin of something old.
- **Don't stop at notebooks**. The thing that separates "I learned ML" from "I do ML" is shipping something. A blog post, a GitHub repo, an MCP server, a Twitter demo, a hackathon project ([Small Talk](https://nkapila.me/posts/small-talk) was mine, it was unreasonably fun). Anything. Just ship.
- **Agents are not magic**. They're loops with tool calls. The magic is in the LLM, which you now understand. You're allowed to demystify the rest.
- **The bar is being raised every 3 months**. What was a "wow" demo in Jan 2024 is a tutorial today. Don't measure yourself against last year's benchmarks. Build for what's next.

If you're 6 months into this and feeling like you don't know enough: that feeling never fully goes away. The space is too big. Pick something to be good at, ship it, and let the rest be ambient knowledge.

Also: if any of this was helpful, hit me up. I'm always happy to talk shop. Especially if you've built something weird.

## Changelog

- [28.06.2026] Init.

---

> "How deep is your model, can it go any deeper?"
>
> *(from my [CS7643 review](https://nkapila.me/masters/cs7643-review). Still my favorite line I've written about deep learning.)*
