---
title: 🗄️ JSON Documentation Structure for Product Copywriting
date: 2025-06-13
category: ux-writing
excerpt: A comprehensive guide to organizing your app's copy in JSON files that scales from simple single-language projects to complex structures.
tags: [writing, content-modeling, technical-writing]
---

<div style="width:100%;height:0;padding-bottom:53%;position:relative;"><iframe src="https://giphy.com/embed/yy1RLVzuSAiFa" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div>

Managing copy and text content in applications often starts simple but quickly becomes chaotic as your product grows. You begin with hardcoded strings scattered throughout your codebase, then realize you need translations, then struggle with inconsistent messaging across different parts of your app.

This guide presents an structured approach to organizing your copywriting documentation using JSON files that grows with your product. Whether you're building a simple MVP or managing a complex multi-language application, this system helps you maintain consistent, translatable, and maintainable copy across your entire product.

This is an extended explanation from this blog about [How content designers can (and should) use JSON files](https://uxcontent.com/content-design-json/).

**The key principle is progressive complexity**: start with the basics when you're small, then gradually expand the structure as your needs grow. This approach prevents over-engineering early on while ensuring you have a solid foundation for scaling.

## Basic Structure (Level 1)

```markdown
copydocs/
├── en/                 # English copy
├── id/                 # Indonesian copy  
└── README.md          # Documentation
```

## Core Pages Structure (Level 2)

```markdown
copydocs/
├── en/
│   ├── auth.json           # Authentication (login, signup, forgot password)
│   ├── homepage.json       # Landing/homepage content
│   ├── onboarding.json     # User onboarding flow
│   ├── dashboard.json      # Main dashboard/home after login
│   ├── profile.json        # User profile and account settings
│   ├── errors.json         # Error messages and alerts
│   └── common.json         # Shared/common copy (buttons, labels, etc.)
├── id/
│   ├── auth.json
│   ├── homepage.json
│   ├── onboarding.json
│   ├── dashboard.json
│   ├── profile.json
│   ├── errors.json
│   └── common.json
└── README.md
```

## Expanded Structure (Level 3)

```markdown
copydocs/
├── en/
│   ├── auth.json           # Login, signup, password reset
│   ├── homepage.json       # Hero, features, pricing, testimonials
│   ├── onboarding.json     # Welcome, setup, tutorials
│   ├── dashboard.json      # Main dashboard after login
│   ├── profile.json        # Account settings, preferences
│   ├── billing.json        # Payments, subscriptions, invoices
│   ├── notifications.json  # In-app notifications, alerts
│   ├── search.json         # Search functionality copy
│   ├── help.json          # Help center, FAQ, support
│   ├── errors.json         # All error messages
│   ├── success.json        # Success messages and confirmations
│   ├── common.json         # Buttons, labels, navigation
│   └── components/         # UI component-specific copy
│       ├── modals.json
│       ├── forms.json
│       ├── tables.json
│       └── navigation.json
├── id/
│   └── [same structure as en/]
└── README.md
```

## Complete Structure (Level 4) - For Generic Product App

```markdown
copydocs/
├── en/
│   ├── auth.json              # Authentication flows
│   ├── homepage.json          # Public homepage/landing
│   ├── about.json             # About us, company info
│   ├── pricing.json           # Pricing plans and features
│   ├── onboarding.json        # User onboarding experience
│   ├── dashboard.json         # Main dashboard/home
│   ├── profile.json           # User profile management
│   ├── settings.json          # App settings and preferences
│   ├── billing.json           # Payment and subscription
│   ├── team.json              # Team management (if applicable)
│   ├── projects.json          # Projects/workspace management
│   ├── analytics.json         # Analytics and reporting
│   ├── integrations.json      # Third-party integrations
│   ├── notifications.json     # Notification center
│   ├── search.json            # Search functionality
│   ├── help.json              # Help center and support
│   ├── legal.json             # Terms, privacy, policies
│   ├── blog.json              # Blog/content section
│   ├── contact.json           # Contact and support forms
│   ├── admin.json             # Admin panel (if applicable)
│   ├── mobile.json            # Mobile-specific copy
│   ├── emails.json            # Email templates and content
│   ├── errors.json            # Error messages
│   ├── success.json           # Success messages
│   ├── loading.json           # Loading states and placeholders
│   ├── empty-states.json      # Empty state messages
│   ├── common.json            # Shared copy across app
│   └── components/            # Component-specific copy
│       ├── navigation.json    # Menus, breadcrumbs
│       ├── modals.json        # Modal dialogs
│       ├── forms.json         # Form labels and validation
│       ├── tables.json        # Table headers and actions
│       ├── buttons.json       # Button text variations
│       ├── tooltips.json      # Tooltip messages
│       ├── badges.json        # Status badges and labels
│       └── cards.json         # Card components
├── id/
│   └── [exact same structure as en/]
├── locales.json               # Locale configuration
├── translation-keys.md        # Translation key conventions
└── README.md                  # Complete documentation
```

## Sample JSON Structure

auth.json
```json
{
  "login": {
    "title": "Welcome Back",
    "subtitle": "Sign in to your account",
    "email_label": "Email Address",
    "password_label": "Password",
    "submit_button": "Sign In",
    "forgot_password": "Forgot your password?",
    "signup_link": "Don't have an account? Sign up"
  },
  "signup": {
    "title": "Create Account",
    "subtitle": "Get started with your free account",
    "name_label": "Full Name",
    "email_label": "Email Address",
    "password_label": "Password",
    "confirm_password_label": "Confirm Password",
    "submit_button": "Create Account",
    "login_link": "Already have an account? Sign in"
  }
}
```

common.json

```json
{
  "buttons": {
    "save": "Save",
    "cancel": "Cancel",
    "delete": "Delete",
    "edit": "Edit",
    "submit": "Submit",
    "back": "Back",
    "next": "Next",
    "previous": "Previous"
  },
  "navigation": {
    "home": "Home",
    "dashboard": "Dashboard",
    "profile": "Profile",
    "settings": "Settings",
    "help": "Help",
    "logout": "Sign Out"
  },
  "status": {
    "loading": "Loading...",
    "saving": "Saving...",
    "saved": "Saved successfully"
  }
}
```

And for the implementation, I'll use these Javascript/React code:

JavaScript/React
```javascript
// utils/copy.js
class CopyManager {
  constructor(locale = 'en') {
    this.locale = locale;
    this.cache = {};
  }

  async loadCopy(page) {
    if (!this.cache[page]) {
      const response = await fetch(`/copydocs/${this.locale}/${page}.json`);
      this.cache[page] = await response.json();
    }
    return this.cache[page];
  }

  async get(page, key) {
    const copy = await this.loadCopy(page);
    return this.getNestedValue(copy, key);
  }

  getNestedValue(obj, key) {
    return key.split('.').reduce((o, k) => o?.[k], obj);
  }
}

// react
// Usage in React component
import { useState, useEffect } from 'react';

function LoginForm() {
  const [copy, setCopy] = useState({});
  const copyManager = new CopyManager('en');

  useEffect(() => {
    copyManager.loadCopy('auth').then(setCopy);
  }, []);

  return (
    <form>
      <h1>{copy.login?.title}</h1>
      <p>{copy.login?.subtitle}</p>
      <input placeholder={copy.login?.email_label} />
      <input type="password" placeholder={copy.login?.password_label} />
      <button>{copy.login?.submit_button}</button>
    </form>
  );
}
```
## Naming Convention for JSON Keys

The example keys above still use generic names like "title", "password_label", "submit", etc. Therefore, I recommend using a naming pattern for better readability and collaboration with developers to make it more maintainable.

I recommend the naming pattern:  
**{feature}{Component}{Scenario}**

- **Feature**: The main functionality or page area (login, dashboard, billing)
- **Component**: The UI element type (button, modal, form, message)
- **Scenario**: The specific state or action (success, error, loading, empty)

## Examples

Good Examples:
```json
{
  "loginFormError": "Invalid email or password",
  "dashboardCardEmpty": "No data available",
  "billingModalSuccess": "Payment method updated successfully",
  "profileButtonSave": "Save Changes",
  "searchInputPlaceholder": "Search products...",
  "onboardingStepTitle": "Welcome to our platform",
  "teamInviteSuccess": "Invitation sent successfully",
  "projectDeleteConfirm": "Are you sure you want to delete this project?"
}
```

Avoid These:
```json
{
  "error1": "Something went wrong",     // Not descriptive
  "btn_save": "Save",                   // Inconsistent format
  "loginError": "Invalid credentials",  // Missing component
  "message": "Success",                 // Too generic
  "delete_project_confirmation": "Are you sure?" // Inconsistent case
}
```

## Detailed Naming Guidelines

### 1. Feature Names (First Part)
- Use the main page or functionality area
- Keep it concise but descriptive

Examples: auth, dashboard, billing, profile, onboarding, search

### 2. Component Names (Second Part)
- Describe the UI element type
- Use singular form

Examples: Button, Modal, Form, Card, Input, Message, Title, Label

### 3. Scenario Names (Third Part)
- Describe the state, action, or context
- Be specific about the situation

Examples: Success, Error, Loading, Empty, Confirm, Cancel, Submit, Placeholder

## Best Practices

- Be Consistent: Stick to your chosen pattern across all files
- Use CamelCase: Easier to read and consistent with JavaScript conventions
- Be Descriptive: Someone should understand the context from the key name
- Avoid Abbreviations: Use `Button` instead of `Btn`, `Message` instead of `Msg`
- Group Related Items: Keep similar functionality together in the JSON structure
- Document Edge Cases: Add comments in your README for special naming rules

---

## Key Benefits of This Structure

- **Scalable**: Easy to add new languages and pages
- **Organized**: Logical grouping by functionality
- **Maintainable**: Clear separation of concerns
- **Developer-friendly**: Easy to import and use in code
- **Translator-friendly**: Clear context for each copy element

---

The best system is the one your team will actually use consistently. Start small with just the core pages you need today, establish clear naming conventions early, and expand the structure as your product and team grow.

And hey, if you need a UX Writer/Technical Writer with more than 8+ years experience to make your content documentation more neat?  
[I'm just a one form away for project collaboration](/contact).