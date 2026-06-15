import {
  Proposal,
  PreparerSignature,
  Signature,
  formatDateIntl,
  formatMoney,
  formatSignedDateTime,
  lineItemTotal,
  proposalTotal,
} from "@/lib/proposals";

interface ProposalDocumentProps {
  proposal: Proposal;
}

// Renders text with paragraph breaks, and turns bullet lines (•, -) into lists.
function RichText({ text }: { text: string }) {
  if (!text?.trim()) return null;
  const blocks = text.split(/\n{2,}/);
  return (
    <>
      {blocks.map((block, i) => {
        const lines = block.split("\n").filter((l) => l.trim());
        const isList =
          lines.length > 0 && lines.every((l) => /^\s*[•\-*]\s+/.test(l));
        if (isList) {
          return (
            <ul key={i} className="list-disc pl-5 mb-3 space-y-1.5">
              {lines.map((l, j) => (
                <li key={j} className="text-sm leading-relaxed">
                  {l.replace(/^\s*[•\-*]\s+/, "")}
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p
            key={i}
            className="text-sm leading-relaxed mb-3 whitespace-pre-line"
          >
            {block}
          </p>
        );
      })}
    </>
  );
}

// One signature column (preparer or client).
function SignatureBlock({
  label,
  name,
  title,
  signatureDataUrl,
  signedAt,
  awaiting,
}: {
  label: string;
  name?: string;
  title?: string;
  signatureDataUrl?: string;
  signedAt?: string;
  awaiting?: boolean;
}) {
  return (
    <div>
      <p className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-3">
        {label}
      </p>
      <div className="h-20 flex items-end">
        {awaiting ? (
          <span className="text-sm italic text-neutral-400">
            Awaiting signature
          </span>
        ) : signatureDataUrl ? (
          <img
            src={signatureDataUrl}
            alt={`${name} signature`}
            className="h-16 object-contain"
          />
        ) : (
          <span className="text-2xl italic font-serif text-neutral-900">
            {name}
          </span>
        )}
      </div>
      <div className="border-t border-neutral-400 mt-1 pt-1">
        <p className="text-sm font-semibold text-neutral-900">{name || "—"}</p>
        {title && <p className="text-xs text-neutral-600">{title}</p>}
        {signedAt && (
          <p className="text-xs text-neutral-500 mt-0.5">
            Signed {formatDateIntl(signedAt)}
          </p>
        )}
      </div>
    </div>
  );
}

// The printable proposal. Light styling so it reads well in PDF export.
export default function ProposalDocument({ proposal }: ProposalDocumentProps) {
  const total = proposalTotal(proposal);
  const hasPricing = proposal.lineItems.some(
    (i) => i.description.trim() || i.unitPrice > 0
  );
  const preparer: PreparerSignature | undefined = proposal.preparerSignature;
  const client: Signature | undefined = proposal.signature;
  const clientSigned = !!client?.signedAt;

  return (
    <article className="bg-white text-neutral-900 rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
      {/* Hero — image banner, or a clean gradient header when there's no image */}
      {proposal.heroImage ? (
        <div className="relative h-48 md:h-56 w-full">
          <img
            src={proposal.heroImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 px-8 md:px-12 py-6">
            <p className="text-xs font-mono uppercase tracking-widest text-white/70 mb-2">
              Proposal
            </p>
            <h1 className="text-2xl md:text-3xl font-bold font-mono tracking-tight text-white">
              {proposal.title || "Untitled Proposal"}
            </h1>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-br from-neutral-900 to-neutral-700 px-8 md:px-12 py-10">
          <p className="text-xs font-mono uppercase tracking-widest text-white/60 mb-2">
            Proposal
          </p>
          <h1 className="text-2xl md:text-3xl font-bold font-mono tracking-tight text-white">
            {proposal.title || "Untitled Proposal"}
          </h1>
        </div>
      )}

      <div className="p-8 md:p-12">
        {/* Meta */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-6 mb-8 border-b border-neutral-200 text-sm">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-1">
              Prepared for
            </p>
            <p className="font-semibold text-neutral-900">
              {proposal.clientName || "—"}
            </p>
            {proposal.clientCompany && (
              <p className="text-neutral-600">{proposal.clientCompany}</p>
            )}
          </div>
          <div className="sm:text-right">
            <p className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-1">
              Prepared by
            </p>
            <p className="font-semibold text-neutral-900">
              {proposal.preparedBy || "—"}
            </p>
            <p className="text-neutral-600 mt-1">
              {formatDateIntl(proposal.date)}
              {proposal.validUntil
                ? ` · Valid until ${formatDateIntl(proposal.validUntil)}`
                : ""}
            </p>
          </div>
        </div>

        {/* Introduction */}
        {proposal.introduction.trim() && (
          <section className="mb-8">
            <RichText text={proposal.introduction} />
          </section>
        )}

        {/* Sections */}
        {proposal.sections
          .filter((s) => s.heading.trim() || s.body.trim())
          .map((section) => (
            <section key={section.id} className="mb-7">
              {section.heading.trim() && (
                <h2 className="text-lg font-bold font-mono tracking-tight text-neutral-900 mb-2">
                  {section.heading}
                </h2>
              )}
              <RichText text={section.body} />
            </section>
          ))}

        {/* Pricing */}
        {hasPricing && (
          <section className="mb-8">
            <h2 className="text-lg font-bold font-mono tracking-tight text-neutral-900 mb-3">
              Investment
            </h2>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-neutral-300 text-left">
                  <th className="py-2 font-mono font-semibold">Description</th>
                  <th className="py-2 font-mono font-semibold text-right w-16">
                    Qty
                  </th>
                  <th className="py-2 font-mono font-semibold text-right w-32">
                    Unit Price
                  </th>
                  <th className="py-2 font-mono font-semibold text-right w-32">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {proposal.lineItems
                  .filter((i) => i.description.trim() || i.unitPrice > 0)
                  .map((item) => (
                    <tr key={item.id} className="border-b border-neutral-200">
                      <td className="py-2 pr-2">{item.description || "—"}</td>
                      <td className="py-2 text-right">{item.quantity}</td>
                      <td className="py-2 text-right">
                        {formatMoney(item.unitPrice, proposal.currency)}
                      </td>
                      <td className="py-2 text-right font-medium">
                        {formatMoney(lineItemTotal(item), proposal.currency)}
                      </td>
                    </tr>
                  ))}
              </tbody>
              <tfoot>
                <tr>
                  <td
                    colSpan={3}
                    className="py-3 text-right font-mono font-bold"
                  >
                    Total
                  </td>
                  <td className="py-3 text-right font-mono font-bold">
                    {formatMoney(total, proposal.currency)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </section>
        )}

        {/* Payment & Terms */}
        {proposal.terms.trim() && (
          <section className="mb-2">
            <h2 className="text-lg font-bold font-mono tracking-tight text-neutral-900 mb-2">
              Payment &amp; Terms
            </h2>
            <RichText text={proposal.terms} />
          </section>
        )}

        {/* Signatures — yours always; the client's once signed */}
        <section className="mt-10 pt-6 border-t border-neutral-300">
          <h2 className="text-lg font-bold font-mono tracking-tight text-neutral-900 mb-5">
            Signatures
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            <SignatureBlock
              label="Prepared & offered by"
              name={preparer?.name || proposal.preparedBy}
              title={preparer?.title}
              signatureDataUrl={preparer?.signatureDataUrl}
              signedAt={preparer?.signedAt}
            />
            <SignatureBlock
              label="Accepted & signed by"
              name={client?.signerName || proposal.clientName}
              title={client?.signerTitle}
              signatureDataUrl={client?.signatureDataUrl}
              signedAt={client?.signedAt}
              awaiting={!clientSigned}
            />
          </div>
        </section>

        {/* Digital-signature footer */}
        {clientSigned && (
          <p className="mt-8 pt-4 border-t border-neutral-200 text-xs text-neutral-500 font-mono text-center leading-relaxed">
            This proposal was signed digitally by {client!.signerName} on{" "}
            {formatSignedDateTime(client!.signedAt, client!.timezone)}.
            <br />
            Digital signature — no wet-ink signature required.
          </p>
        )}
      </div>
    </article>
  );
}
