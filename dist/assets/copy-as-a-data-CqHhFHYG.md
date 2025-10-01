---
title: 📄 Treating UX Copy as Data
date: 2025-03-25
category: coding
excerpt: My personal product copywriting best practice for every project from now on!
tags: [writing, coding, UX]
---

<div style="width:100%;height:0;padding-bottom:56%;position:relative;"><iframe src="https://giphy.com/embed/QpVUMRUJGokfqXyfa1" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div>

# Why We Need to Start Treating UX Copy as Data, Not Docs

Look, we've all been there. You're trying to update some product copy, and suddenly you're drowning in a sea of Google Docs, Figma comments, Slack threads, and random feedback emails. It's Friday afternoon, you just want to fix one error message before going home, and you're playing detective trying to figure out which version of which doc has the approved copy.

It's exhausting, right?

Here's the thing: **we're doing this to ourselves by treating UX copy as documentation instead of what it actually is — straight-up product data.**

Just like any other piece of the product.

## The Nightmare We've All Lived

Our typical process looks something like this mess:

1. Write some copy in a Google Doc
2. Share it with stakeholders who leave comments (some in the doc, some in email, some in Slack)
3. Revise in the same doc (or maybe start a new one because things got confusing)
4. Get final approval somewhere
5. Hand it off to developers who manually type it into the code
6. Pray they didn't make a typo

And then three months later when something needs to change?

> Hey, does anyone have the latest version of the onboarding copy?

This approach is killing us with:

- Inconsistent copy across the product (why does this button say "Continue" but that one says "Next"?)
- No version control (is this v3 or v4 of the error messages?)
- Implementation errors (the dev definitely typed "you're" instead of "your")
- Painfully slow update cycles
- Feedback scattered everywhere

## There's a Better Way: Copy as Data

I've been thinking about this a lot lately with my product storytelling work, and here's what I've realized: we should be handling copy the same way we handle other product components — as structured data.

Instead of thinking about copy as paragraphs in documents that says

> Error message: Payment unsuccessful,

model it as simple structured data:

```json
{
  "paymentError": {
    "title": "Payment unsuccessful",
    "message": "Your payment couldn't be processed. Please check your card details and try again.",
    "primaryButton": "Try again",
    "secondaryButton": "Contact support"
  }
}
```

or more detailed content modelling like this:

```json
{
  "component": "paymentErrorModal",
  "strings": {
    "title": "Payment unsuccessful",
    "body": "Your payment couldn't be processed. Please check your payment details and try again.",
    "primaryButton": "Try again",
    "secondaryButton": "Contact support"
  },
  "metadata": {
    "lastUpdated": "2025-03-15",
    "approvedBy": "contentTeam",
    "version": 3,
    "contextNotes": "Appears when API returns error code 4002-4008"
  }
}
```

See the difference? This isn't just words in a doc — it's structured data that can be directly connected to the product. This approach forces clarity about what content exists, where it lives in the product, and how it relates to other elements.

## How This Could Actually Work

You don't need some fancy enterprise solution to get started with this approach. Here are some practical ways to implement this:

### Start Simple

If you're on a small team, even a well-organized json files/Airtable base can be a game-changer. Create a table with columns for:

- String ID (something like "payment.error.title")
- The actual copy
- Status (draft, in review, approved)
- Last updated date
- Notes/context
- Component it belongs to

This already gives you WAY more structure than a bunch of Google Docs.

### Level Up with a Real CMS

For teams ready for the next step:

- Contentful, Sanity, or Strapi are great headless CMS options (I learned about 'headless CMS' from Thoni, a designer I worked with, massive kudos to him!)
- They let you model your content (buttons, forms, error messages, etc.)
- Writers can update copy directly
- **Developers can pull content via API instead of hardcoding strings**

I worked with a team that implemented copy as a data, and it was like night and day.

Copy changes that used to take a week were live in hours.

### The Dream Setup

In an ideal world:

- Copy lives in a centralized system
- UI components pull text directly from this system
- Writers can update copy without developer involvement (well maybe a little bit)
- Everyone has access to the same single source of truth
- Version history tracks all changes
- Localization integrates seamlessly

My former team at Kredivo still using [ditto words](https://www.dittowords.com/) and it works wonder!

And for the most exciting process I've been in, Suarise gave me the full responsibility to experimenting with end-to-end copy ownership in [Ba11y](https://ba11y.com/) for my consulting project. I wrote the copy directly in IDE, save the copy with .json format, and push it directly using git (github).

### Real Talk: Why This is Worth the Effort

I know what you're thinking: "This sounds like a lot of work compared to just making another Google Doc."

But here's why it's worth it:

1. **You'll stop making the same mistakes over and over.** No more inconsistent button labels or mismatched terminology.
2. **Updates become SO much faster.** Need to change that confusing error message that's causing support tickets? Update it in your system and it's live everywhere.
3. **Developers will love you.** They don't have to play "hunt the latest copy doc" or manually type your words.
4. **Localization becomes manageable.** When your strings are structured data, translation becomes a systematic process rather than a copy-paste nightmare.
5. **You can actually analyze what's working.** When copy is data, you can track which messages lead to better conversion, fewer support tickets, etc.

### Getting Started Without Losing Your Mind

You don't have to boil the ocean (hope it's the right analogy). Here's how to begin:

1. **Do a quick content audit.** Just list out where all your copy lives right now. Be honest about the mess.
2. **Pick one high-value area.** Maybe it's error messages or onboarding. Start there.
3. **Choose a simple tool.** Even a csv table can work as a starting point.
4. **Get one developer on your side.** You need an ally who understands why this matters.
5. **Show some quick wins.** Fix a persistent copy problem using your new system and make sure everyone knows how much easier it was.

### The Roadblocks You'll Hit (Because Let's Be Real)

This transition isn't all sunshine and rainbows and bonuses:

- **Some stakeholders will resist.** "But I like commenting in Google Docs!"
- **There's a learning curve.** Content modeling is a new skill for many writers.
- **Initial setup takes time.** Creating the system is an investment.
- **Technical hurdles exist.** Connecting your content to your product requires dev resources.

But honestly?

> The pain of continuing with the status quo is worse than the pain of change.

## Bottom Line

Every time I get another "can you find the latest approved copy for X?" message, I'm reminded why this matters. Content is too important to be treated as an afterthought that lives in random, scattered, the last-layer-on-the-product docs.

When we treat UX copy as the product data it truly is, we elevate both the quality of our work and the value we bring to our products. We stop being "the people who write the words" and start being architects of a critical product system.

And maybe, just maybe, we can all stop spending our Friday afternoons digging through 17 different Google Docs trying to find that one approved string.

**Ugh, I love process improvement!**
