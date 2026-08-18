# Token Test - August 18, 2026: What does 750 tokens/second actually mean?

## Why this test
On Aug 13, 2026 OpenAI previewed **Ultrafast mode**, a new API service tier that it says runs
GPT-5.6 Sol "up to 14X the speed," powered by Cerebras, at "up to 750 output tokens per second."
(Source: https://openai.com/index/previewing-ultrafast - OpenAI's own announcement.)

750 tok/s is an abstract number. So we measured a real, local baseline on this machine to give it scale.

## What we actually ran
Three prompts (short / medium / code) against **qwen2.5-coder:7b served locally by Ollama**,
via raw HTTP POST to http://localhost:11434/api/generate with stream=false.
Throughput is taken from Ollama's own returned counters: eval_count / eval_duration.
Hardware: Apple Silicon MacBook Pro. Single run per prompt, default temperature, no retries.

Prompts:
1. short - "Write one sentence explaining what an API rate limit is."
2. medium - "Write a 150-word explanation of why inference speed matters more than raw model quality for real-time agent workloads."
3. code - "Write a Python function that retries an HTTP request with exponential backoff. Code only."

## Measured results (real output, not estimates)

| Prompt | Input tokens | Output tokens | Generation seconds | Output tokens/sec |
|---|---|---|---|---|
| short | 40 | 24 | 0.80 | **29.9** |
| medium | 54 | 118 | 4.09 | **28.8** |
| code | 46 | 268 | 9.33 | **28.7** |

**Measured average: 29.1 output tokens/sec.**

## The comparison

- Measured here (local 7B on a laptop): **29.1 tok/s** - verified by us.
- Claimed by OpenAI for Ultrafast (GPT-5.6 Sol on Cerebras): **up to 750 tok/s** - company claim, not independently verified by us.
- Ratio: roughly **26x**.

## Methodology and limitations (disclosed)
- We could NOT test any frontier model directly today. All three frontier paths on this machine failed:
  - Claude CLI: "401 OAuth access token has been revoked"
  - Codex CLI: vendored binary missing (spawn ENOENT)
  - Gemini CLI: node dyld failure (libsimdjson.29.dylib not loaded)
  - No frontier API keys are present in the environment, so no direct API calls were possible.
- Therefore the 750 tok/s figure is reported strictly as OpenAI's claim. We did not reproduce it.
- The local number is a real measurement but is one machine, one 7B model, one run per prompt.
- A laptop-class 7B model and a hosted frontier model on Cerebras hardware are not the same product.
  This is a scale reference, not a quality benchmark.

Files in this folder: prompts above, raw-ollama-results.json, short.out, medium.out, code.out
