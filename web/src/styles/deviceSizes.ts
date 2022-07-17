const size = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "425px",
  mobileXL: "520px",
  tabletS: "700px",
  tablet: "805px",
  tabletL: "940px",
  laptop: "1024px",
  laptopM: "1240px",
  laptopL: "1440px",
  desktopS: "1600px",
  desktopL: "2560px",
};

export const device = {
  mobileS: `(max-width: ${size.mobileS})`,
  mobileM: `(max-width: ${size.mobileM})`,
  mobileL: `(max-width: ${size.mobileL})`,
  mobileXL: `(max-width: ${size.mobileXL})`,
  tabletS: `(max-width: ${size.tabletS})`,
  tablet: `(max-width: ${size.tablet})`,
  tabletL: `(max-width: ${size.tabletL})`,
  laptop: `(max-width: ${size.laptop})`,
  laptopM: `(max-width: ${size.laptopM})`,
  laptopL: `(max-width: ${size.laptopL})`,
  desktopS: `(max-width: ${size.desktopS})`,
  desktopL: `(max-width: ${size.desktopL})`,
  onlyDesktopS: `(min-width: ${size.desktopS})`,
  onlydesktopL: `(min-width: ${size.desktopL})`,
  onlyMobile: `(max-width: 1024px)`,
  onlyMobileS: `(max-width: 800px)`,
  onlyMobileSm: `(max-width: 640px)`,
  mobileAndTablet: `(min-width: 320px) and (max-wdith:1024px)`,
  iphonePortLandscape: `(min-width: 320px) and (max-width: 837px)  and (-webkit-min-device-pixel-ratio: 2)`,
  mobileSmall: `(max-width: 390px)`,
  iPadPro: `(min-width: 1024px) and (max-height: 1366px) and (-webkit-min-device-pixel-ratio: 1.5)`,
};
