export default {
  name: "bannerCollection",
  type: "document",
  title: "Banners and Ads",
  fields: [
    {
      name: "BannerTitle",
      type: "string",
      title: "Banner Title",
    },
    {
      name: "descriptionShort",
      type: "string",
      title: "Section Description (short)",
    },
    {
      name: "descriptionLong",
      type: "string",
      title: "Section Description (long)",
    },
    {
      name: "sectionHeroImage",
      type: "mainImage",
      title: "Section Hero Image",
    },
  ],
  preview: {
    select: {
      title: "CollectionName",
      // subtitle: "slug.current",
      media: "sectionHeroImage",
    },
  },
};



