---
description: Execute an implementation plan with validation loops
argument-hint: <path/to/plan.md>
---

# Implement Plan

**Plan**: $ARGUMENTS

## Your Mission

Execute the plan end-to-end with rigorous self-validation.

**Core Philosophy**: Validation loops catch mistakes early. Run checks after every change. Fix issues immediately.

**Golden Rule**: If validation fails, fix it before moving on. Never accumulate broken state.

---

## Phase 1: LOAD

### Read the Plan

Load the plan file and extract:

- **Summary** - What we're building
- **Patterns to Mirror** - Code to copy from
- **Files to Change** - CREATE/UPDATE list
- **Tasks** - Implementation order
- **Validation Commands** - How to verify
- **GitHub Issue** - Check the plan's Metadata table for a GitHub Issue number (e.g., `#5`). If present, this issue will be updated after implementation is complete.

**If plan not found:**
```
Error: Plan not found at $ARGUMENTS
Create a plan first: /plan "feature description"
```

---

## Phase 2: PREPARE

### Work in an isolated git worktree (never the main checkout)

Implementation ALWAYS runs in a **dedicated git worktree** so it never collides
with the main checkout or a parallel session.

```bash
git rev-parse --show-toplevel    # REPO root
git worktree list                # is there already a worktree for this work?
git branch --show-current
```

| State | Action |
|-------|--------|
| Already inside a worktree for this plan / on the right feature branch | Use it — skip creation |
| A project convention designates a worktree dir (a `CLAUDE.md`/memory note, or an existing `<repo>-wt-*`) | Create/checkout the feature branch **there** and `cd` into it |
| Otherwise | Create a fresh per-plan worktree (below) |

**Create the worktree** (`{plan-name}` = kebab-case from the plan file):

```bash
REPO=$(git rev-parse --show-toplevel)
BRANCH="feature/{plan-name}"
WT="$(dirname "$REPO")/$(basename "$REPO")-wt-{plan-name}"
git fetch origin --quiet 2>/dev/null || true
git worktree add -b "$BRANCH" "$WT"           # branch exists already? → git worktree add "$WT" "$BRANCH"
cd "$WT"
```

- A worktree is independent of the main checkout, so a dirty main checkout does
  NOT block you. Only commit/stash first if the plan depends on those changes.
- **Run every subsequent phase from inside `$WT`** — reads, edits, build, tests,
  and the PR all happen there, against the worktree's files and the project's
  own toolchain/venv (not a global one).
- Record `$WT` + `$BRANCH` in the report so the worktree can be removed after the
  PR merges: `git worktree remove "$WT"`.

---

## Phase 3: EXECUTE

**For each task in the plan:**

### 3.1 Verify Assumptions

Before writing any code for a task:

- **Read the target file** you're about to create or modify
- **Read adjacent files** — files it imports from, and files that import it
- **Verify the plan's references** — do the functions, interfaces, tables, or endpoints the plan mentions actually exist? Do they match the plan's expectations?
- **If assumptions are wrong**, adapt your approach before implementing. Document what differs from the plan.

### 3.2 Implement

- Read the **MIRROR** file reference and understand the pattern to follow
- Make the change as specified in the plan
- **Check integration**: verify your change connects correctly to adjacent code — do imports resolve? Do callers/callees still work? Does the data flow correctly across boundaries?

### 3.3 Validate Immediately

**After EVERY task:**

```bash
pnpm run build
```

**If it fails:**
1. Read the error
2. Fix the issue
3. Re-run validation
4. Only proceed when passing

### 3.4 Track Progress

```
Task 1: CREATE src/x.ts ✅
Task 2: UPDATE src/y.ts ✅
```

**If you deviate from the plan**, document what changed and why.

---

## Phase 4: VALIDATE

### Run All Checks

```bash
# Type check
pnpm run build

# Lint
pnpm run lint

# Tests
pnpm test
```

**All must pass with zero errors.**

### Write Tests

You MUST write tests for new code:
- Every new function needs at least one test
- Error cases and edge cases need tests
- Update existing tests if behavior changed
- **Test across boundaries** — don't just test functions in isolation. If you added an API endpoint, test that the endpoint returns the correct response shape and data. If you added a service method, test that it integrates correctly with its callers.

**If tests fail:**
1. Determine: bug in implementation or test?
2. Fix the actual issue
3. Re-run until green

### REQUIRED: End-to-End Verification

> **⚠️ Do NOT proceed to Phase 5 (Report) until all E2E steps below pass.**

Re-read the plan and find the end-to-end testing section. Execute every E2E test listed in the plan as a checklist:

