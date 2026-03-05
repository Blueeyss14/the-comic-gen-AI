import { useState } from 'react';
import { Asset } from "../../../../res/assets";
import IconButton from "../../../../shared/components/Buttons/IconButton";

interface Props {
  onGenerate: (message: string) => void;
  isGenerating: boolean;
}

const ComicPrompter = ({ onGenerate, isGenerating }: Props) => {
  const [inputMessage, setInputMessage] = useState('');

  const handleSubmit = () => {
    if (!inputMessage.trim() || isGenerating) {
      return;
    }
    
    onGenerate(inputMessage);
    setInputMessage('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="w-full bg-grayy/10 border border-whitee/20 backdrop-blur-[10px] rounded-2xl mb-5 py-3 px-5 text-white/80">
      <div>
        <textarea
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Describe your comic idea!"
          disabled={isGenerating}
          className="w-full resize-none overflow-y-auto max-h-40 min-h-15 scrollbar-none outline-none bg-transparent disabled:opacity-50"
          rows={2}
        />
        <div className="flex justify-end mt-3">
          <div className={`${isGenerating ? 'opacity-50 cursor-not-allowed' : ''}`}>
            <IconButton
              onClick={handleSubmit}
              text={isGenerating ? "Generating..." : "Generate"}
              icon={Asset.Send}
              iconSize="w-4 h-4"
              fontWeight="font-semibold"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComicPrompter;