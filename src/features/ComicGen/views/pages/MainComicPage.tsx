import { useState, useRef } from "react";
import MessageComic from "../components/MessageComic";
import GenreDropup from "../components/GenreDropup";
import ComicMode from "../components/ComicMode";
import ArtStyle from "../components/Artstyle";
import Panels from "../components/Panels";
import Ratio from "../components/Ratio";
import BackgroundComic from "../../../../shared/components/Box Content/BackgroundComic";
import ComicTitle from "../components/ComicTitle";

const MainComicPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const [selectedGenreIndex, setSelectedGenreIndex] = useState<number | null>(
    null,
  );
  const [selectedModeIndex, setSelectedModeIndex] = useState<number | null>(
    null,
  );
  const [selectedArtIndex, setSelectedArtIndex] = useState<number | null>(null);
  const [selectedPanelsIndex, setSelectedPanelsIndex] = useState<number | null>(
    null,
  );
  const [selectedRatioIndex, setSelectedRatioIndex] = useState<number | null>(
    null,
  );

  const comicResultRef = useRef<HTMLDivElement>(null);

  const handleGenerate = () => {
    comicResultRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const clickDropup = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const selectGenre = (index: number) => {
    setSelectedGenreIndex(index);
    setOpenIndex(null);
  };

  const selectMode = (index: number) => {
    setSelectedModeIndex(index);
    setOpenIndex(null);
  };

  const selectArt = (index: number) => {
    setSelectedArtIndex(index);
    setOpenIndex(null);
  };

  const selectPanels = (index: number) => {
    setSelectedPanelsIndex(index);
    setOpenIndex(null);
  };
  const selectRatio = (index: number) => {
    setSelectedRatioIndex(index);
    setOpenIndex(null);
  };

  return (
    <div
      onClick={() => setOpenIndex(null)}
      className="w-full flex justify-center items-center bg-grayy relative"
    >
      <div className="w-full h-screen">
        {/* <img className="w-full h-full object-cover" src={Asset.Background} /> */}
      </div>

      <div className="absolute w-full h-screen">
        <BackgroundComic />
      </div>
      <div className="absolute w-full h-screen bg-black/30">
        <div className="flex h-full justify-center items-center">
          <ComicTitle />
        </div>
        <div ref={comicResultRef} className="w-full h-full bg-black/30"></div>
        {/* <div className="w-full h-[100%] bg-amber-200"></div> */}
        {/* <CarouselComic /> */}
      </div>

      <div className="fixed bottom-0 [@media(max-width:840px)]:w-[95%] w-200 z-99">
        <div className="flex items-end gap-2 mb-3 relative w-full flex-wrap">
          <GenreDropup
            open={openIndex === 0}
            selectedGenreIndex={selectedGenreIndex}
            onToggle={() => clickDropup(0)}
            onSelect={selectGenre}
          />

          <ComicMode
            open={openIndex === 1}
            selectedModeIndex={selectedModeIndex}
            onToggle={() => clickDropup(1)}
            onSelect={selectMode}
          />

          <ArtStyle
            open={openIndex === 2}
            selectedArtIndex={selectedArtIndex}
            onToggle={() => clickDropup(2)}
            onSelect={selectArt}
          />

          <Panels
            open={openIndex === 3}
            selectedPanelsIndex={selectedPanelsIndex}
            onToggle={() => clickDropup(3)}
            onSelect={selectPanels}
          />

          <Ratio
            open={openIndex === 4}
            selectedRatioIndex={selectedRatioIndex}
            onToggle={() => clickDropup(4)}
            onSelect={selectRatio}
          />
        </div>

        <MessageComic onGenerate={handleGenerate} />
      </div>
    </div>
  );
};

export default MainComicPage;