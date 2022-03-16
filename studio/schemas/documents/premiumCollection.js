export default {
  name: "premiumCollection",
  type: "document",
  title: "Premium Collection",
  fields: [
    {
      name: "premiumcollectionname",
      type: "string",
      title: "Premium Collection Name",
    },

    {
      name: "image",
      type: "notmainImage",
      title: "Hero Image",
    },

    {
      name: "featuredvillas",
      title: "Featured Villa Sections",
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
  ],
  preview: {
    select: {
      title: "name",
      // subtitle: "slug.current",
      media: "resortBrandLogo",
    },
  },
};
