---
description: Check the Gemini review on this session's last PR, address every comment, reply to any rejected ones, then merge (squash, never --auto).
argument-hint: "[PR number]  (defaults to the PR opened in this session, else the current branch's PR, else the most recent open PR)"
allowed-tools: Bash, Read, Edit, Write, Grep, Glob
---

# /gemini — resolve the Gemini review on the last PR and merge

**Input**: `$ARGUMENTS`

Global command — works in **any** repo that uses Gemini Code Assist for PR review. End-to-end:
find the PR, read Gemini's review, **fix every actionable comment**, reply on the thread to
anything you deliberately don't apply, push, then **merge**. Invoking this command is your
explicit authorization to merge the resolved PR.

> **Standing conventions this command MUST honor** (operator's global rules):
> - **Gemini reviews each PR ONCE, on open.** Address every comment from that one review,
>   then merge — do **not** wait for a re-review after your follow-up commits; it will not come.
> - **Never `gh pr merge --auto`.** If no required checks gate the branch, `--auto` merges
>   immediately and bypasses this whole flow. Always a direct squash-merge.
> - **Reply on GitHub to every review comment you reject** — the PR thread is canonical; a
>   commit message alone is not enough.
> - **Work in a git worktree**, never the primary checkout.

All `gh`/`git` commands run against the **current repo** by default. To target another, append
`--repo owner/name` to the `gh` calls.

---

## Step 0 — Resolve the target PR

If `$ARGUMENTS` contains a PR number, use it. Otherwise resolve in this order:
1. **The PR opened in this session.** You (Claude) created or worked on a PR earlier in *this
   conversation* — that is the default target. Its number is in your context; use it. This is
   the primary case `/gemini` is for: "check the PR I just opened."
2. Else the open PR for the **current branch**: `gh pr view --json number,headRefName,state 2>/dev/null`.
3. Else the **most recent open PR** authored by the operator:
   `gh pr list --state open --author "@me" --limit 1 --json number,title,headRefName,createdAt`.

If no PR was opened in this session and options 2–3 are ambiguous (multiple open PRs, none
matching the current branch), **ask the operator which PR** rather than guessing.

Print the chosen PR (number, title, branch) and confirm it's `OPEN`. If it's already
`MERGED`/`CLOSED`, stop and say so.

## Step 1 — Fetch the Gemini review

Gemini posts a **single review on open** — a top-level review body plus, when it has findings,
**inline review comments**. Fetch all three surfaces:

```bash
PR=<number>
REPO=$(gh repo view --json nameWithOwner -q .nameWithOwner)
# top-level review verdict(s)
gh api repos/$REPO/pulls/$PR/reviews --jq '.[] | "[\(.state)] \(.user.login): \(.body)"'
# inline review comments (the actionable findings)
gh api repos/$REPO/pulls/$PR/comments --jq '.[] | {id, path, line, body, in_reply_to_id}'
# issue-level comments (some bots post here)
gh api repos/$REPO/issues/$PR/comments --jq '.[] | "\(.user.login): \(.body)"'
```

**If nothing from Gemini has posted yet**, it is usually in-flight for a couple of minutes
after open. Poll with a bounded background wait (do **not** foreground-`sleep`):

```bash
until n=$(gh api repos/$REPO/pulls/$PR/reviews --jq 'length'); [ "${n:-0}" != "0" ]; do
  [ "${SECONDS:-0}" -gt 360 ] && { echo "TIMEOUT: no Gemini review after ~6min"; break; }
  sleep 20
done
```

Run that with `run_in_background: true` and act on the notification. If it times out with
**no** review, tell the operator and ask whether to merge anyway or keep waiting — don't
assume silence == approval.

## Step 2 — Triage the findings

List every Gemini comment with `path:line` and a one-line summary, and classify each:
- **Fix** — a real bug / correctness / security / clarity issue → apply it.
- **Reject** — wrong, out of scope, or already handled → will get a thread reply explaining why.

A **clean** review (review body present, zero inline comments — e.g. *"no feedback to
provide"*) means: skip to **Step 6** and merge.

## Step 3 — Fix in a worktree on the PR branch

Check out the PR's branch in a dedicated worktree (per the work-in-worktree rule). Derive the
worktree path from the repo root so this stays repo-agnostic:

```bash
BR=$(gh pr view $PR --json headRefName -q .headRefName)
ROOT=$(git rev-parse --show-toplevel)
WT="${ROOT}-wt-gemini-fix"
git fetch origin "$BR"
git worktree add "$WT" "$BR"
```

Apply each **Fix** there. Match surrounding code style. Keep edits scoped to what Gemini
raised — don't opportunistically refactor.

## Step 4 — Validate (only if code changed)

If you touched code, run the repo's checks before pushing (docs-only fixes can skip). Prefer,
in order: the project's `/validate` skill if one exists, else the test command from
`README`/`CONTRIBUTING`/`package.json`/`pyproject.toml`, scoped to the affected area. Fix
anything you broke before proceeding.

## Step 5 — Reply to rejected comments, then push

For **every** comment you did **not** apply, reply on its thread (this is required):

```bash
gh api repos/$REPO/pulls/$PR/comments/<COMMENT_ID>/replies -f body="<why not applied>"
```

Then commit and push the fixes to the **same** PR branch (from `$WT`):

```bash
git add -A
git commit -m "fix(review): address Gemini comments on #$PR

<one line per fix>
"
git push
```

Use the operator's usual commit trailer if the repo sets one. Do **not** wait for a Gemini
re-review — it only reviews once on open.

## Step 6 — Merge

Squash-merge and clean up. **Never `--auto`.**

```bash
gh pr merge $PR --squash --delete-branch
```

If the `--delete-branch` step errors because a worktree holds the branch, that's cosmetic —
the merge itself still lands; verify with `gh pr view $PR --json state,mergedAt`, then delete
the remote branch manually if needed (`git push origin --delete "$BR"`).

## Step 7 — Clean up

```bash
git worktree remove "$WT" --force
git branch -D "$BR" 2>/dev/null
git ls-remote --heads origin "$BR"   # expect empty
```

## Report

- PR # and title, and whether the review was **clean** or had **N comments**.
- For each comment: **fixed** (with the change) or **rejected** (with the reply posted).
- Validation result if code changed.
- Confirm **MERGED** + branch/worktree cleanup.
