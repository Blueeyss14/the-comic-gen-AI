import { Asset } from "../../../../res/assets";
import BoxContent from "../../../../shared/components/Box Content/BoxContent";
import IconButton from "../../../../shared/components/Buttons/IconButton";
import { artStyle} from "../../data/comicData";

interface PanelsProps {
  open: boolean;
  selectedPanelsIndex: number | null;
  onToggle: () => void;
  onSelect: (index: number) => void;
}

const Panels = ({
  open,
  selectedPanelsIndex,
  onToggle,
  onSelect,
}: PanelsProps) => {
  return (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      {open && (
        <BoxContent>
          {artStyle.map((item, i) => (
            <div
              key={i}
              onClick={() => onSelect(i)}
              className={`px-5 py-2 hover:bg-whitee/70 flex items-center gap-2 cursor-pointer ${
                selectedPanelsIndex === i
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
          selectedPanelsIndex !== null
            ? artStyle[selectedPanelsIndex]
            : "Art Style"
        }
        onClick={onToggle}
      />
    </div>
  );
};

export default Panels;