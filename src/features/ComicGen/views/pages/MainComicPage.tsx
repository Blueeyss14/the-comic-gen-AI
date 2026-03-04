import { useState } from "react";
import { Asset } from "../../../../res/assets";
import MessageComic from "../components/MessageComic";
import IconButton from "../../../../shared/components/Buttons/IconButton";
import BoxContent from "../../../../shared/components/Box Content/BoxContent";
import { genre } from "../../data/comicData";

const MainComicPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const clickDropup = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
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
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            {openIndex === 0 && (
              <BoxContent>
                {genre.map((genre, i) => (
                  <div key={i} className="px-5 py-2 bg-amber-100 flex items-center gap-2">{genre}</div>
                ))}
              </BoxContent>
            )}
            <IconButton
              rotation={`${openIndex == 0 ? "rotate-180" : "rotate-0"}`}
              icon={Asset.ArrowUp}
              text="Genre"
              onClick={() => clickDropup(0)}
            />
          </div>
        </div>
        <MessageComic />
      </div>
    </div>
  );
};

export default MainComicPage;
