---
title: "Preparing a sales meeting: the one-page brief"
description: "What to have in front of you before you walk in, the prompt that generates it, and why a model with no access to your inbox writes a brief that looks exactly as good and is invented."
pubDate: 2026-09-21
lang: en
slug: preparing-a-sales-meeting
altSlug: preparer-un-rendez-vous-commercial
tagline: "Field note"
readingTime: "8 min"
---

1:52pm. You are parked outside their offices. You open their website on your phone, skim the About page, dig through your inbox for the name of the person you are about to meet. At 2:00 you walk in, and the first twelve minutes of the meeting go to rebuilding what you already knew three months ago.

This is not carelessness. It is arithmetic. Preparing a meeting properly takes forty minutes; you have three meetings a week; and those forty minutes always compete with something that has a deadline attached. Preparation loses every time, and nobody inside the company notices — only the person across the table does.

## Two jobs, not one

"Preparing" covers two tasks that have nothing to do with each other.

The first is retrieval. Who you are meeting, what you last said to each other, the quote from February that was never answered, the unpaid invoice you would rather know about before they raise it, the acquisition announced last month in the local press. It is tedious, it is slow, and none of it asks for your judgement. The information already exists — it is simply spread across six places.

The second is a decision. What do you want out of the next hour? What is the next step you are aiming for, with a date on it? What will you not concede today? Nobody can make that call for you, and it takes five minutes.

So the problem is not that people prepare badly. It is that the thankless half absorbs all the available time, and the decision — the only part that actually requires you — ends up being made in the car park.

## What belongs on the brief

One page. Not three. If it does not fit on a page you will not reread it, and a brief you do not reread does not exist.

**Who you are meeting.** Name, exact role, how long they have been there. And the question that matters more than the other three: does this person sign, or will they carry your case to somebody else? That is not the same meeting, and it is not the same document you leave behind when you go.

**Your shared history.** Date and subject of the last exchange. What you promised that never went out. What they asked for that you never sent. The quote, its amount, what became of it. Nothing costs more, mid-meeting, than discovering a forgotten promise by hearing it from the other side of the table.

**The company, and what has moved.** Headcount, activity, and what has changed in the last six months: a hire, a move, a new site, filed accounts, a change at the top. Three lines is enough. You are not after a portrait, you are after the fact that explains why they are seeing you now.

**The trigger.** Why this meeting, today. Sometimes it is spelled out in their own request. Often it has to be inferred from a job posting or a tender they lost. When you cannot find it, you have your opening question.

**Three questions.** Not a script: three questions only you can ask, because you know the trade and you have seen the same problem elsewhere. A good question is worth ten arguments, and it has the advantage of making the other person talk.

**The next step.** Written before you walk in, with a verb and a date. "We'll stay in touch" is not a next step.

## The material is already written down

Here is the point: almost everything above already exists in writing, inside your own company, today.

- your inbox — the thread of the relationship, in order, with dates;
- your quotes and invoices — what was proposed, at what price, what was paid;
- your CRM, or the spreadsheet standing in for one;
- the notes from the last meeting, if anyone wrote them;
- their website, their job listings, their public filings.

There is nothing to invent. The work is to look in six places and come back with one page. That is exactly the shape of task you can hand to a machine: it repeats, the material is written, and a human reads it before any of it is used.

| The work | Who does it |
| --- | --- |
| Find the email thread and put it back in order | The machine |
| Pull the quote, the amounts, what was left open | The machine |
| Read the site, the listings, the filed accounts | The machine |
| Bring it back on one page, in the same format every time | The machine |
| Decide what the next hour is for | You |
| Set the price, and what you will not give up | You |
| Choose the three questions | You |
| Read the brief before you walk in | You |

The right-hand column never empties. That column is the meeting.

## The brief is generated — and the model has to see your data

One point before the prompt, because it decides everything else: the brief has to be **generated**, not written. If you type it up yourself from what the AI tells you, you have gained nothing — you have moved the forty minutes.

And for it to be generated, **the model has to have access to your data**. That is not an implementation detail, it is the condition. An assistant wired into your inbox, your quotes and your CRM comes back with the real thread, with the dates and the amounts on it. The same assistant with no access will produce exactly the same document, just as well written and just as confident — except it will have invented it from the company name. The two briefs look alike. Only one of them is true.

> **The trap** — asking for a brief from a tool that can see nothing of yours. It will not refuse. It will produce a plausible page about a company it does not know, and you will walk into the meeting holding it.

In practice that means four accesses: the mailbox of the person selling, the folder where quotes and invoices live, the CRM or the spreadsheet standing in for one, and a web search for the public pages. What is not reachable does not exist: if nobody ever wrote up the last meeting, no tool will recover it.

It is also a company decision rather than a setting: you are giving a tool access to your client threads. Where that data goes, who hosts it, whether it trains a model. The question comes up front, once, and gets settled once.

## The prompt

Adapt it, then reuse it as-is before every meeting.

> Prepare a one-page brief for my meeting on [date, time] with [first name last name], [role] at [company].
>
> Search: my inbox (the whole thread with this contact and with the [company.com] domain), my quotes and invoices for this client, [my CRM or tracking spreadsheet], and their public pages — website, job listings, filed accounts.
>
> Structure the brief in six blocks, in this order: who I am meeting (role, time in post, and whether this person signs or carries the case to somebody else); our shared history (last exchange with its date, quote and amount, what I promised that never went out, any unpaid invoices); the company and what has moved in the last six months; the likely trigger for this meeting; three questions to ask; the next step to obtain, with a date.
>
> Rules: one page maximum. For every fact, cite your source — email subject and date, quote number, link. Amounts and dates are copied, never estimated. Separate what you read from what you inferred. If you cannot find something, write "not found": invent nothing.

That last paragraph does most of the work. Without it you get a piece of text; with it you get a verifiable document, where every line points back to an email you can reopen. It is what makes the two-minute reread before you walk in possible at all.

## What preparation is not

It is not a script. A meeting rehearsed word for word can be heard as one, and it turns a conversation into a presentation — at which point you learn very little about the people who asked you to come.

Nor is it a twelve-slide deck. The document you prepare is for you, before you walk in. What you leave behind is a different object: shorter, and written for the person who was not in the room and who will have to say yes.

## A wrong brief is worse than no brief

This is the rule that makes everything else safe. A brief takes two minutes to reread, and three things always get checked: your contact's name and role — people change jobs and public pages go stale; the figures — an approximate amount quoted out loud costs you your credibility for the rest of the hour; and the date of the last exchange.

One simple rule for the meeting itself: never state a fact whose source you have not seen. A brief prepares you; it does not testify for you. The careful phrasing exists and costs nothing — "I gather you opened a second site, is that right?" wins you the same ground without the risk.

## Preparing the next meeting starts on the way out

The best brief is the one fed by a debrief. Ten minutes after you leave — in the car, dictated out loud if that is faster than typing — three things: what was said, what you promised and by when, what they promised. It goes into the follow-up, and in three months it becomes the second line of the next brief.

The companies that prepare well are not the ones that prepare at length. They are the ones that write things down afterwards.

## What changes

The meeting starts at minute one instead of minute twelve. You no longer spend your opening rebuilding a history you already owned; you spend it asking the question that could not have been prepared.

It is a modest improvement, and that is exactly why it works: nothing irreversible, nothing to reorganise, a human keeping their hand on everything that leaves the building. It is also three meetings a week, forty minutes each, all year.
