export default {
  name: "premiumCollection",
  type: "document",
  title: "Collection Pages",
  fields: [
    {
      name: "premiumcollectionname",
      type: "string",
      title: "Premium Collection Name",
    },
    {
      name: "description",
      type: "string",
      title: "Page Description",
    },

    {
      name: "image",
      type: "mainImage",
      title: "Hero Image",
    },

    {
      name: "premiumsections",
      title: "Page Sections",
      type: "array",
      of: [
        {
          type: "reference",
          to: {
            type: "premiumSection",
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "premiumcollectionname",
      // subtitle: "slug.current",
      media: "resortBrandLogo",
    },
  },
};
