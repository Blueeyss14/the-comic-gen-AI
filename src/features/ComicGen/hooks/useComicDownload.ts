import { useCallback } from "react";

export function useComicDownload() {
  const downloadAsPNG = useCallback(
    async (imageUrl: string, filename: string = "comic") => {
      try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = `${filename}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Failed to download PNG:", error);
        throw new Error("Failed to download comic as PNG");
      }
    },
    [],
  );

  const downloadAsPDF = useCallback(
    async (imageUrl: string, filename: string = "comic") => {
      try {
        const { jsPDF } = await import("jspdf");

        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);

        const img = new Image();
        img.crossOrigin = "anonymous";

        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
          img.src = blobUrl;
        });

        const pdf = new jsPDF({ orientation: "portrait", unit: "mm" });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgRatio = img.width / img.height;

        let finalWidth = pdfWidth - 20;
        let finalHeight = finalWidth / imgRatio;

        if (finalHeight > pdfHeight - 20) {
          finalHeight = pdfHeight - 20;
          finalWidth = finalHeight * imgRatio;
        }

        pdf.addImage(blobUrl, "PNG", 10, 10, finalWidth, finalHeight);
        pdf.save(`${filename}.pdf`);

        window.URL.revokeObjectURL(blobUrl);
      } catch (error) {
        console.error("Failed to download PDF:", error);
        throw new Error("Failed to download comic as PDF.");
      }
    },
    [],
  );

  return { downloadAsPNG, downloadAsPDF };
}
