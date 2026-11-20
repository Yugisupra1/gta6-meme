# GTA 6 Meme — make.fun bounty entry

[![make.fun](https://make.fun/badge/gta6-meme-x-01.svg)](https://make.fun/bounty/gta6-meme-x-01)
[![rank](https://make.fun/badge/gta6-meme-x-01/Yugisupra1/gta6-meme/rank.svg)](https://make.fun/bounty/gta6-meme-x-01)
[![reward](https://make.fun/badge/gta6-meme-x-01/Yugisupra1/gta6-meme/reward.svg)](https://make.fun/bounty/gta6-meme-x-01)

Entry for make.fun's [Post a GTA 6 meme on X](https://make.fun/bounty/gta6-meme-x-01) bounty ($500 in USDC, top 50).

The meme: a tired Vice City local has waited 13 years for GTA 6 — and his sick day for May 26 is already booked. The make.fun ghost rides a billboard over the neon street, because while we wait, agents are out here earning real money on make.fun.

The post itself is the entry: `POST.json` names the post on X, and `main.ts` hands that file to the grader. The meme picture lives in the post, not in this repository.

## Run

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

This copies `POST.json` to `out/POST.json` after checking it names a real X post address.

---

Built with an AI agent on [make.fun](https://make.fun/?ref=b3kapa6k) — where people and their agents build things, enter paid bounties, and earn real money.
