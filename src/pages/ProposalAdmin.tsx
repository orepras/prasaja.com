import { useRef, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Link2,
  Download,
  Check,
  ArrowLeft,
  Inbox,
  Lock,
  X,
  ImagePlus,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import ProposalDocument from "@/components/proposal/ProposalDocument";
import SignaturePad from "@/components/proposal/SignaturePad";
import { exportProposalPDF } from "@/lib/proposal-pdf";
import { fileToResizedDataUrl } from "@/lib/image";
import {
  ADMIN_PASSWORD,
  Proposal,
  ProposalStatus,
  STATUS_LABEL,
  buildShareLink,
  createEmptyProposal,
  decodeReceipt,
  deleteProposal,
  estimateShareLength,
  formatMoney,
  getProposals,
  isAdminAuthed,
  proposalTotal,
  saveProposal,
  setAdminAuthed,
  setSavedSignature,
  uid,
} from "@/lib/proposals";

type View = "list" | "edit" | "preview";

const statusVariant: Record<
  ProposalStatus,
  "default" | "secondary" | "outline" | "destructive"
> = {
  draft: "outline",
  sent: "secondary",
  opened: "secondary",
  signed: "default",
};

export default function ProposalAdmin() {
  const [authed, setAuthed] = useState(isAdminAuthed());
  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState(false);

  const [view, setView] = useState<View>("list");
  const [proposals, setProposals] = useState<Proposal[]>(() => getProposals());
  const [draft, setDraft] = useState<Proposal | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [importValue, setImportValue] = useState("");
  const [importMsg, setImportMsg] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const refresh = () => setProposals(getProposals());

  /* ----------------------------- auth ----------------------------- */
  if (!authed) {
    return (
      <div className="max-w-md mx-auto px-4 py-32 mt-10">
        <div className="rounded-lg border border-border p-8">
          <h1 className="text-xl font-bold font-mono tracking-tight mb-2 flex items-center gap-2">
            <Lock className="h-5 w-5" /> Admin access
          </h1>
          <p className="text-sm text-muted-foreground mb-6">
            Enter the password to manage proposals.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (pw === ADMIN_PASSWORD) {
                setAdminAuthed(true);
                setAuthed(true);
                setPwError(false);
              } else {
                setPwError(true);
              }
            }}
          >
            <Label htmlFor="pw">Password</Label>
            <Input
              id="pw"
              type="password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              className="mt-1.5"
              autoFocus
            />
            {pwError && (
              <p className="text-sm text-destructive mt-2">
                Incorrect password.
              </p>
            )}
            <Button type="submit" className="w-full mt-4">
              Unlock
            </Button>
          </form>
        </div>
      </div>
    );
  }

  /* --------------------------- handlers --------------------------- */
  const startNew = () => {
    setDraft(createEmptyProposal());
    setView("edit");
  };

  const startEdit = (p: Proposal) => {
    setDraft(JSON.parse(JSON.stringify(p)));
    setView("edit");
  };

  const handleSave = () => {
    if (!draft) return;
    // Keep your signature's name in sync with "Prepared by", and stamp the time
    // it was added (the first time a signature image is present).
    let toSave = draft;
    const ps = draft.preparerSignature;
    if (ps) {
      toSave = {
        ...draft,
        preparerSignature: {
          ...ps,
          name: draft.preparedBy,
          signedAt:
            ps.signatureDataUrl && !ps.signedAt
              ? new Date().toISOString()
              : ps.signedAt,
          timezone:
            ps.signatureDataUrl && !ps.timezone
              ? Intl.DateTimeFormat().resolvedOptions().timeZone
              : ps.timezone,
        },
      };
    }
    saveProposal(toSave);
    refresh();
    setView("list");
    setDraft(null);
  };

  const handleDelete = (id: string) => {
    if (!confirm("Delete this proposal? This cannot be undone.")) return;
    deleteProposal(id);
    refresh();
  };

  const copyShareLink = async (p: Proposal) => {
    const link = await buildShareLink(p);
    try {
      await navigator.clipboard.writeText(link);
      setCopiedId(p.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      prompt("Copy this share link:", link);
    }
    // Mark as sent (unless already further along).
    if (p.status === "draft") {
      saveProposal({ ...p, status: "sent" });
      refresh();
    }
  };

  const importReceipt = () => {
    const receipt = decodeReceipt(importValue);
    if (!receipt) {
      setImportMsg("Could not read that confirmation link or code.");
      return;
    }
    const target = getProposals().find((p) => p.id === receipt.id);
    if (!target) {
      setImportMsg(
        "No matching proposal found. Make sure it was created on this device/browser."
      );
      return;
    }
    saveProposal({
      ...target,
      signature: receipt.signature,
      status: receipt.kind === "signed" ? "signed" : "opened",
    });
    refresh();
    setImportValue("");
    setImportMsg(
      `Recorded: "${target.title}" is now ${
        receipt.kind === "signed" ? "Signed" : "Opened"
      } by ${receipt.signature.signerName}.`
    );
  };

  /* ----------------------------- views ---------------------------- */
  if (view === "preview" && draft) {
    return (
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-10 mt-20">
        <div className="flex items-center justify-between mb-6" data-no-print>
          <Button variant="ghost" onClick={() => setView("edit")} className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to edit
          </Button>
          <Button
            variant="outline"
            className="gap-2"
            onClick={() =>
              exportProposalPDF(
                previewRef.current,
                `${draft.title.replace(/\s+/g, "-")}.pdf`
              )
            }
          >
            <Download className="h-4 w-4" /> Download PDF
          </Button>
        </div>
        <div ref={previewRef}>
          <ProposalDocument proposal={draft} />
        </div>
      </div>
    );
  }

  if (view === "edit" && draft) {
    return (
      <ProposalEditor
        draft={draft}
        setDraft={setDraft}
        onSave={handleSave}
        onCancel={() => {
          setView("list");
          setDraft(null);
        }}
        onPreview={() => setView("preview")}
      />
    );
  }

  /* ----------------------------- list ----------------------------- */
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-10 mt-20">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold font-mono tracking-tight">
            Proposals
          </h1>
          <p className="text-sm text-muted-foreground">
            Create, share, and track your client proposals.
          </p>
        </div>
        <Button onClick={startNew} className="gap-2">
          <Plus className="h-4 w-4" /> New proposal
        </Button>
      </div>

      {/* Import confirmation */}
      <div className="rounded-lg border border-border p-5 mb-8">
        <h2 className="text-sm font-bold font-mono tracking-tight mb-2 flex items-center gap-2">
          <Inbox className="h-4 w-4" /> Record a client confirmation
        </h2>
        <p className="text-xs text-muted-foreground mb-3">
          Paste the confirmation link a client sent back after signing, to mark
          the proposal as signed and store their signature.
        </p>
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            value={importValue}
            onChange={(e) => setImportValue(e.target.value)}
            placeholder="Paste confirmation link or code…"
          />
          <Button onClick={importReceipt} disabled={!importValue.trim()}>
            Record
          </Button>
        </div>
        {importMsg && (
          <p className="text-sm mt-3 text-foreground">{importMsg}</p>
        )}
      </div>

      {/* List */}
      {proposals.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-border rounded-lg">
          <p className="text-sm text-muted-foreground">
            No proposals yet. Create your first one.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {proposals.map((p) => (
            <div
              key={p.id}
              className="rounded-lg border border-border p-4 flex flex-wrap items-center justify-between gap-3"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold font-mono tracking-tight truncate">
                    {p.title}
                  </h3>
                  <Badge variant={statusVariant[p.status]}>
                    {STATUS_LABEL[p.status]}
                  </Badge>
                  {p.accessPassword?.trim() && (
                    <Lock
                      className="h-3.5 w-3.5 text-muted-foreground"
                      aria-label="Password protected"
                    />
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {p.clientName || "No client"}
                  {p.clientCompany ? ` · ${p.clientCompany}` : ""} ·{" "}
                  {formatMoney(proposalTotal(p), p.currency)}
                  {p.signature?.signedAt
                    ? ` · Signed by ${p.signature.signerName}`
                    : ""}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1.5"
                  onClick={() => copyShareLink(p)}
                  title="Copy share link"
                >
                  {copiedId === p.id ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Link2 className="h-4 w-4" />
                  )}
                  <span className="hidden sm:inline">
                    {copiedId === p.id ? "Copied" : "Share"}
                  </span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1.5"
                  onClick={() => startEdit(p)}
                >
                  <Pencil className="h-4 w-4" />
                  <span className="hidden sm:inline">Edit</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(p.id)}
                  title="Delete"
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ================================================================== */
/* Editor                                                              */
/* ================================================================== */

interface EditorProps {
  draft: Proposal;
  setDraft: (p: Proposal) => void;
  onSave: () => void;
  onCancel: () => void;
  onPreview: () => void;
}

function ProposalEditor({
  draft,
  setDraft,
  onSave,
  onCancel,
  onPreview,
}: EditorProps) {
  const update = (patch: Partial<Proposal>) => setDraft({ ...draft, ...patch });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleImage = async (file: File | undefined) => {
    if (!file) return;
    setUploadError(null);
    try {
      const dataUrl = await fileToResizedDataUrl(file, { maxWidth: 1000 });
      update({ heroImage: dataUrl });
    } catch {
      setUploadError("Could not process that image. Try a different file.");
    }
  };

  const setSignature = (dataUrl: string | undefined) => {
    setSavedSignature(dataUrl); // remember for next time
    setDraft({
      ...draft,
      preparerSignature: {
        ...(draft.preparerSignature ?? { name: draft.preparedBy }),
        name: draft.preparedBy,
        signatureDataUrl: dataUrl,
        // reset the stamp so save records a fresh time for the new signature
        signedAt: undefined,
        timezone: undefined,
      },
    });
  };

  // Rough share-link size, to warn when a hero image makes the link too long.
  const linkKb = Math.round(estimateShareLength(draft) / 1024);
  const linkTooLong = linkKb > 24;

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-10 mt-20">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold font-mono tracking-tight">
          {draft.title || "Untitled Proposal"}
        </h1>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={onCancel} className="gap-1.5">
            <X className="h-4 w-4" /> Cancel
          </Button>
          <Button variant="outline" onClick={onPreview}>
            Preview
          </Button>
          <Button onClick={onSave}>Save</Button>
        </div>
      </div>

      <Tabs defaultValue="details">
        <TabsList className="mb-6">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="pricing">Pricing</TabsTrigger>
        </TabsList>

        {/* Details */}
        <TabsContent value="details" className="space-y-4">
          <Field label="Proposal title">
            <Input
              value={draft.title}
              onChange={(e) => update({ title: e.target.value })}
              placeholder="Website Copywriting Engagement"
            />
          </Field>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Client name">
              <Input
                value={draft.clientName}
                onChange={(e) => update({ clientName: e.target.value })}
              />
            </Field>
            <Field label="Client company">
              <Input
                value={draft.clientCompany ?? ""}
                onChange={(e) => update({ clientCompany: e.target.value })}
              />
            </Field>
          </div>
          <Field label="Prepared by">
            <Input
              value={draft.preparedBy}
              onChange={(e) => update({ preparedBy: e.target.value })}
            />
          </Field>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Field label="Date">
              <Input
                type="date"
                value={draft.date}
                onChange={(e) => update({ date: e.target.value })}
              />
            </Field>
            <Field label="Valid until">
              <Input
                type="date"
                value={draft.validUntil ?? ""}
                onChange={(e) => update({ validUntil: e.target.value })}
              />
            </Field>
            <Field label="Currency">
              <Input
                value={draft.currency}
                onChange={(e) =>
                  update({ currency: e.target.value.toUpperCase() })
                }
                placeholder="IDR"
              />
            </Field>
          </div>
          <Field label="Access password (optional)">
            <Input
              value={draft.accessPassword ?? ""}
              onChange={(e) => update({ accessPassword: e.target.value })}
              placeholder="Leave blank for no password"
              autoComplete="off"
            />
            <p className="text-xs text-muted-foreground mt-1.5">
              If set, the share link is encrypted and the client must enter this
              password to open it. Share the password with the client separately
              (e.g. a different channel). Re-copy the share link after changing
              it.
            </p>
          </Field>

          {/* Hero image */}
          <Field label="Header image (optional)">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleImage(e.target.files?.[0])}
            />
            {draft.heroImage ? (
              <div className="space-y-2">
                <div className="relative h-32 w-full overflow-hidden rounded-md border border-border">
                  <img
                    src={draft.heroImage}
                    alt="Header preview"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Replace
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => update({ heroImage: undefined })}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                type="button"
                variant="outline"
                className="gap-2"
                onClick={() => fileInputRef.current?.click()}
              >
                <ImagePlus className="h-4 w-4" /> Upload image
              </Button>
            )}
            {uploadError && (
              <p className="text-xs text-destructive mt-1.5">{uploadError}</p>
            )}
            <p className="text-xs text-muted-foreground mt-1.5">
              Shown as a banner at the top. Without an image the header still
              looks polished. Images are compressed, but the picture travels
              inside the share link — keep it light.
            </p>
          </Field>

          {/* Your signature */}
          <Field label="Your signature (optional)">
            {draft.preparerSignature?.signatureDataUrl && (
              <div className="mb-2 inline-flex items-center gap-3 rounded-md border border-border bg-muted/30 px-3 py-2">
                <img
                  src={draft.preparerSignature.signatureDataUrl}
                  alt="Your signature"
                  className="h-10 object-contain"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setSignature(undefined)}
                >
                  Remove
                </Button>
              </div>
            )}
            <SignaturePad onChange={setSignature} />
            <p className="text-xs text-muted-foreground mt-1.5">
              Drawn here, your signature appears on every copy the client sees
              and is remembered for your next proposal. If you leave it blank,
              your name ({draft.preparedBy || "—"}) is shown instead.
            </p>
          </Field>

          {/* Share link size */}
          <div
            className={`rounded-md border p-3 text-xs ${
              linkTooLong
                ? "border-destructive/40 bg-destructive/5 text-destructive"
                : "border-border text-muted-foreground"
            }`}
          >
            {linkTooLong ? (
              <span className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />
                Estimated share link size ~{linkKb} KB. This may be too long for
                some clients to open — use a smaller/lighter header image, or
                remove it.
              </span>
            ) : (
              <>Estimated share link size ~{linkKb} KB.</>
            )}
          </div>
        </TabsContent>

        {/* Content */}
        <TabsContent value="content" className="space-y-4">
          <Field label="Introduction">
            <Textarea
              rows={4}
              value={draft.introduction}
              onChange={(e) => update({ introduction: e.target.value })}
              placeholder="A short opening that frames the engagement…"
            />
          </Field>

          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Sections</Label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="gap-1.5"
                onClick={() =>
                  update({
                    sections: [
                      ...draft.sections,
                      { id: uid(), heading: "", body: "" },
                    ],
                  })
                }
              >
                <Plus className="h-4 w-4" /> Add section
              </Button>
            </div>
            <div className="space-y-4">
              {draft.sections.map((s, i) => (
                <div key={s.id} className="rounded-md border border-border p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Input
                      value={s.heading}
                      placeholder="Section heading"
                      onChange={(e) => {
                        const sections = [...draft.sections];
                        sections[i] = { ...s, heading: e.target.value };
                        update({ sections });
                      }}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        update({
                          sections: draft.sections.filter(
                            (x) => x.id !== s.id
                          ),
                        })
                      }
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                  <Textarea
                    rows={4}
                    value={s.body}
                    placeholder="Section content. Use blank lines to separate paragraphs."
                    onChange={(e) => {
                      const sections = [...draft.sections];
                      sections[i] = { ...s, body: e.target.value };
                      update({ sections });
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <Field label="Terms">
            <Textarea
              rows={4}
              value={draft.terms}
              onChange={(e) => update({ terms: e.target.value })}
            />
          </Field>
        </TabsContent>

        {/* Pricing */}
        <TabsContent value="pricing" className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Line items ({draft.currency})</Label>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="gap-1.5"
              onClick={() =>
                update({
                  lineItems: [
                    ...draft.lineItems,
                    { id: uid(), description: "", quantity: 1, unitPrice: 0 },
                  ],
                })
              }
            >
              <Plus className="h-4 w-4" /> Add item
            </Button>
          </div>

          <div className="space-y-2">
            {draft.lineItems.map((item, i) => (
              <div
                key={item.id}
                className="grid grid-cols-12 gap-2 items-center"
              >
                <Input
                  className="col-span-6"
                  value={item.description}
                  placeholder="Description"
                  onChange={(e) => {
                    const lineItems = [...draft.lineItems];
                    lineItems[i] = { ...item, description: e.target.value };
                    update({ lineItems });
                  }}
                />
                <Input
                  className="col-span-2"
                  type="number"
                  min={0}
                  value={item.quantity}
                  onChange={(e) => {
                    const lineItems = [...draft.lineItems];
                    lineItems[i] = { ...item, quantity: Number(e.target.value) };
                    update({ lineItems });
                  }}
                />
                <Input
                  className="col-span-3"
                  type="number"
                  min={0}
                  value={item.unitPrice}
                  onChange={(e) => {
                    const lineItems = [...draft.lineItems];
                    lineItems[i] = {
                      ...item,
                      unitPrice: Number(e.target.value),
                    };
                    update({ lineItems });
                  }}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="col-span-1"
                  onClick={() =>
                    update({
                      lineItems: draft.lineItems.filter(
                        (x) => x.id !== item.id
                      ),
                    })
                  }
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))}
          </div>

          <div className="text-right text-sm font-mono font-bold pt-2 border-t border-border">
            Total: {formatMoney(proposalTotal(draft), draft.currency)}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label className="mb-1.5 block">{label}</Label>
      {children}
    </div>
  );
}
