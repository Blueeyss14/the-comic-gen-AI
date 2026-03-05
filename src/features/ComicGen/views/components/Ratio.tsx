import { Asset } from "../../../../res/assets";
import BoxContent from "../../../../shared/components/Box Content/BoxContent";
import IconButton from "../../../../shared/components/Buttons/IconButton";
import { ratio } from "../../data/comicData";

interface RatioProps {
  open: boolean;
  selectedRatioIndex: number | null;
  onToggle: () => void;
  onSelect: (index: number) => void;
}

const Ratio = ({
  open,
  selectedRatioIndex,
  onToggle,
  onSelect,
}: RatioProps) => {
  return (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      {open && (
        <BoxContent>
          {ratio.map((item, i) => (
            <div
              key={i}
              onClick={() => onSelect(i)}
              className={`px-5 py-2 hover:bg-whitee/20 flex items-centercursor-pointer transition-all duration-200 text-whitee`}
            >
              <div className="w-full flex items-center justify-between gap-3">
                {item}
                {selectedRatioIndex === i && (
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
        text={selectedRatioIndex !== null ? ratio[selectedRatioIndex] : "Ratio"}
        onClick={onToggle}
      />
    </div>
  );
};

export default Ratio;
