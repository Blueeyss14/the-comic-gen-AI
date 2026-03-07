import { useState, useEffect } from "react";
import { useComicDownload } from "../../hooks/useComicDownload";
import IconButton from "../../../../shared/components/Buttons/IconButton";
import { Asset } from "../../../../res/assets";
import LoadingButton from "../../../../shared/components/Buttons/LoadingButton";

interface ComicResultPageProps {
  imageUrl: string | null;
  onRegenerate: () => void;
  isGenerating: boolean;
}

const ComicResultPage = ({
  imageUrl,
  onRegenerate,
  isGenerating,
}: ComicResultPageProps) => {
  const { downloadAsPNG, downloadAsPDF } = useComicDownload();

  const [isDownloading, setIsDownloading] = useState(false);
  const [isPNGDownloading, setIsPNGDownloading] = useState(false);
  const [isPDFDownloading, setIsPDFDownloading] = useState(false);

  const [maxSize, setMaxSize] = useState(window.innerWidth <= 840);

  useEffect(() => {
    const handleResize = () => {
      setMaxSize(window.innerWidth <= 840);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDownloadPNG = async () => {
    if (!imageUrl) return;

    setIsDownloading(true);
    setIsPNGDownloading(true);

    try {
      await downloadAsPNG(imageUrl, "my-comic");
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setIsDownloading(false);
      setIsPNGDownloading(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!imageUrl) return;

    setIsDownloading(true);
    setIsPDFDownloading(true);

    try {
      await downloadAsPDF(imageUrl, "my-comic");
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setIsDownloading(false);
      setIsPDFDownloading(false);
    }
  };

  if (!imageUrl && !isGenerating) {
    return null;
  }

  return (
    <div className="w-full h-full flex justify-center items-start">
      <div>
        <div className="w-200 [@media(max-width:840px)]:w-[95vw] p-10 bg-grayy/60 border mt-10 border-whitee/20 backdrop-blur-[3px] rounded-[10px] mb-5 overflow-clip cursor-pointer whitespace-nowrap">
          {isGenerating ? (
            <div></div>
          ) : imageUrl ? (
            <div className="w-full h-100">
              <img
                src={imageUrl}
                alt="comic"
                className="w-full h-full object-contain"
              />
            </div>
          ) : null}
        </div>

        <div className="flex items-center justify-between w-full">
          <div className="flex gap-3">
            {isPNGDownloading ? (
              <LoadingButton
                padding="py-2.5 px-4"
                onClick={handleDownloadPNG}
                text={`${maxSize ? "..." : "Downloading..."}`}
                icon={Asset.Send}
                iconSize="w-4 h-4"
                fontWeight="font-semibold"
              />
            ) : (
              <IconButton
                padding="py-2.5 px-4"
                disabled={isDownloading || isGenerating}
                icon={Asset.CloudDownload}
                text={`${maxSize ? "PNG" : "Download PNG"}`}
                onClick={handleDownloadPNG}
              />
            )}

            {isPDFDownloading ? (
              <LoadingButton
                padding="py-2.5 px-4"
                onClick={handleDownloadPDF}
                text={`${maxSize ? "..." : "Downloading..."}`}
                icon={Asset.Send}
                iconSize="w-4 h-4"
                fontWeight="font-semibold"
              />
            ) : (
              <IconButton
                padding="py-2.5 px-4"
                disabled={isDownloading || isGenerating}
                icon={Asset.CloudDownload}
                text={`${maxSize ? "PDF" : "Download PDF"}`}
                onClick={handleDownloadPDF}
              />
            )}
          </div>

          <IconButton
            padding="py-2.5 px-4"
            disabled={isDownloading || isGenerating}
            icon={Asset.RegenerateIcon}
            text={`${maxSize ? "" : "Regenerate"}`}
            onClick={onRegenerate}
          />
        </div>
      </div>
    </div>
  );
};

export default ComicResultPage;
