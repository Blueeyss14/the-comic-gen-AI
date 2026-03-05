import { Asset } from "../../../../res/assets";
import BoxContent from "../../../../shared/components/Box Content/BoxContent";
import IconButton from "../../../../shared/components/Buttons/IconButton";
import { mode } from "../../data/comicData";

interface ComicModeProps {
  open: boolean;
  selectedModeIndex: number | null;
  onToggle: () => void;
  onSelect: (index: number) => void;
}

const ComicMode = ({
  open,
  selectedModeIndex,
  onToggle,
  onSelect,
}: ComicModeProps) => {
  return (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      {open && (
        <BoxContent>
          {mode.map((item, i) => (
            <div
              key={i}
              onClick={() => onSelect(i)}
              className={`px-5 py-2 hover:bg-whitee/70 flex items-center gap-2 cursor-pointer ${
                selectedModeIndex === i
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
          selectedModeIndex !== null
            ? mode[selectedModeIndex]
            : "Mode"
        }
        onClick={onToggle}
      />
    </div>
  );
};

export default ComicMode;