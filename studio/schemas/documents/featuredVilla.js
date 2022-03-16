export default {
  name: "featuredVilla",
  type: "document",
  title: "Featured Villas",
  fields: [
    {
      name: "featuredvillaname",
      type: "string",
      title: "Featured Villas Name",
    },
    {
      name: "description",
      type: "string",
      title: "Featured Villas Description",
    },
    {
      title: "Villa One / Optional",
      name: "villaone",
      type: "reference",
      weak: true,
      to: [{ type: "villa" }],
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
      name: "featuredmagazinepost",
      title: "Featured Magazine Posts",
      type: "array",
      of: [
        {
          type: "reference",
          to: {
            type: "featuredMagazinePost",
          },
        },
      ],
    },
    {
      name: "imageThumb",
      type: "notmainImage",
      title: "Villa Hero Image",
    },
  ],
  preview: {
    select: {
      title: "featuredvillaname",
      // subtitle: "slug.current",
      media: "imageThumb",
    },
  },
};
