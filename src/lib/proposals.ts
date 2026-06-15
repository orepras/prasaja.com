// Proposal system — fully client-side (no backend).
//
// - Proposals are authored in the admin page and stored in localStorage.
// - A "share link" encodes the whole proposal into the URL, so it opens on any
//   device without a server.
// - When a client signs, the viewer produces a "receipt" link the client sends
//   back. The admin imports that receipt to mark the proposal opened/signed.

export type ProposalStatus = "draft" | "sent" | "opened" | "signed";

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface ProposalSection {
  id: string;
  heading: string;
  body: string;
}

export interface Signature {
  signerName: string;
  signerTitle?: string;
  signerEmail?: string; // client's email, for sending the signed copy
  signatureDataUrl?: string; // drawn signature (PNG data URL)
  agreed: boolean;
  openedAt?: string; // ISO — when the client first opened the link
  signedAt?: string; // ISO — when the client signed
  timezone?: string; // IANA tz captured at signing, for a stable timestamp
}

// The preparer's (your) signature, added when the proposal is created.
export interface PreparerSignature {
  name: string;
  title?: string;
  signatureDataUrl?: string;
  signedAt?: string;
  timezone?: string;
}

export interface Proposal {
  id: string;
  title: string;
  clientName: string;
  clientCompany?: string;
  preparedBy: string;
  date: string; // ISO date (yyyy-mm-dd)
  validUntil?: string; // ISO date
  currency: string; // e.g. "IDR", "USD"
  accessPassword?: string; // optional password the client must enter to open the link
  heroImage?: string; // optional header image (compressed JPEG data URL)
  introduction: string;
  sections: ProposalSection[];
  lineItems: LineItem[];
  terms: string; // Payment & Terms
  status: ProposalStatus;
  preparerSignature?: PreparerSignature; // your signature
  signature?: Signature; // client's signature
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = "prasaja_proposals_v1";
const AUTH_KEY = "prasaja_proposal_admin_v1";
export const ADMIN_PASSWORD = "Copywriter101!";

/* ------------------------------------------------------------------ */
/* Auth (admin gate)                                                   */
/* ------------------------------------------------------------------ */

export function isAdminAuthed(): boolean {
  try {
    return sessionStorage.getItem(AUTH_KEY) === "yes";
  } catch {
    return false;
  }
}

export function setAdminAuthed(value: boolean) {
  try {
    if (value) sessionStorage.setItem(AUTH_KEY, "yes");
    else sessionStorage.removeItem(AUTH_KEY);
  } catch {
    /* ignore */
  }
}

/* ------------------------------------------------------------------ */
/* Storage CRUD                                                        */
/* ------------------------------------------------------------------ */

export function getProposals(): Proposal[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Proposal[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function getProposal(id: string): Proposal | undefined {
  return getProposals().find((p) => p.id === id);
}

function persist(proposals: Proposal[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(proposals));
}

export function saveProposal(proposal: Proposal) {
  const all = getProposals();
  const idx = all.findIndex((p) => p.id === proposal.id);
  const next = { ...proposal, updatedAt: new Date().toISOString() };
  if (idx >= 0) all[idx] = next;
  else all.unshift(next);
  persist(all);
}

export function deleteProposal(id: string) {
  persist(getProposals().filter((p) => p.id !== id));
}

export function uid(): string {
  return (
    Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
  ).toUpperCase();
}

// Your reusable signature, remembered across proposals.
const SIGNATURE_KEY = "prasaja_proposal_signature_v1";

export function getSavedSignature(): string | undefined {
  try {
    return localStorage.getItem(SIGNATURE_KEY) || undefined;
  } catch {
    return undefined;
  }
}

export function setSavedSignature(dataUrl: string | undefined) {
  try {
    if (dataUrl) localStorage.setItem(SIGNATURE_KEY, dataUrl);
    else localStorage.removeItem(SIGNATURE_KEY);
  } catch {
    /* ignore */
  }
}

// Default Payment & Terms — edit per proposal as needed.
export const DEFAULT_PAYMENT_TERMS = `Upon signing this contract, I require 50% of the full payment upfront, with the remaining 50% paid at project completion. Bank transfer is preferred:

BCA 0010791693 — Prasaja Mukti Aji

• I retain the rights to the work submitted and may include it in my private portfolio.
• I'm available for synchronous work from 9 AM to 5 PM; after that, I can pick up tasks as asynchronous work.
• Clients may request extra work outside this contract, charged at Rp170,000 per hour (alternatively, I can create a new proposal).
• The client is not entitled to a refund of the upfront payment if the project is canceled once work has begun.
• Clients can request one round of revisions, no questions asked. Other modifications are possible at my discretion if I feel they are needed.`;

export function createEmptyProposal(): Proposal {
  const today = new Date().toISOString().slice(0, 10);
  const preparedBy = "Prasaja Mukti Aji";
  return {
    id: uid(),
    title: "Untitled Proposal",
    clientName: "",
    clientCompany: "",
    preparedBy,
    date: today,
    validUntil: "",
    currency: "IDR",
    accessPassword: "",
    heroImage: undefined,
    introduction: "",
    sections: [
      { id: uid(), heading: "Scope of Work", body: "" },
      { id: uid(), heading: "Deliverables", body: "" },
      { id: uid(), heading: "Timeline", body: "" },
    ],
    lineItems: [{ id: uid(), description: "", quantity: 1, unitPrice: 0 }],
    terms: DEFAULT_PAYMENT_TERMS,
    status: "draft",
    preparerSignature: {
      name: preparedBy,
      signatureDataUrl: getSavedSignature(),
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

/* ------------------------------------------------------------------ */
/* Pricing helpers                                                     */
/* ------------------------------------------------------------------ */

export function lineItemTotal(item: LineItem): number {
  return (Number(item.quantity) || 0) * (Number(item.unitPrice) || 0);
}

export function proposalTotal(proposal: Proposal): number {
  return proposal.lineItems.reduce((sum, item) => sum + lineItemTotal(item), 0);
}

export function formatMoney(amount: number, currency: string): string {
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: currency || "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${currency} ${amount.toLocaleString()}`;
  }
}

/* ------------------------------------------------------------------ */
/* Date/time helpers (international format)                             */
/* ------------------------------------------------------------------ */

// Unambiguous international date, e.g. "15 June 2026".
export function formatDateIntl(iso?: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}

// Full signing timestamp with time + timezone, e.g.
// "15 June 2026 at 3:45 PM GMT+7". A stored IANA tz keeps it stable for any viewer.
export function formatSignedDateTime(iso?: string, timeZone?: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  const dateOpts: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const timeOpts: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZoneName: "short",
  };
  if (timeZone) {
    dateOpts.timeZone = timeZone;
    timeOpts.timeZone = timeZone;
  }
  const datePart = new Intl.DateTimeFormat("en-GB", dateOpts).format(d);
  const timePart = new Intl.DateTimeFormat("en-US", timeOpts).format(d);
  return `${datePart} at ${timePart}`;
}

// Rough estimate (characters) of the share-link length, to warn about big images.
export function estimateShareLength(proposal: Proposal): number {
  try {
    const shared = { ...proposal, signature: undefined, accessPassword: undefined };
    const json = JSON.stringify({ v: 1, enc: false, proposal: shared });
    return Math.round(json.length * 1.34) + 40;
  } catch {
    return 0;
  }
}

/* ------------------------------------------------------------------ */
/* URL-safe base64 encode/decode (UTF-8 safe)                          */
/* ------------------------------------------------------------------ */

function encodePayload(obj: unknown): string {
  const json = JSON.stringify(obj);
  const b64 = btoa(unescape(encodeURIComponent(json)));
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function decodePayload<T>(encoded: string): T {
  let b64 = encoded.replace(/-/g, "+").replace(/_/g, "/");
  while (b64.length % 4) b64 += "=";
  const json = decodeURIComponent(escape(atob(b64)));
  return JSON.parse(json) as T;
}

/* ------------------------------------------------------------------ */
/* Password encryption (AES-GCM via Web Crypto)                         */
/* ------------------------------------------------------------------ */

function bufToB64(buf: ArrayBuffer | Uint8Array): string {
  const bytes = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
  let s = "";
  for (let i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]);
  return btoa(s);
}

function b64ToBuf(b64: string) {
  const s = atob(b64);
  const bytes = new Uint8Array(s.length);
  for (let i = 0; i < s.length; i++) bytes[i] = s.charCodeAt(i);
  return bytes;
}

async function deriveKey(
  password: string,
  salt: BufferSource
): Promise<CryptoKey> {
  const material = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveKey"]
  );
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt, iterations: 100000, hash: "SHA-256" },
    material,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

/* ------------------------------------------------------------------ */
/* Share link (admin -> client)                                        */
/* ------------------------------------------------------------------ */

interface ShareEnvelope {
  v: number;
  enc: boolean;
  proposal?: Proposal; // when enc === false
  salt?: string; // when enc === true (base64)
  iv?: string; // when enc === true (base64)
  ct?: string; // when enc === true (base64)
}

// The share link carries the full proposal but never the signature or the
// access password. If an access password is set, the proposal is AES-encrypted
// so the link is unreadable without the password.
export async function buildShareLink(proposal: Proposal): Promise<string> {
  const shared: Proposal = {
    ...proposal,
    signature: undefined,
    accessPassword: undefined,
  };
  let envelope: ShareEnvelope;

  const password = proposal.accessPassword?.trim();
  if (password) {
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const key = await deriveKey(password, salt);
    const ct = await crypto.subtle.encrypt(
      { name: "AES-GCM", iv },
      key,
      new TextEncoder().encode(JSON.stringify(shared))
    );
    envelope = {
      v: 1,
      enc: true,
      salt: bufToB64(salt),
      iv: bufToB64(iv),
      ct: bufToB64(ct),
    };
  } else {
    envelope = { v: 1, enc: false, proposal: shared };
  }

  const data = encodePayload(envelope);
  return `${window.location.origin}/proposal?d=${data}`;
}

export interface DecodedShare {
  encrypted: boolean;
  proposal: Proposal | null; // null when encrypted and not yet unlocked
  raw: ShareEnvelope;
}

// Reads the outer envelope. For unencrypted links the proposal is returned
// directly; for encrypted links call unlockShare() with the password.
export function decodeShare(data: string): DecodedShare | null {
  try {
    const env = decodePayload<ShareEnvelope>(data);
    if (env.enc) {
      return { encrypted: true, proposal: null, raw: env };
    }
    return { encrypted: false, proposal: env.proposal ?? null, raw: env };
  } catch {
    return null;
  }
}

// Attempts to decrypt a password-protected share. Returns null on wrong password.
export async function unlockShare(
  env: ShareEnvelope,
  password: string
): Promise<Proposal | null> {
  if (!env.salt || !env.iv || !env.ct) return null;
  try {
    const salt = b64ToBuf(env.salt);
    const iv = b64ToBuf(env.iv);
    const ct = b64ToBuf(env.ct);
    const key = await deriveKey(password, salt);
    const plain = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv },
      key,
      ct
    );
    return JSON.parse(new TextDecoder().decode(plain)) as Proposal;
  } catch {
    return null;
  }
}

/* ------------------------------------------------------------------ */
/* Receipt (client -> admin)                                           */
/* ------------------------------------------------------------------ */

export interface Receipt {
  v: number;
  id: string; // proposal id
  kind: "opened" | "signed";
  signature: Signature;
}

export function buildReceiptCode(
  proposalId: string,
  kind: "opened" | "signed",
  signature: Signature
): string {
  const receipt: Receipt = { v: 1, id: proposalId, kind, signature };
  return encodePayload(receipt);
}

export function decodeReceipt(input: string): Receipt | null {
  // Accept a raw code, or a full URL containing ?r=<code>
  let code = input.trim();
  const match = code.match(/[?&]r=([^&\s]+)/);
  if (match) code = match[1];
  try {
    const receipt = decodePayload<Receipt>(code);
    if (!receipt || !receipt.id || !receipt.signature) return null;
    return receipt;
  } catch {
    return null;
  }
}

export const STATUS_LABEL: Record<ProposalStatus, string> = {
  draft: "Draft",
  sent: "Sent",
  opened: "Opened",
  signed: "Signed",
};
