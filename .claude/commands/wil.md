---
description: What's-Left — auto-triage the Inbox (assign Bxx + promote to Open), reprime, then surface outstanding work (EVO + B#)
argument-hint: [github-issues] [repo-docs]
---

# /wil — What Is Left (reprime + outstanding work)

**Input**: $ARGUMENTS

> **Note on `/clear`:** a slash command cannot run `/clear` itself — `/clear` wipes the
> conversation this command is running inside, so it can't be chained here. For a truly
> fresh context, type `/clear` first, then `/wil`. Running `/wil` on its own still works;
> it just reprimes on top of the current context.

## Process

### Step 0 — Sync

Run `git pull` first so the reprime and the outstanding-work read reflect the latest
`main` (another session may have merged PRs / updated `TASK.md` / `PLANNING.md` since this
checkout last synced). If the pull fails (local changes, conflicts, detached state), report
what it printed and continue with the current checkout rather than forcing it.

### Step 0.5 — Auto-triage the Inbox (assign Bxx + promote to Open)

**Fully automatic** (operator choice 2026-07-06): after the sync, number every eligible
`## Inbox` task and move it into `## Open`, then land it as a docs PR — **no prompt**.

An Inbox bullet is **eligible** only if it is **all** of:
- **unchecked** (`- [ ]`) — skip `[x]` done items; they are not open work, leave them in
  place for later archival, and
- **not already prefixed** with a `Bxx` number, and
- **not tagged `(no-triage)`** — the explicit opt-out for deferred *ideas* the operator wants
  parked un-numbered (e.g. "not scheduled" design spikes).

If **nothing is eligible**, skip this entire step — no branch, no PR — and go to Prime.

Otherwise, work in a **fresh per-task worktree** (`<repo>-wt-wil-triage` off `origin/main`,
per the work-in-worktree rule), never the primary checkout:

1. Compute `next = max(Bxx across TASK.md + TASK-archive.md) + 1`.
2. In **document order**, for each eligible bullet: rewrite its bold lead
   `**<slug>** ·` → `**B<next> · <slug>** ·`, then increment `next`, and move the whole
   bullet (body intact) to the **top of `## Open`** (where the newest numbered tasks live).
3. Before committing, `git pull --rebase origin main` and **recompute `max`**. If it grew (a
   parallel session numbered in between), **renumber your items from the new max** — a Bxx
   must never collide with an existing one.
4. Commit (`docs(task): triage Inbox → B<lo>–B<hi>`), push, `gh pr create`, then
   **squash-merge immediately** — this is a docs-only TASK.md change, allowed to merge without
   waiting for Gemini per the PR-first doc carve-out. **Never `gh pr merge --auto`.** If the
   merge **conflicts** (a concurrent triage won the race), re-pull, renumber from the new max,
   repush, and merge again.
5. Remove the worktree + delete the branch (local and remote).

Then `git pull` the primary checkout so Prime/What's-Left read the post-triage `TASK.md`, and
list the assignments (`slug → Bxx`) at the top of the final report.

### Step 1 — Prime

Run the full priming process from the `/prime` command (`~/.claude/commands/prime.md`),
passing `$ARGUMENTS` through as its arguments. Adapt to whatever this repo actually is —
the prime template's example paths (`src/features/polls/`, `CODEBASE-GUIDE.md`) may not
exist here; read the real structure (`PLANNING.md`, `TASK.md`, `README.md`, top-level
tree, recent commits) instead of forcing the template's file list.

Produce the standard prime summary (Project Purpose, Tech Stack, Data Model, Key Patterns,
Current State).

### Step 2 — What's Left

After priming, report outstanding work, **EVO items first, then B# tasks** (strategic view
before tactical). Pull from:

- **`PLANNING.md`** — "Pending Evolutions" (EVO-*), their status and any blockers.
- **`TASK.md`** — the "Open" section: unchecked `[ ]` items, plus `[x]` items still carrying
  follow-up/deploy notes. Flag anything gated (awaiting Microsoft/Google approval, awaiting
  operator go-ahead, awaiting deploy).
- **`TASK-archive.md`** — only if an open item references an archived thread for context.

Present it as a scannable list:

```
## What's left

### EVO roadmap
- EVO-0xx — <one line> — <status / blocker>

### B# tasks (Open)
- B### — <one line> — <status: in progress / blocked-on-X / ready / awaiting-deploy>
```

Keep each line to one sentence. Call out explicitly anything **blocked on an external party**
(Microsoft AppSource, Google verification) versus **blocked on us** versus **ready to pick up**.
End with a one-line suggestion of the most sensible next task to pick up, and stop — don't start
work without a go-ahead.
