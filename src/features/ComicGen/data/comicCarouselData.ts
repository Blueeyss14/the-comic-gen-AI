import { Asset } from "../../../res/assets";

interface ComicItem {
  Comic: string;
}

interface MappedComic {
  comic: string;
}

export const comicCarouselData: ComicItem[] = [
  { Comic: Asset.Comic1 },
  { Comic: Asset.Comic1 },
  { Comic: Asset.Comic1 },
];

export function mapComicCarousel(rawData: ComicItem[]): MappedComic[] {
  return rawData.map((item) => ({
    comic: item.Comic,
  }));
}