export default {
  name: "featuredVilla",
  type: "document",
  title: "Featured Villas",
  fields: [
    {
      name: "title",
      type: "string",
      title: "title",
    },
    {
      name: "description",
      type: "string",
      title: "Description",
    },
    {
      title: "Villa One / Optional",
      name: "villaone",
      type: "reference",
      weak: true,
      to: [{ type: "villa" }],
    },
    {
      name: "VillaoneBackground",
      type: "mainImage",
      title: "Background Image Villa One",
    },
    {
      title: "Villa Two / Optional",
      name: "villatwo",
      type: "reference",
      weak: true,
      to: [{ type: "villa" }],
      hidden: ({ document }) => !document?.villaone,
    },
    {
      name: "VillatwoBackground",
      type: "mainImage",
      title: "Background Image Villa Two",
    },
  ],
  preview: {
    select: {
      title: "title",
      // subtitle: "slug.current",
      media: "VillaoneBackground",
    },
  },
};
