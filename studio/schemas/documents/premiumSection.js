export default {
  name: "premiumSection",
  type: "document",
  title: "Collection Page Section",
  fields: [
    {
      name: "premiumSectionName",
      type: "string",
      title: "Section Name",
    },
    {
      name: "description",
      type: "string",
      title: "Section Description",
    },
    {
      name: "villas",
      title: "Villas in this collection",
      type: "array",
      of: [
        {
          type: "reference",
          to: {
            type: "villa",
          },
          weak: true,
        },
      ],
    },

    {
      name: "featuredmagazinepost",
      title: "Featured Magazine Posts",
      type: "array",
      of: [
        {
          type: "reference",
          to: {
            type: "featuredMagazinePost",
          },
          weak: true,
        },
      ],
    },

    {
      name: "featuredvillas",
      title: "Featured Villas / Optional",
      type: "array",
      of: [
        {
          type: "reference",
          to: {
            type: "featuredVilla",
          },
        },
      ],
    },

    {
      name: "sectionHeroImage",
      type: "mainImage",
      title: "Section Hero Image",
    },
  ],
  preview: {
    select: {
      title: "premiumSectionName",
      // subtitle: "slug.current",
      media: "sectionHeroImage",
    },
  },
};
