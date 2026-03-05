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
              className={`px-5 py-2 hover:bg-whitee/20 flex items-centercursor-pointer transition-all duration-200 text-whitee`}
            >
              <div className="w-full flex items-center justify-between gap-3">
                {item}
                {selectedModeIndex === i && 
                
                <img src={Asset.Checklist} className="w-4 h-4 white-icon-filter" />
                }
              </div>
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