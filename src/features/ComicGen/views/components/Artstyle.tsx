import { Asset } from "../../../../res/assets";
import BoxContent from "../../../../shared/components/Box Content/BoxContent";
import IconButton from "../../../../shared/components/Buttons/IconButton";
import { artStyle} from "../../data/comicData";

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
              className={`px-5 py-2 hover:bg-whitee/70 flex items-center gap-2 cursor-pointer ${
                selectedArtIndex === i
                  ? "bg-whitee/70"
                  : "bg-transparent"
              } text-whitee`}
            >
              {item}
            </div>
          ))}
        </BoxContent>
      )}

      <IconButton
        rotation={`${open ? "rotate-180" : "rotate-0"}`}
        icon={Asset.ArrowUp}
        text={
          selectedArtIndex !== null
            ? artStyle[selectedArtIndex]
            : "Art Style"
        }
        onClick={onToggle}
      />
    </div>
  );
};

export default ArtStyle;