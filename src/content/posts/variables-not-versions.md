---
title: 🔐 Variables, Not Versions. Managing Copy Variants in Code
date: 2025-04-08
category: coding
excerpt: Here's to not giving a damn about versioning hell, scattered document, and annoying legacy process. A better way is on the corner!
tags: [writing, coding, UX, javascript, JSON]
---

# Managing Copy Variants in Code Instead of Docs, It's Liberating

<div style="width:100%;height:0;padding-bottom:83%;position:relative;"><iframe src="https://giphy.com/embed/Rng7sDG4dkmyWev2qx" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div>

I still remember the exact moment I snapped. It was 4:45 PM on a Friday, and I was staring at a Google Doc with several conflicting comments from stakeholders. The mkt team wanted one message for new users, another one from bizdev for returning customers, and a third pov from pm's for users who had abandoned their carts. The product team had their own ideas. And the head of product had, of course, weighed in with yet another "minor tweak" that somehow changed everything. Heheh.

That was the day I decided: no more version hell.
No more document graveyards.
There had to be a better way.

## The Problem With Documents

If you're a UX writer or content designer, this probably sounds painfully familiar. We've all been trained to work in documents. Google Docs, Microsoft Word, Figma comments, endless spreadsheets of copy variations that quickly spiral out of control. Every stakeholder, every A/B test, every user segment, and every platform multiplies our variations exponentially.

It's not just inefficient.
It's fundamentally flawed.

Here's why:

- Documents are static - They capture a moment in time, not the living, breathing nature of modern digital products
- Documents disconnect copy from context - Text in a spreadsheet isn't the same as text in a product
- Documents create versioning nightmares - Which version is in production? Who approved what? When was this last updated? (you can still answer that, but most of the time, it sucks)
- Documents keep writers out of the code - And that's exactly where we need to be

This traditional approach creates a massive handoff problem. Writers craft perfect copy in documents, then throw it over the wall to developers who implement it... sometimes correctly, sometimes not. When changes are needed, the cycle repeats, creating friction, delays, and mistakes.

## From Documents to Code to Variables

The epiphany hit me while pairing with a developer on a particularly tricky onboarding flow. I was explaining that we needed different welcome messages for different user types, and he casually replied, "Oh, we can just use a conditional for that."

Huh? Conditional? It's that a shampoo-related product?

Turns out, conditional is the best thing to provide clearer context and personalization in product communications.

```javascript
const welcomeMessage = user.isReturning 
  ? "Welcome back! Pick up where you left off." 
  : "Welcome! Let's get you started.";

```

Those two simple lines of code eliminated the need for multiple document versions, complex handoffs, and confusion about which message should appear when. The logic lived exactly where it belonged.

IN THE CODE!
Right next to where it would be implemented.

That's when it clicked for me.
What if we managed all our copy variants this way?

## Making the Shift

Transitioning from document-based workflows to code wasn't easy. I had to learn enough technical skills to understand how content actually lives in our products. I started small, learning how our codebase organized text. In most modern front-end frameworks like React and Next.js, text strings are often managed in a few common ways:

- Directly in components (not ideal, but common)
- In dedicated content files (better)
- In localization systems (best for multi-language products)

My first experiment was simple. Instead of creating separate documents for desktop and mobile welcome messages, I just implemented this:
(tailored to more general content, NDAs amirite?)

```javascript
// copy.js
export const welcomeMessages = {
  desktop: "Welcome to our platform. Discover our full suite of tools to boost your productivity.",
  mobile: "Welcome! Explore our tools on the go.",
  default: "Welcome to our platform."
};

// Component.jsx
import { welcomeMessages } from './copy';

function Welcome({ device }) {
  return (
    <h1>
      {welcomeMessages[device] || welcomeMessages.default}
    </h1>
  );
}
```

The result?
No more confusion about which welcome message was current. No more hunting through documents. The variants lived right in the code, with clear logic about when each should appear.

## Taking It Further: A Real-World Example

Let me walk you through a slightly more complex example.
We needed to show different error messages depending on:

- The type of error
- The user's subscription level
- Whether they were on mobile or desktop

