import { useState } from "react";
import { Asset } from "../../../../res/assets";
import MessageComic from "../components/MessageComic";
import GenreDropup from "../components/GenreDropup";
import ComicMode from "../components/ComicMode";
import ArtStyle from "../components/Artstyle";

const MainComicPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [selectedDropup, setSelectedDropup] = useState<number | null>(null);

  const clickDropup = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const selectDropupFunc = (index: number) => {
    setSelectedDropup(index);
    setOpenIndex(null);
  };

  return (
    <div
      onClick={() => setOpenIndex(null)}
      className="w-full flex justify-center items-center bg-grayy relative"
    >
      <div className="w-full h-screen">
        <img className="w-full h-full object-cover" src={Asset.Background} />
      </div>

      <div className="absolute bottom-0 w-[80%] z-99">
        <div className="flex items-end gap-2 mb-2 relative">
          <GenreDropup
            open={openIndex === 0}
            selectedGenreIndex={selectedDropup}
            onToggle={() => clickDropup(0)}
            onSelect={selectDropupFunc}
          />
          <ComicMode
            open={openIndex === 1}
            selectedModeIndex={selectedDropup}
            onToggle={() => clickDropup(1)}
            onSelect={selectDropupFunc}
          />
          <ArtStyle
            open={openIndex === 2}
            selectedArtIndex={selectedDropup}
            onToggle={() => clickDropup(2)}
            onSelect={selectDropupFunc}
          />
        </div>

        <MessageComic />
      </div>
    </div>
  );
};

export default MainComicPage;