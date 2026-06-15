// Export a rendered proposal element to PDF using html2pdf.js (already a dependency).

export function exportProposalPDF(element: HTMLElement | null, filename: string) {
  if (!element) return;
  import("html2pdf.js")
    .then((html2pdf) => {
      const clone = element.cloneNode(true) as HTMLElement;

      // Hide anything marked as no-print (buttons, controls).
      clone
        .querySelectorAll<HTMLElement>("[data-no-print]")
        .forEach((el) => (el.style.display = "none"));

      const container = document.createElement("div");
      container.style.background = "#ffffff";
      container.style.color = "#111111";
      container.appendChild(clone);

      const opt = {
        margin: 12,
        filename,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, backgroundColor: "#ffffff" },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        pagebreak: { mode: ["css", "legacy"] },
      };

      html2pdf.default().from(container).set(opt).save();
    })
    .catch((error) => {
      console.error("Failed to load html2pdf", error);
      alert("PDF export failed. Please try again.");
    });
}
