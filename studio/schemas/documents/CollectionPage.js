export default {
  name: "CollectionPage",
  type: "document",
  title: "Collection Pages",
  fields: [
    {
      name: "CollectionPageName",
      type: "string",
      title: "Collection Page Name",
    },
    {
      name: "slug",
      type: "slug",
      title: "Slug",
      description:
        "Some frontends will require a slug to be set to be able to show the post",
      options: {
        source: "CollectionPageName",
        maxLength: 96,
      },
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
      name: "waterVillaCollection",
      title: "Page Sections : water villa collection",
      type: "array",
      of: [
        {
          type: "reference",
          to: {
            type: "waterVillaCollection",
          },
        },
      ],
    },
    {
      name: "beachVillaCollection",
      title: "Page Sections : beach villa collection",
      type: "array",
      of: [
        {
          type: "reference",
          to: {
            type: "beachVillaCollection",
          },
        },
      ],
    },
    {
      name: "banner",
      title: "Page Banners",
      type: "array",
      of: [
        {
          type: "reference",
          to: {
            type: "banner",
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "CollectionPageName",
      // subtitle: "slug.current",
      media: "image",
    },
  },
};