- [ ] Start the application (dev servers, databases, etc.)
- [ ] For EACH end-to-end test in the plan:
  - [ ] Execute the test exactly as described
  - [ ] Verify the expected outcome matches the plan
  - [ ] If it fails: fix the issue, re-run, confirm it passes
- [ ] Confirm all E2E tests pass before proceeding

**If the plan has no E2E tests**, perform a basic smoke test: start the app, exercise the new/changed feature manually, verify it works.

**This is a hard gate.** You cannot report the implementation as complete until E2E verification passes. Static checks and unit tests alone are never sufficient.

---

## Phase 5: REPORT

### Create Report

**Output path**: `.agents/reports/{plan-name}-report.md`

```bash
mkdir -p .agents/reports
```

```markdown
# Implementation Report

**Plan**: `{plan-path}`
**Branch**: `{branch-name}`
**Worktree**: `{worktree-path}`
**Status**: COMPLETE

## Summary

{Brief description of what was implemented}

## Tasks Completed

| # | Task | File | Status |
|---|------|------|--------|
| 1 | {description} | `src/x.ts` | ✅ |
| 2 | {description} | `src/y.ts` | ✅ |

## Validation Results

| Check | Result |
|-------|--------|
| Type check | ✅ |
| Lint | ✅ |
| Tests | ✅ ({N} passed) |

## Files Changed

| File | Action | Lines |
|------|--------|-------|
| `src/x.ts` | CREATE | +{N} |
| `src/y.ts` | UPDATE | +{N}/-{M} |

## Deviations from Plan

{List any deviations with rationale, or "None"}

## Tests Written

| Test File | Test Cases |
|-----------|------------|
| `src/x.test.ts` | {list} |
```

### Archive Plan

```bash
mkdir -p .agents/plans/completed
mv $ARGUMENTS .agents/plans/completed/
```

---

## Phase 6: UPDATE GITHUB ISSUE (if issue specified in plan)

**This phase is mandatory if the plan's Metadata table contains a GitHub Issue number.** Skip only if the GitHub Issue field is "N/A" or absent. No MCP server is required — use the `gh` CLI. `gh` acts on the current repo by default; append `--repo owner/name` if the plan targets a different repo.

### 6.1 Read the Current Issue State

Run `gh issue view <number> --json title,body,labels,milestone,comments` to see the issue's current state and labels before changing anything.

### 6.2 Reflect Progress with Labels

GitHub issues have no status-transition workflow. Reflect progress with labels instead:
1. Ensure a status label exists (prefer `in-review`, fall back to `in-progress`): `gh label create in-review --force`
2. Apply it and remove any stale status label:
   ```bash
   gh issue edit <number> --add-label "in-review" --remove-label "in-progress"
   ```
3. If you intend to close the issue (no review state in your workflow), do so after the comment in 6.3 with `gh issue close <number>`.

### 6.3 Add Implementation Comment

```bash
gh issue comment <number> --body "<markdown summary>"
```
The comment body (markdown) should include:
- What was implemented
- Branch name
- Files created/updated (count)
- Tests written (count)
- Any deviations from the plan
- The implementation report file path

### 6.4 Update Issue Body (if needed)

If the implementation resulted in meaningful deviations from the original issue description, update the issue body:
```bash
gh issue edit <number> --body "<updated description, markdown>"
```

---

## Phase 7: OUTPUT

```markdown
## Implementation Complete

**Plan**: `{plan-path}`
**Branch**: `{branch-name}`
**Status**: ✅ Complete

### Validation

| Check | Result |
|-------|--------|
| Type check | ✅ |
| Lint | ✅ |
| Tests | ✅ |

### Files Changed

- {N} files created
- {M} files updated
- {K} tests written

### Deviations

{Summary or "Implementation matched the plan."}

### Artifacts

- Report: `.agents/reports/{name}-report.md`
- Plan archived: `.agents/plans/completed/`

### GitHub Issue

{If issue was updated: "Updated #{N}: applied label {label}, added implementation comment." Otherwise: "No GitHub issue linked."}

### Next Steps

1. Review the report
2. Create PR from the worktree: `gh pr create`
3. Merge when approved
4. After merge, remove the worktree: `git worktree remove {worktree-path}`
```

---

## Handling Failures

| Failure | Action |
|---------|--------|
| Type check fails | Read error, fix issue, re-run |
| Tests fail | Fix implementation or test, re-run |
| Lint fails | Run `pnpm run lint --fix`, then manual fixes |
| Build fails | Check error output, fix and re-run |
