export default {
  name: "collectionType",
  type: "document",
  title: "Collection type",
  fields: [
    {
      name: "type",
      type: "string",
      title: "Collection Type",
    },
    {
      name: "name",
      type: "string",
      title: "Collection Type Name",
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
