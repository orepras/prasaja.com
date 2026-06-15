# Prasaja Portfolio - Vite + React

This is a migrated version of the Prasaja portfolio website from Next.js to Vite + React, preserving all essential functionality including static pages, blog/writing system, and writing tools.

## Features

- **Static Pages**: Home, About, Contact, Portfolio
- **Writing/Blog System**: Markdown-based content with categories and filtering
- **Writing Tools**: 
  - Writing Guidelines Builder with voice/tone spectrum
  - UX Writing Request Form
- **Proposals**: Password-protected admin to create, edit, share, and track client proposals with e-signature and PDF export (see [Proposals](#proposals))
- **Responsive Design**: Tailwind CSS with dark/light theme support
- **Modern UI**: Radix UI components with shadcn/ui styling

## Tech Stack

- **React 18** with TypeScript
- **Vite** for build tooling
- **React Router** for client-side routing
- **Tailwind CSS** for styling
- **Radix UI** for accessible components
- **Lucide React** for icons

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (shadcn/ui)
│   ├── writing-guidelines/  # Writing guidelines components
│   └── writing-form/   # Writing form components
├── pages/              # Page components
├── lib/                # Utilities and helpers
└── hooks/              # Custom React hooks
```

## Content Management

The blog system uses markdown files stored in the `content/` directory:
- `content/posts/` - Blog posts organized by category
- `content/projects/` - Portfolio projects

## Writing Tools

### Writing Guidelines Builder
- Customizable writing guidelines
- Voice and tone spectrum
- Export to PDF/Markdown
- Local storage persistence

### UX Writing Request Form
- Comprehensive project brief form
- Export to Markdown
- Email integration ready

## Proposals

A self-contained system to write proposals, share an editable link with potential
clients, let them sign, and track whether each proposal has been opened or signed —
all without any backend or database. Everything runs in the browser.

### The two pages

| Page | URL | Who it's for |
| --- | --- | --- |
| **Admin** | `/proposals` | You. Password-protected. Create, edit, share, track, export. |
| **Client view** | `/proposal?d=…` | Your client. Opens from the share link, reads and signs. |

These pages are intentionally **not** in the site's top navigation. Reach the admin
by typing `/proposals` after your domain (e.g. `https://yoursite.com/proposals`).

### Admin password

The admin page asks for a password the first time you open it in a browser tab:

```
Copywriter101!
```

You stay unlocked for the rest of that browser session (closing the tab logs you out).

> **Where to change it:** the password lives in `src/lib/proposals.ts` as
> `ADMIN_PASSWORD`. Because this is a static site, the password only gates the UI —
> it is visible in the built JavaScript, so treat it as a light lock, not real
> security. Don't store anything truly sensitive in a proposal.

### How to use it (step by step)

1. **Create a proposal.** Go to `/proposals`, unlock, click **New proposal**.
   The editor has three tabs:
   - **Details** — title, client name & company, who it's prepared by, date,
     valid-until date, currency (e.g. `IDR`, `USD`, `EUR`), an optional
     **access password** (see [Per-proposal passwords](#per-proposal-passwords)),
     an optional **header image**, and **your signature** (see
     [Signatures](#signatures-yours-and-the-clients)).
   - **Content** — an introduction, any number of **sections** (Scope, Deliverables,
     Timeline… add/remove freely), and a **Payment & Terms** block (pre-filled with
     your standard terms — deposit, bank details, rights, hours, revisions — fully
     editable). Leave a blank line between paragraphs; lines starting with `•` or `-`
     render as a bullet list.
   - **Pricing** — line items (description, quantity, unit price). The total is
     calculated automatically and formatted in your chosen currency.

   Dates (proposal date and valid-until) are shown in an unambiguous international
   format, e.g. **15 June 2026**.

   Use **Preview** any time to see exactly what the client will see. Click **Save**
   to store it. Proposals are saved in your browser's local storage.

2. **Share with the client.** On the proposal in the list, click **Share**. This
   copies a link to your clipboard and marks the proposal **Sent**. Send that link
   to the client however you like (email, chat, etc.).

   The link is *self-contained*: the whole proposal is encoded inside the URL, so it
   opens on any device or browser — the client doesn't need an account and you don't
   need a server. (Because the content is baked into the link, if you edit the
   proposal later, re-share to send an updated link.)

3. **The client reads and signs.** Opening the link shows the formatted proposal —
   header image (if any), your signature already in place, and the Payment & Terms
   (if you set an access password, the client is asked for it first). The client can
   **Download PDF** at any time. To sign, they enter their **name and email**,
   optionally a title and a drawn signature, tick the agreement box, and click
   **Sign proposal**. Their signature then joins yours in the **Signatures** block,
   and a footer records: *“This proposal was signed digitally by … on 15 June 2026 at
   3:45 PM GMT+7.”*

4. **The signed copy goes to both inboxes.** After signing, the client sees a
   confirmation: *“After signing, you'll have the signed copy sent to your email.”*
   The **Email the signed copy** button opens a pre-filled email **to the client**
   with **you (`prasaja@hey.com`) cc'd**, containing a link that reopens the proposal
   with the signature shown. They just hit send. (There's also a *Copy signed-copy
   link* button as a fallback.)

5. **Record the signature.** Back in `/proposals`, paste the link from that email
   into the **“Record a client confirmation”** box and click **Record**. The proposal
   flips to **Signed** (or **Opened**), stores the client's signature and email, and
   shows who signed and when.

6. **Export the signed PDF.** Open the proposal → **Preview** → **Download PDF**. The
   signed copy includes the signature block, signer name/title, and the signing date.

### Per-proposal passwords

Each proposal can have its own **access password**, set in the editor's **Details**
tab. When a password is set:

- The share link is **encrypted** (AES-GCM, with the key derived from your password).
  The proposal content cannot be read from the link without the password — so even
  though everything lives in the URL, it stays private.
- When the client opens the link, they're asked for the password before they can read
  or sign the proposal. A wrong password is rejected.
- A small 🔒 lock icon appears next to the proposal in your admin list.

**Tips**
- Send the password to the client through a *different* channel than the link (e.g.
  the link by email, the password by chat) so they're not exposed together.
- If you change the password, **re-copy and re-send the share link** — older links use
  the previous password.
- Unlike the admin password, each proposal's password is *not* stored in the
  shipped code; it only exists inside the encrypted link and (until you reload) your
  saved copy of the proposal.

### Signatures (yours and the client's)

Every proposal has a two-party **Signatures** block:

- **Prepared & offered by (you).** In the editor's **Details** tab, draw your
  signature in the **Your signature** pad. It's saved and **reused automatically** on
  your next proposal, so you only draw it once. If you leave it blank, your name is
  shown in its place. Your signature is embedded in the proposal the client sees.
- **Accepted & signed by (the client).** Filled in when the client signs. Until then
  it shows *“Awaiting signature.”*

Once the client signs, a footer records the digital signing in international format
with timezone, e.g. *“This proposal was signed digitally by Jane Doe on 15 June 2026
at 3:45 PM GMT+7.”* The timezone is captured at the moment of signing so the
timestamp stays correct for everyone who views it later.

### Header image

In **Details → Header image**, upload an optional banner shown at the top of the
proposal. Uploaded images are automatically **downscaled and compressed**.

Because the site has no backend, the image travels **inside the share link**. Large
images make the link long, so the editor shows an **estimated share-link size** and
warns if it gets too big — use a lighter image or remove it if you see the warning.
**Without an image the header still looks polished** (a clean gradient banner), so the
image is purely optional.

### Status meanings

| Badge | Meaning |
| --- | --- |
| **Draft** | Created but not shared yet. |
| **Sent** | You've copied/shared the link. |
| **Opened** | The client returned an open confirmation (without signing yet). |
| **Signed** | The client signed and you recorded their confirmation. |

### How tracking works (and its limits)

There is no server, so the site can't silently report back when a link is opened.
Tracking works by the client **sending a confirmation link back to you** (step 4),
which you record (step 5). That confirmation carries the open/sign timestamps and the
signature. In practice the reliable signal is **Signed**, since that's when a client
naturally sends something back.

If you later want fully automatic open/sign tracking across devices, that requires a
small backend (e.g. a Cloudflare Pages Function with KV or D1) — the current design
deliberately avoids that to keep the site fully static.

### Where the data lives

- **Your proposals** are stored in your browser's `localStorage` on the device where
  you created them. They are not synced to any server. Clearing site data or using a
  different browser/device means you won't see them. Use **Download PDF** to keep
  durable copies of anything important.
- **Share links** contain the full proposal (minus any signature). If the proposal has
  an access password, this content is encrypted and unreadable without the password.
- **Signed-copy links** contain the client's signature data, which is merged back
  into your local copy when you record it, and lets either party reopen the signed
  proposal.

### Files involved

```
src/lib/proposals.ts                        # Types, storage, encode/decrypt, dates, password
src/lib/proposal-pdf.ts                      # PDF export helper (html2pdf.js)
src/lib/image.ts                             # Header-image downscale/compress
src/components/proposal/ProposalDocument.tsx # The printable proposal layout
src/components/proposal/SignaturePad.tsx     # Draw-to-sign canvas (you and the client)
src/pages/ProposalAdmin.tsx                  # /proposals (admin)
src/pages/ProposalView.tsx                   # /proposal (client view)
```

To change the default Payment & Terms text or bank details, edit
`DEFAULT_PAYMENT_TERMS` in `src/lib/proposals.ts` (it's also editable per proposal in
the **Content** tab).

## Deployment

The project builds to static files that can be deployed to cloudflare

## Migration Notes

This project was migrated from Next.js to Vite + React while preserving:
- All static pages and routing
- Markdown-based blog system
- Writing tools functionality
- UI/UX design and styling
- Theme support (dark/light mode)