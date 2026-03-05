import { Asset } from "../../../../res/assets";
import BoxContent from "../../../../shared/components/Box Content/BoxContent";
import IconButton from "../../../../shared/components/Buttons/IconButton";
import { panels } from "../../data/comicData";

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
          {panels.map((item, i) => (
            <div
              key={i}
              onClick={() => onSelect(i)}
              className={`px-5 py-2 hover:bg-whitee/20 flex items-centercursor-pointer transition-all duration-200 text-whitee`}
            >
              <div className="w-full flex items-center justify-between gap-3">
                {item}
                {selectedPanelsIndex === i && (
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
          selectedPanelsIndex !== null ? panels[selectedPanelsIndex] : "Panels"
        }
        onClick={onToggle}
      />
    </div>
  );
};

export default Panels;
