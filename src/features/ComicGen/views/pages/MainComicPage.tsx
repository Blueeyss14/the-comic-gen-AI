import { useState, useRef } from "react";
import MessageComic from "../components/MessageComic";
import GenreDropup from "../components/GenreDropup";
import ComicMode from "../components/ComicMode";
import ArtStyle from "../components/Artstyle";
import Panels from "../components/Panels";
import Ratio from "../components/Ratio";
import BackgroundComic from "../../../../shared/components/Box Content/BackgroundComic";
import ComicTitle from "../components/ComicTitle";
import ComicResultPage from "./ComicResultPage";
import { useQwenGeneration } from "../../hooks/useQwenGeneration";
import { genre, mode, artStyle, panels, ratio } from "../../data/comicData";

const MainComicPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const [selectedGenreIndex, setSelectedGenreIndex] = useState<number | null>(
    null,
  );
  const [selectedModeIndex, setSelectedModeIndex] = useState<number | null>(
    null,
  );
  const [selectedArtIndex, setSelectedArtIndex] = useState<number | null>(null);
  const [selectedPanelsIndex, setSelectedPanelsIndex] = useState<number | null>(
    null,
  );
  const [selectedRatioIndex, setSelectedRatioIndex] = useState<number | null>(
    null,
  );

  const comicResultRef = useRef<HTMLDivElement>(null);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);

  // Use Qwen generation hook
  const { isGenerating, generateComic } = useQwenGeneration();

  const handleGenerate = async (message: string) => {
    console.log('🎯 Handle Generate called with message:', message);
    console.log('Current selections:', {
      genre: selectedGenreIndex,
      mode: selectedModeIndex,
      artStyle: selectedArtIndex,
      panels: selectedPanelsIndex,
      ratio: selectedRatioIndex,
    });

    // Validate all required fields
    if (
      selectedGenreIndex === null ||
      selectedModeIndex === null ||
      selectedArtIndex === null ||
      selectedPanelsIndex === null ||
      selectedRatioIndex === null
    ) {
      console.warn('⚠️ Not all options selected!');
      alert('Please select all options (Genre, Mode, Art Style, Panels, and Ratio) before generating.');
      return;
    }

    // Build generation options
    const options = {
      genre: genre[selectedGenreIndex],
      mode: mode[selectedModeIndex],
      artStyle: artStyle[selectedArtIndex],
      panels: panels[selectedPanelsIndex],
      ratio: ratio[selectedRatioIndex],
      prompt: message,
    };

    console.log('📦 Generated options:', options);

    // Generate comic
    console.log('🔄 Calling generateComic...');
    const imageUrl = await generateComic(options);
    console.log('🖼️ Image URL result:', imageUrl);

    if (imageUrl) {
      setGeneratedImageUrl(imageUrl);
      setTimeout(() => {
        comicResultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    } else {
      console.error('Failed to generate image');
    }
  };

  const handleRegenerate = () => {
    setGeneratedImageUrl(null);
    comicResultRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const clickDropup = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const selectGenre = (index: number) => {
    setSelectedGenreIndex(index);
    setOpenIndex(null);
  };

  const selectMode = (index: number) => {
    setSelectedModeIndex(index);
    setOpenIndex(null);
  };

  const selectArt = (index: number) => {
    setSelectedArtIndex(index);
    setOpenIndex(null);
  };

  const selectPanels = (index: number) => {
    setSelectedPanelsIndex(index);
    setOpenIndex(null);
  };
  
  const selectRatio = (index: number) => {
    setSelectedRatioIndex(index);
    setOpenIndex(null);
  };

  return (
    <div
      onClick={() => setOpenIndex(null)}
      className="w-full flex justify-center items-center bg-grayy relative"
    >
      <div className="w-full h-screen">
        {/* <img className="w-full h-full object-cover" src={Asset.Background} /> */}
      </div>

      <div className="absolute w-full h-screen">
        <BackgroundComic />
      </div>
      <div className="absolute w-full h-screen bg-black/30 overflow-y-auto">
        <div className="flex h-full justify-center items-center">
          <ComicTitle />
        </div>
        
        <div ref={comicResultRef} className="w-full flex flex-col h-full mb-50">
          <ComicResultPage 
            imageUrl={generatedImageUrl}
            onRegenerate={handleRegenerate}
            isGenerating={isGenerating}
          />
        </div>
      </div>

      <div className="fixed bottom-0 [@media(max-width:840px)]:w-[95%] w-200 z-99">
        <div className="flex items-end gap-2 mb-3 relative w-full flex-wrap">
          <GenreDropup
            open={openIndex === 0}
            selectedGenreIndex={selectedGenreIndex}
            onToggle={() => clickDropup(0)}
            onSelect={selectGenre}
          />

          <ComicMode
            open={openIndex === 1}
            selectedModeIndex={selectedModeIndex}
            onToggle={() => clickDropup(1)}
            onSelect={selectMode}
          />

          <ArtStyle
            open={openIndex === 2}
            selectedArtIndex={selectedArtIndex}
            onToggle={() => clickDropup(2)}
            onSelect={selectArt}
          />

          <Panels
            open={openIndex === 3}
            selectedPanelsIndex={selectedPanelsIndex}
            onToggle={() => clickDropup(3)}
            onSelect={selectPanels}
          />

          <Ratio
            open={openIndex === 4}
            selectedRatioIndex={selectedRatioIndex}
            onToggle={() => clickDropup(4)}
            onSelect={selectRatio}
          />
        </div>

        <MessageComic onGenerate={handleGenerate} isGenerating={isGenerating} />
      </div>
    </div>
  );
};

export default MainComicPage;
