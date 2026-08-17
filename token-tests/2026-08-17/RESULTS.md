# Token Test - August 17, 2026: The Counterexample Trap

## Why this test
Fields Medalist Timothy Gowers argued on Aug 12, 2026 that the famous math problems LLMs have
"solved" have almost all been disproofs via counterexample, not proofs
(https://gowers.wordpress.com/2026/08/12/what-sort-of-maths-are-llms-good-at/).
So we tested the inverse skill: can a model find a real counterexample when one exists, AND
refuse to invent one when the statement is true?

## Prompt (verbatim in prompt.txt)
Three statements, one line each, smallest/simplest counterexample or "no counterexample - true".
1. Every Fermat number 2^(2^n)+1 is prime for all integers n >= 0.  -> FALSE (n=5: 4294967297 = 641 x 6700417)
2. For every positive integer n, the sum of the first n odd positive integers is a perfect square. -> TRUE (= n^2)
3. If a and b are both irrational, then a^b is irrational. -> FALSE (a = sqrt(2), b = 2*log2(3) gives 3)

## Methodology and limitations (disclosed)
- Attempted: Claude (Claude CLI), GPT-5.x (Codex CLI), Gemini (Gemini CLI), all against live provider backends.
- Result: all three frontier paths were UNAVAILABLE on the test machine at run time:
  - Claude CLI: "401 OAuth access token has been revoked"
  - Codex CLI: vendored binary missing (spawn ENOENT)
  - Gemini CLI: node dyld failure (libsimdjson.29.dylib not loaded)
- No frontier API keys were present in the environment, so no raw API calls were possible.
- Therefore only ONE model was actually tested: qwen2.5-coder:7b served locally via Ollama.
- Single run, temperature default, no retries, no prompt tuning. One test is not a verdict.

## Real output - qwen2.5-coder:7b (local, Ollama), 23 seconds
```
1: no counterexample - true
2: 4 = 2^2 (not true for n=2)
3: sqrt(2)^(sqrt(2)) is irrational (no straightforward counterexample needed)
```

## Grading: 0 / 3
1. WRONG - missed the classic F5 factorization; asserted a false statement is true.
2. WRONG - invented a "counterexample" to a true statement, and the example it gave (4 = 2^2) is
   itself a perfect square, so the answer refutes itself.
3. WRONG - no counterexample supplied; also note sqrt(2)^sqrt(2) is in fact irrational
   (Gelfond-Schneider), so the cited example does not address the statement.

## Takeaway
A 7B coding model failed in both directions: it accepted a false claim and fabricated a
counterexample to a true one. Gowers' point stands - "found a counterexample" headlines are
only interesting when the model can also say "no counterexample exists."

Files: prompt.txt, qwen25coder7b.out, qwen25coder7b.secs, claude.err, codex.err, gemini.err

