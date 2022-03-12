export default {
  name: "collectionType",
  type: "document",
  title: "Collection type",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Collection Type Name",
    },
    {
      name: "type",
      type: "string",
      title: "Collection Type",
    },
    {
      name: "imageThumb",
      type: "mainImage",
      title: "Collection Type image thumb",
    },
  ],
  preview: {
    select: {
      title: "name",
      // subtitle: "slug.current",
      media: "imageThumb",
    },
  },
};
