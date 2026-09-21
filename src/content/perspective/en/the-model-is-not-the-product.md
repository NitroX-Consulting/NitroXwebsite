---
title: "The model is not the product"
description: "Choosing a model is a decision you revisit every month; choosing the harness commits you for five years. Three decisions to make at the start of an AI project."
pubDate: 2026-08-30
lang: en
slug: the-model-is-not-the-product
altSlug: le-modele-nest-pas-le-produit
tagline: "Framing note"
readingTime: "6 min"
---

Every company we meet opens with the same question: **which model should we pick?** GPT or Claude, Mistral or Gemini, the three-euro tier or the thirty-euro one. It is the most visible question, the most discussed — and it is the wrong one.

A model is an engine: powerful, replaceable, and already dated by the time you sign. What decides whether an AI project succeeds is the layer you build around it.

## The engine and the car

A raw model knows nothing about your customers, your procedures or your rules. It remembers nothing, has access to nothing, and can do nothing but produce text. Everything that turns it into a colleague is what you put around it: memory of what has already been done, the tools it can operate, the documents it is allowed to read, and the guardrails that stop it before it does something foolish.

That surrounding layer has a name: the **harness**. The model is the engine; the harness is the car. The chassis, the steering, the brakes, the seatbelts, the dashboard. An engine on its own takes you nowhere, and **nobody buys a bare engine**.

It is an image, but it has a very concrete consequence: in an AI project, the component everyone argues about is the smallest, the shortest-lived, and the only one a vendor can take away from you overnight. The rest is what you build — or what you inherit without choosing it.

Three decisions, made at the very start, determine what your AI will cost you each month, what it will expose of your internal documents, and whether you stay free to change your mind.

## 1. Do not tie your business to a vendor

Models are replaced constantly. Prices move, terms of use change, hosting regions shift, and a vendor can deprecate the version you built everything on with a few months' notice.

Your processes, your business rules and your connectors therefore have to live in your own layer, not inside the model. Built well, swapping engines is a one-day decision. Built badly, it is a project.

> **The risk if you ignore it** — every model change becomes an IT programme again, and your negotiating power drops to zero: your vendor knows perfectly well that you cannot leave.

## 2. Match the power to the need

You do not take the motorway to fetch a loaf of bread.

Sorting an email, pulling a date out of a document, rewording a paragraph: a small model is more than enough. It costs an order of magnitude less and answers instantly. Analysing a contract, preparing a negotiation, summarising six months of correspondence: that is when you bring out the large model, and it earns its price.

Routing each task automatically to the right engine is what separates an AI that three people try from an AI the whole company uses every day. It is an economic question, not a technical one: across a hundred employees and several thousand requests a month, the gap stops being a rounding error on an invoice.

> **The risk if you ignore it** — you pay contract-analysis rates to sort email, and the invoice kills the project before the habit ever forms.

## 3. An AI must see only what its user sees

This is the most important decision, and the one most often made by default.

An AI has no permissions of its own. It borrows those of the person it serves, and loses them when that person does. No more, no less. That is the whole difference between a personal assistant and an internal search engine that copied your SharePoint into a single index, flattening everyone's permissions on the way in.

One example settles it: **accounting must not see the HR SharePoint — and HR must not see accounting's.** This is not about hierarchy, it is a wall, and it has to hold in both directions. If one person's assistant can answer questions about the other's files, the wall is gone, whatever the stated intentions.

### How it actually works

On Microsoft 365, the right architecture fits in one sentence: **Microsoft decides, not us.**

Each employee authorises their assistant from their own account. Every file read then goes to Microsoft Graph *on their behalf*: Microsoft checks the permissions, document by document, exactly as it does when they open the file themselves. No permission rule is reimplemented on our side — so none can be reimplemented wrongly.

In our own product, that translates into deliberately narrow permissions your IT lead can verify on the consent screen:

- **Personal OneDrive** — read and write. Their files, their space.
- **SharePoint and shared files** — read only. Write access to shared spaces was never requested.
- **Delete, share, move** — never. These actions are not exposed to the assistant, whatever the employee's own permissions allow.
- **Mail** — read and draft. Automatic sending does not exist: a human always clicks Send.
- **Shared mailboxes and calendars** — reachable only where an administrator has delegated access in Microsoft 365.
- **Revoking an access** — immediate. Nothing was copied, so no copy survives the revocation.

Your documents are not duplicated anywhere. There is no shared index where OneDrive and SharePoint were copied to make them "searchable": each file is read on demand, at the moment of the question, with the employee's own credentials.

### What this does not do

Let us be clear, because plenty of vendors promise otherwise: **if a SharePoint folder is over-shared today, the assistant will see it — because the employee already can.**

A well-built AI never widens the perimeter. But it does not repair a badly configured share: it makes it visible, often very quickly. That is an excellent reason to start with a sharing audit, and reason enough to distrust any vendor who tells you their tool will fix the problem for you.

> **The risk if you ignore it** — the first employee who asks "what is the salary grid?" gets the document. Once is enough.

## Four questions, five minutes

You do not need to be an engineer to assess an AI proposal. Put these four questions to your IT lead or your vendor, and listen to the shape of the answer.

**1. Can accounting query the HR SharePoint? And HR, accounting's?**
The only good answer is "no, in both directions, and for the same reason as today without AI". If the wall rests on an instruction given to the model rather than on Microsoft permissions, it will fall the day someone phrases their question well.

**2. If our vendor doubles its prices tomorrow, how many days to switch?**
An answer in weeks or months tells you the business logic is written inside the model.

**3. Which model handles email sorting, and what does it cost next to a contract analysis?**
If there is only one model for everything, you are overpaying for every simple task, every day.

**4. If I remove someone's access to a SharePoint site tonight, what does their assistant see tomorrow morning?**
The right answer is "exactly what they see, so nothing". If the answer mentions a reindexing job, a copy of your documents lives somewhere else.

## In short

Choosing a model is a decision you revisit every month. Choosing the harness is a five-year decision: it sets who sees what, what each task costs you, and whether you keep control.

Have the argument there.
