// Resize + compress an uploaded image to a small JPEG data URL.
//
// Hero images travel *inside* the share link (there's no backend), so they must
// be kept small or the URL becomes too long. We downscale and step the JPEG
// quality down until the data URL fits under a character budget.

export function fileToResizedDataUrl(
  file: File,
  opts: { maxWidth?: number; maxChars?: number } = {}
): Promise<string> {
  const maxWidth = opts.maxWidth ?? 1000;
  const maxChars = opts.maxChars ?? 45000;

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Could not read the file."));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("Could not load the image."));
      img.onload = () => {
        const scale = Math.min(1, maxWidth / img.width);
        const w = Math.max(1, Math.round(img.width * scale));
        const h = Math.max(1, Math.round(img.height * scale));

        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("Canvas is not supported."));

        // White backdrop so transparent PNGs don't turn black as JPEG.
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, w, h);
        ctx.drawImage(img, 0, 0, w, h);

        let quality = 0.82;
        let out = canvas.toDataURL("image/jpeg", quality);
        while (out.length > maxChars && quality > 0.4) {
          quality -= 0.1;
          out = canvas.toDataURL("image/jpeg", quality);
        }
        resolve(out);
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}
