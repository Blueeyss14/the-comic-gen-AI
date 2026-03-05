import BoxContent from "../../../../shared/components/Box Content/BoxContent";
import { Asset } from "../../../../res/assets";
import { genre } from "../../data/comicData";
import IconButton from "../../../../shared/components/Buttons/IconButton";

interface GenreDropupProps {
  open: boolean;
  selectedGenreIndex: number | null;
  onToggle: () => void;
  onSelect: (index: number) => void;
}

const GenreDropup = ({
  open,
  selectedGenreIndex,
  onToggle,
  onSelect,
}: GenreDropupProps) => {
  return (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      {open && (
        <BoxContent>
          {genre.map((item, i) => (
            <div
              key={i}
              onClick={() => onSelect(i)}
              className={`px-5 py-2 hover:bg-whitee/20 flex items-centercursor-pointer transition-all duration-200 text-whitee`}
            >
              <div className="w-full flex items-center justify-between gap-3">
                {item}
                {selectedGenreIndex === i && (
                  <img
                    src={Asset.Checklist}
                    className="w-4 h-4 white-icon-filter"
                  />
                )}
              </div>
            </div>
          ))}
        </BoxContent>
      )}

      <IconButton
        rotation={`${open ? "rotate-180" : "rotate-0"}`}
        icon={Asset.ArrowUp}
        text={selectedGenreIndex !== null ? genre[selectedGenreIndex] : "Genre"}
        onClick={onToggle}
      />
    </div>
  );
};

export default GenreDropup;
