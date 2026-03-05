import { Asset } from "../../../../res/assets";
import BoxContent from "../../../../shared/components/Box Content/BoxContent";
import IconButton from "../../../../shared/components/Buttons/IconButton";
import { artStyle } from "../../data/comicData";

interface ArtStyleProps {
  open: boolean;
  selectedArtIndex: number | null;
  onToggle: () => void;
  onSelect: (index: number) => void;
}

const ArtStyle = ({
  open,
  selectedArtIndex,
  onToggle,
  onSelect,
}: ArtStyleProps) => {
  return (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      {open && (
        <BoxContent>
          {artStyle.map((item, i) => (
            <div
              key={i}
              onClick={() => onSelect(i)}
              className={`px-5 py-2 hover:bg-whitee/20 flex items-centercursor-pointer transition-all duration-200 text-whitee`}
            >
              <div className="w-full flex items-center justify-between gap-3">
                {item}
                {selectedArtIndex === i && (
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
        text={
          selectedArtIndex !== null ? artStyle[selectedArtIndex] : "Art Style"
        }
        onClick={onToggle}
      />
    </div>
  );
};

export default ArtStyle;
