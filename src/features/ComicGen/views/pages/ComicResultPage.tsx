import { useState } from "react";
import { useComicDownload } from "../../hooks/useComicDownload";
import IconButton from "../../../../shared/components/Buttons/IconButton";
import { Asset } from "../../../../res/assets";

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

  const handleDownloadPNG = async () => {
    if (!imageUrl) return;

    setIsDownloading(true);
    try {
      await downloadAsPNG(imageUrl, "my-comic");
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!imageUrl) return;

    setIsDownloading(true);
    try {
      await downloadAsPDF(imageUrl, "my-comic");
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  if (!imageUrl && !isGenerating) {
    return null;
  }

  return (
    <div className="w-full h-full flex justify-center items-start">
      <div>
        <div className="w-200 p-10 bg-grayy/60 border mt-10 border-whitee/20 backdrop-blur-[3px] rounded-[10px] mb-5 overflow-clip cursor-pointer whitespace-nowrap">
          {isGenerating ? (
            <div>Loading...</div>
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
            <IconButton
              disabled={isDownloading || isGenerating}
              icon={Asset.CloudDownload}
              text="Download PNG"
              onClick={handleDownloadPNG}
            />
            <IconButton
              disabled={isDownloading || isGenerating}
              icon={Asset.CloudDownload}
              text="Download PDF"
              onClick={handleDownloadPDF}
            />
          </div>
          <IconButton
            disabled={isDownloading || isGenerating}
            icon={Asset.RegenerateIcon}
            text="Regenerate"
            onClick={onRegenerate}
          />
        </div>
      </div>
    </div>
  );
};

export default ComicResultPage;
