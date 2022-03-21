export default {
  name: "banner",
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
    {
      name: "sectionIconBadge",
      type: "mainImage",
      title: "Section Icon Badge",
    },
  ],
  preview: {
    select: {
      title: "BannerTitle",
      // subtitle: "slug.current",
      media: "sectionHeroImage",
    },
  },
};
