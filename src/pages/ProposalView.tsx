import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Download, PenLine, Copy, Check, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import ProposalDocument from "@/components/proposal/ProposalDocument";
import SignaturePad from "@/components/proposal/SignaturePad";
import { exportProposalPDF } from "@/lib/proposal-pdf";
import {
  Proposal,
  Signature,
  buildReceiptCode,
  decodeReceipt,
  decodeShare,
  unlockShare,
} from "@/lib/proposals";

const ADMIN_EMAIL = "prasaja@hey.com";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ProposalView() {
  const [params] = useSearchParams();
  const data = params.get("d");
  const receiptParam = params.get("r");
  const docRef = useRef<HTMLDivElement>(null);

  const openedAt = useMemo(() => new Date().toISOString(), []);
  const decoded = useMemo(() => (data ? decodeShare(data) : null), [data]);
  // When the link already carries a signature (a "signed copy" link), show it merged.
  const incomingReceipt = useMemo(
    () => (receiptParam ? decodeReceipt(receiptParam) : null),
    [receiptParam]
  );

  // The unlocked proposal (immediately for open links, after password for encrypted ones).
  const [unlocked, setUnlocked] = useState<Proposal | null>(
    decoded && !decoded.encrypted ? decoded.proposal : null
  );
  const [password, setPassword] = useState("");
  const [unlockError, setUnlockError] = useState(false);
  const [unlocking, setUnlocking] = useState(false);

  // Signing form
  const [signerName, setSignerName] = useState("");
  const [signerTitle, setSignerTitle] = useState("");
  const [signerEmail, setSignerEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [signatureDataUrl, setSignatureDataUrl] = useState<string | undefined>();
  const [signed, setSigned] = useState(false);
  const [signedProposal, setSignedProposal] = useState<Proposal | null>(null);
  const [receiptCode, setReceiptCode] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.title = unlocked ? `${unlocked.title} — Proposal` : "Proposal";
  }, [unlocked]);

  /* ----------------------- invalid / missing ---------------------- */
  if (!data || !decoded) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-32 text-center">
        <h1 className="text-2xl font-bold font-mono tracking-tight mb-4">
          Proposal not found
        </h1>
        <p className="text-sm text-muted-foreground font-mono">
          This link is incomplete or invalid. Please ask the sender for a new
          proposal link.
        </p>
      </div>
    );
  }

  /* --------------------------- password --------------------------- */
  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!decoded.encrypted) return;
    setUnlocking(true);
    setUnlockError(false);
    const result = await unlockShare(decoded.raw, password);
    setUnlocking(false);
    if (result) setUnlocked(result);
    else setUnlockError(true);
  };

  if (decoded.encrypted && !unlocked) {
    return (
      <div className="max-w-md mx-auto px-4 py-32 mt-10">
        <div className="rounded-lg border border-border p-8">
          <h1 className="text-xl font-bold font-mono tracking-tight mb-2 flex items-center gap-2">
            <Lock className="h-5 w-5" /> Protected proposal
          </h1>
          <p className="text-sm text-muted-foreground mb-6">
            This proposal is password-protected. Enter the password the sender
            gave you to open it.
          </p>
          <form onSubmit={handleUnlock}>
            <Label htmlFor="pw">Password</Label>
            <Input
              id="pw"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5"
              autoFocus
            />
            {unlockError && (
              <p className="text-sm text-destructive mt-2">
                Incorrect password. Please try again.
              </p>
            )}
            <Button type="submit" className="w-full mt-4" disabled={unlocking}>
              {unlocking ? "Unlocking…" : "Open proposal"}
            </Button>
          </form>
        </div>
      </div>
    );
  }

  if (!unlocked) return null; // momentary state

  /* ----------------------------- sign ----------------------------- */
  const isSignedCopy = !!incomingReceipt?.signature?.signedAt;
  const canSign =
    signerName.trim().length > 1 && EMAIL_RE.test(signerEmail.trim()) && agreed;

  const handleSign = () => {
    if (!canSign) return;
    const signature: Signature = {
      signerName: signerName.trim(),
      signerTitle: signerTitle.trim() || undefined,
      signerEmail: signerEmail.trim(),
      signatureDataUrl,
      agreed: true,
      openedAt,
      signedAt: new Date().toISOString(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
    const code = buildReceiptCode(unlocked.id, "signed", signature);
    setReceiptCode(code);
    setSignedProposal({ ...unlocked, signature, status: "signed" });
    setSigned(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // A link that reopens this proposal WITH the signature merged in (the signed copy).
  const signedCopyLink = `${window.location.origin}/proposal?d=${data}&r=${receiptCode}`;

  const copySignedLink = async () => {
    try {
      await navigator.clipboard.writeText(signedCopyLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      prompt("Copy this link:", signedCopyLink);
    }
  };

  const sendEmailHref = `mailto:${encodeURIComponent(
    signerEmail.trim()
  )}?cc=${ADMIN_EMAIL}&subject=${encodeURIComponent(
    `Signed proposal: ${unlocked.title}`
  )}&body=${encodeURIComponent(
    `Hi,\n\nThis confirms that ${signerName} signed the proposal "${unlocked.title}".\n\n` +
      `Open the signed copy here:\n${signedCopyLink}\n\n` +
      `(Prasaja is cc'd on this email so the signature is recorded.)\n\nThank you.`
  )}`;

  const displayProposal = signed
    ? signedProposal!
    : isSignedCopy
    ? { ...unlocked, signature: incomingReceipt!.signature, status: "signed" as const }
    : unlocked;

  const showSignForm = !signed && !isSignedCopy;

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-10 mt-20">
      {/* Post-sign confirmation: email the signed copy to client + admin */}
      {signed && (
        <div className="mb-8 rounded-lg border border-primary/40 bg-primary/5 p-5">
          <h2 className="text-base font-bold font-mono tracking-tight mb-2 flex items-center gap-2">
            <Check className="h-5 w-5 text-primary" /> Proposal signed
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            After signing, you'll have the signed copy sent to your email. Click
            below to email it to yourself ({signerEmail.trim()}) and to Prasaja
            ({ADMIN_EMAIL}). You can also download a PDF for your records.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild className="gap-2">
              <a href={sendEmailHref}>
                <Mail className="h-4 w-4" /> Email the signed copy
              </a>
            </Button>
            <Button onClick={copySignedLink} variant="outline" className="gap-2">
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              {copied ? "Copied!" : "Copy signed-copy link"}
            </Button>
          </div>
        </div>
      )}

      {/* "You're viewing a signed copy" note */}
      {isSignedCopy && !signed && (
        <div className="mb-8 rounded-lg border border-border bg-muted/30 p-4">
          <p className="text-sm flex items-center gap-2">
            <Check className="h-4 w-4 text-primary" />
            Signed copy — signed by {incomingReceipt!.signature.signerName}.
          </p>
        </div>
      )}

      {/* The proposal document */}
      <div ref={docRef}>
        <ProposalDocument proposal={displayProposal} />
      </div>

      {/* Actions */}
      <div className="mt-6 flex flex-wrap gap-3" data-no-print>
        <Button
          variant="outline"
          className="gap-2"
          onClick={() =>
            exportProposalPDF(
              docRef.current,
              `${displayProposal.title.replace(/\s+/g, "-")}.pdf`
            )
          }
        >
          <Download className="h-4 w-4" /> Download PDF
        </Button>
      </div>

      {/* Signing form */}
      {showSignForm && (
        <section className="mt-10 rounded-lg border border-border p-6" data-no-print>
          <h2 className="text-lg font-bold font-mono tracking-tight mb-1 flex items-center gap-2">
            <PenLine className="h-5 w-5" /> Sign this proposal
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            By signing, you confirm you've read and agree to this proposal. After
            signing, you'll have the signed copy sent to your email.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="signerName">Full name *</Label>
              <Input
                id="signerName"
                value={signerName}
                onChange={(e) => setSignerName(e.target.value)}
                placeholder="Jane Doe"
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="signerEmail">Your email *</Label>
              <Input
                id="signerEmail"
                type="email"
                value={signerEmail}
                onChange={(e) => setSignerEmail(e.target.value)}
                placeholder="jane@company.com"
                className="mt-1.5"
              />
            </div>
          </div>

          <div className="mb-4">
            <Label htmlFor="signerTitle">Title / Company</Label>
            <Input
              id="signerTitle"
              value={signerTitle}
              onChange={(e) => setSignerTitle(e.target.value)}
              placeholder="CEO, Acme Inc."
              className="mt-1.5"
            />
          </div>

          <div className="mb-4">
            <Label>Signature (optional)</Label>
            <div className="mt-1.5">
              <SignaturePad onChange={setSignatureDataUrl} />
            </div>
          </div>

          <div className="flex items-start gap-2 mb-6">
            <Checkbox
              id="agree"
              checked={agreed}
              onCheckedChange={(v) => setAgreed(v === true)}
              className="mt-0.5"
            />
            <Label htmlFor="agree" className="text-sm font-normal leading-snug">
              I have read and agree to the terms of this proposal.
            </Label>
          </div>

          <Button onClick={handleSign} disabled={!canSign} className="gap-2">
            <PenLine className="h-4 w-4" /> Sign proposal
          </Button>
        </section>
      )}
    </div>
  );
}
