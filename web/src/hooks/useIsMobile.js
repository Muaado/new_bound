import { useState, useEffect } from "react";
const tabletLandscapeWidthPixels = 1024;
const tabletLandscapeWidth = `${tabletLandscapeWidthPixels}px`;
const tabletWidthPixels = 768;
const tabletWidth = `${tabletWidthPixels}px`;
const mobileLandscapeWidthPixels = 576;
const mobileLandscapeWidth = `${mobileLandscapeWidthPixels}px`;
const mobileWidthPixels = 320;
const mobileWidth = `${mobileWidthPixels}px`;

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, [matches, query]);

  return matches;
};

export const useIsMobile = () =>
  useMediaQuery(`(max-width: ${mobileLandscapeWidthPixels}px)`);
export const useIsMobileSm = () =>
  useMediaQuery(`(max-width: ${mobileWidthPixels}px)`);
export const useIsTablet = () =>
  useMediaQuery(`(max-width: ${tabletWidthPixels}px)`);
