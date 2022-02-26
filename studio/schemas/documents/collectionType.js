export default {
  name: "collectionType",
  type: "document",
  title: "Collection type",
  fields: [
    {
      name: "type",
      type: "string",
    },
    {
      name: "name",
      type: "string",
    },
    {
      name: "imageThumb",
      type: "mainImage",
      title: "Collection Type image thumb",
    },
  ],
  preview: {
    select: {
      title: "type",
      // subtitle: "slug.current",
      media: "imageThumb",
    },
  },
};