In the old world, that would have been a nightmare spreadsheet with dozens of combinations and inevitable confusion. Instead, I built this:

```javascript
// errorMessages.js
export const errorMessages = {
  networkError: {
    free: {
      desktop: "Unable to connect. Please check your internet connection and try again.",
      mobile: "Connection error. Check internet and retry."
    },
    premium: {
      desktop: "We're having trouble connecting to our servers. Our team has been notified. As a premium member, you can contact priority support for immediate assistance.",
      mobile: "Connection error. As a premium member, contact priority support for help."
    },
    default: "Something went wrong. Please try again."
  },
  validationError: {
    // Similar structure for different error types
  }
};

// Using it in a component
function ErrorDisplay({ errorType, subscription, device }) {
  // First try to get the most specific message
  let message = errorMessages[errorType]?.[subscription]?.[device];
  
  // Fall back to subscription-specific message if no device-specific one exists
  if (!message) {
    message = errorMessages[errorType]?.[subscription]?.default;
  }
  
  // Fall back to error-type default if no subscription-specific one exists
  if (!message) {
    message = errorMessages[errorType]?.default;
  }
  
  // Ultimate fallback
  if (!message) {
    message = "An error occurred. Please try again.";
  }
  
  return <div className="error-message">{message}</div>;
}
```

I also messing around with personalized investment communications for a fintech mockup prototype. It's definitely one of my most challenging and rewarding experiment, implementing this approach because we needed copy that would change based on:

- User's investment experience level
- Account balance tier
- Market conditions
- Recent account activity
- Regulatory requirements based on location

This was particularly sensitive because financial copy needs precision, compliance with regulations, and the right tone to inspire confidence without overpromising.

```javascript

    // Balance tiers
    lowBalance: {
      // Market conditions
      bullish: {
        US: "Your portfolio is at ${{balance}}. The market is trending upward—a good time to consider adding to your investments.",
        EU: "Portfolio value: ${{balance}}. Markets are positive. Consider your risk tolerance before increasing investments.",
        default: "Portfolio: ${{balance}}. Markets rising."
      },
      bearish: {
        US: "Your portfolio is at ${{balance}}. Markets are currently volatile—remember your long-term goals.",
        EU: "Portfolio value: ${{balance}}. Market volatility observed. Your diversified approach helps manage risk.",
        default: "Portfolio: ${{balance}}. Markets experiencing volatility."
      },
      neutral: {
        US: "Your portfolio is at ${{balance}}. Markets are steady—a good time to review your investment strategy.",
        EU: "Portfolio value: ${{balance}}. Markets are stable. Consider reviewing your investment strategy quarterly.",
        default: "Portfolio: ${{balance}}. Markets stable."
      }
    },
```


This implementation was transformative for me personally. Previously, the compliance department had to review dozens of spreadsheet scenarios for every market update. Now, they could approve the entire message structure once, with confidence that the right messaging would appear in the right context.
For the marketing team, it meant we could adapt messaging based on market conditions without requiring emergency copy reviews and deployments. When markets dropped suddenly, we could quickly update the "bearish" condition messages to be more reassuring without touching any other variants.
What's more, the product analytics team could track which message variants were actually being seen by users, giving us insight into our user demographics we never had before.

> Even if you never write a line of production code, bringing this structured thinking to your content strategy will transform how you work with development teams.

## The Future of UX Writing Is Programmatic
I believe we're at the beginning of a fundamental shift in UX writing and content design. As digital products become more complex and personalized, managing content in static documents makes less and less sense. The future belongs to writers who can think programmatically (not necessarily coders), but professionals who understand how to structure content for dynamic environments. This doesn't diminish the importance of craft; if anything, it elevates it by ensuring our carefully chosen words appear in exactly the right context.

So the next time you find yourself creating yet another copy doc with yet another version number, ask yourself:

**Could this be a variable instead?**

Your future self—and your development team—will thank you.

_P.S. Want to see more examples or give a try to this approach? You can email me at prasaja@hey.com to reach me and I will make your product writing process more enjoyable, I promise!_
