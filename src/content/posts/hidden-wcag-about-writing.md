---
title: 📖 Wait, WCAG Covers Writing Too? A Guide to the Parts Everyone Misses
date: 2025-12-02
category: ux-writing
excerpt: WCAG has an entire layer of criteria that has nothing to do with choosing a color palette or building a focus area. It's about writing and how information is communicated. Read it here.
tags: [accessibility, wcag, ux-writing, writing, design-systems]
---

<div style="width:100%;height:0;padding-bottom:100%;position:relative;"><iframe src="https://giphy.com/embed/H7CKd1GO6oiZQo7L5d" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/computer-photoshop-adobe-H7CKd1GO6oiZQo7L5d">via GIPHY</a></p>

Ask your designer friends what WCAG is and you'll probably hear a familiar trio: Naruto, Sasuke, and Sakura.

Hehe, jk, the famous [WCAG](https://www.w3.org/WAI/standards-guidelines/wcag/) trio is color contrast, alt text, and keyboard focus. Maybe a mention of screen readers if you're lucky. But that trio is the only the surface layer, the most visible parts of accessibility.

I also just realized it after participating in several accessibility projects and discussing with experts.

*_shout out to [Rahma Utami](https://www.linkedin.com/in/rahmaut/) and [Michelle Neysa](https://www.linkedin.com/in/michelle-neysa-017486129/)_

Underneath, WCAG has an entire layer of criteria that has nothing to do with choosing a color palette or building a focus area. *It's about writing*.

It's about semantics, structure, clarity, predictability, and how information is communicated. The part nobody talks about. The part writers are supposed to own.

I've learned this the most challenged way through real projects and various enterprise design systems. And sometimes, I see talented designers and engineers confidently cite WCAG 2.1, while completely missing the half of the guidelines that shape the user experience before the user interacts with any button or screen—the words, the structure, and the information relationships.

Such an irony that people often frame accessibility as a "visual or technical" concern, when in reality so much of WCAG is fundamentally linguistic.

If design systems encode visual rules, WCAG encodes language rules. Okay, let's talk about the hidden WCAG—the writing-related criteria most teams overlooked.

## 1. Titles, Labels, and the Architecture of Meaning (2.4.2, 2.4.6)

Page titles and section labels are usually treated as an afterthought.

"Just call it Dashboard," someone says.

"Just use 'Settings'," another chimes in with gear emoji.

But for assistive technology, titles and labels aren't decorative, they're structural with layered dependencies.

- screen readers announce them.
- users navigate through them.
- search engines index them.

WCAG doesn't say "good labels are nice to have". It says: labels must describe purpose. That forces writers to think beyond catchy phrasing or short microcopy. You have to think about:

- how users navigate the system
- how headings create hierarchy
- how semantic grouping affects comprehension
- how labels map to the underlying component structure

This is why content governance, glossaries, and terminology alignment matter. They works both as bureaucracy and accessibility.

## 2. Link Purpose: The Most Violated Rule in UX Writing (2.4.4)

WCAG bans vague links like:

- "Click here"
- "Learn more"
- "Lihat selengkapnya"

Every link must communicate purpose, not just behavior. This is one of the clearest intersections of UX writing and accessibility.

A designer might think the link looks clean.

A PM might think it's "standard."

But the moment a user with a screen reader navigates a page by links only (which is common), every "Learn more" becomes meaningless noise.

Link purpose is not a style preference because it's an accessibility requirement. It forces writers to slow down and ask "What exactly is the user going to learn? About what? To where does this link lead?"

Most teams don't ask this.
Senior writers do.
I do.

## 3. Language of Page & Language of Parts (3.1.1, 3.1.2)

If you work in multilingual products—Indonesian, English, Mandarin, Japanese—these criteria are real landmines. A screen reader can only pronounce a word correctly if the system knows the language.

If your UI switches languages but your markup doesn't?  
*WCAG violation.*

Immediate breakdown in comprehension.

This affects:

- Indonesian pages with English UI component names
- Japanese phrases inside an Indonesian article
- Brand slogans in English inside local-language pages
- Documentation mixing languages

Writers must know the difference between:

- foreign words
- 'borrowed' terms
- untranslated UI conventions

It's linguistic, yes.  
And at scale, it becomes architectural.

## 4. Reading Level and Plain Language (3.1.5)

This is the criterion people love to ignore, and I admit that I initially thought it was easy. Partly because it's AAA, and teams think AAA means "optional". Partly because writing simply is much harder than writing beautifully.

But in practice, plain language is good UX, regardless of AAA compliance.

Every time you remove jargon, simplify an instruction, or replace a 20-word sentence with a 10-word one, you make the interface:

- cognitively lighter
- faster to parse (also helpful to use for AI prompting!)
- more inclusive to users with varying literacy
- friendlier to people under stress or distraction

In government contexts, reading level is not an aesthetic choice because it directly affects public service delivery. I've seen this firsthand when terminology and instructions become too bureaucratic, comprehension drops sharply.

*WCAG simply captures what good writing practice already demands.*

## 5. Errors, Instructions, and the Writing that Prevents Failure (3.3.1–3.3.4)

WCAG dedicates four separate criteria to instructions and error messages.

Not design.

Not engineering.

Writing. So it's our time to shine, fellas!

- **Error Identification**: Tell me what went wrong.
- **Labels or Instructions**: Tell me what to do.
- **Error Suggestion**: Tell me how to fix it.
- **Error Prevention**: Help me avoid the mistake in the first place.

Most error copy in digital products fails all four. It's usually:

- vague
- punitive
- unhelpful
- or written as if the user is supposed to magically understand the system's rules

But WCAG frames errors as an accessibility issue, not just a UX writing challenge.

Accessibility means:

- no ambiguity
- no jargon
- no hidden assumptions
- no blame

It means *instructional clarity is required*.

> For this case, I'm surprised that some stakeholders and decision-makers even decided to simply request generic error copy. I think this will worsen the user experience, and it's clearly not a skill issue but a product decision.

## 6. Info and Relationships: Structure is Meaning (1.3.1)

This criterion is the soul of technical writing. WCAG requires information to be conveyed through structure, not just appearance.

That means:

- headings must be true headings
- lists must be lists
- tables must be tables
- required fields must be explicit
- visual grouping must be supported by semantic grouping

Writers often think formatting is a design responsibility, but formatting is information architecture.

The moment you choose to break content into sections, write a heading, or structure a set of instructions, you're shaping the semantic experience for every user, *including those who never see the screen*.

In this sense, writing is architecture.

## The Role of Writers in WCAG: Architecturing Sentences (is that a word?)

The deeper I go into accessibility work (especially framework-aware audits and large-scale systems) the clearer this becomes. Writers shape accessibility just as much as designers and engineers do.

Sometimes more.

We define:

- the semantics
- the relationships
- the labels
- the meanings
- the cognitive load
- the linguistic clarity
- the predictability of patterns

Writers are the quiet architects of inclusive products.

Not by writing prettier sentences,

but by designing the structure that sentences live in.

## An Architect of Clarity

Product writers, content designers, UX writers, technical writers, as many title I can write, writers write systems.

We design how information behaves. Semantically, cognitively, structurally, programmatically.

It's not strictly about tone. It's not about brand, even. It's about equitable access to information.

If we take that responsibility seriously, we stop writing for the ideal user in perfect conditions. We start writing for everyone else, the people who rely on clarity to participate at all.

If we want fewer confused users, fewer support tickets, and fewer dead-ends, we don’t need more features. We need clearer language.

WCAG already gives us the guide.