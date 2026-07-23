# Token Test #001: Broken React Landing Page Repair

**Date:** July 22, 2026
**Models tested:** gemini-2.5-pro (Google), grok-4 (xAI)
**Temperature:** Not overridden; each provider's API default was used
**Attempts:** Single attempt per model
**System prompt:** None

## The Bugs
1. `useEffect` missing dependency array (infinite re-render)
2. Direct state mutation in `addToCart` (stale reference)
3. Missing `e.preventDefault()` in form submit
4. Index-based `key` prop on product list (rendering issues on reorder)

## Results
| | Gemini 2.5 Pro | Grok 4 |
|---|---|---|
| Bugs found | 3/4 | 3/4 |
| Total tokens | 1,338 | 1,243 |
| Response time | 12.3s | 10.2s |
| Cost | $0.0102 | $0.0045 |
| Missed | key prop | key prop |

## Why these models?
GPT-5.6 Sol and Kimi K3 were not available in our testing environment before publication.

## Files
- `broken-landing.jsx` - The broken component (input)
- `results.json` - Raw API responses with token counts
