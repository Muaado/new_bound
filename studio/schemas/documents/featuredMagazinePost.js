export default {
  name: "featuredMagazinePost",
  type: "document",
  title: "Featured Maginze Post",
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
      title: "Magazine Article",
      name: "magazinearticle",
      type: "reference",
      weak: true,
      to: [{ type: "post" }],
    },
    {
      name: "imageThumb",
      type: "notmainImage",
      title: "Section Hero Image",
    },
  ],
  preview: {
    select: {
      title: "title",
      // subtitle: "slug.current",
      media: "imageThumb",
    },
  },
};
