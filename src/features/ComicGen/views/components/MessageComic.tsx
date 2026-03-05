import { Asset } from "../../../../res/assets";
import IconButton from "../../../../shared/components/Buttons/IconButton";

interface Props {
  onGenerate: () => void;
}

const MessageComic = ({ onGenerate }: Props) => {
  return (
    <div className="w-full bg-grayy/10 border border-whitee/20 backdrop-blur-[10px] rounded-2xl mb-5 py-3 px-5 text-white/80">
      <div>
        <textarea
          placeholder="Generate your comic!"
          className="w-full resize-none overflow-y-auto max-h-40 min-h-15 scrollbar-none outline-none"
        ></textarea>
        <div className="flex justify-end">
          <IconButton
            onClick={onGenerate}
            text="Generate"
            icon={Asset.Send}
            iconSize="w-4 h-4"
            fontWeight="font-semibold"
          />
        </div>
      </div>
    </div>
  );
};

export default MessageComic;