import AssetSource from "part:sanity-plugin-media-library/asset-source";
export default {
  name: "mainImage",
  type: "image",
  title: "Image",
  options: {
    hotspot: true,
  },
  fields: [
    {
      name: "caption",
      type: "string",
      title: "Caption",
      options: {
        isHighlighted: true,
      },
    },
    {
      name: "alt",
      type: "string",
      title: "Alternative text",
      description: "Important for SEO and accessiblity.",
      validation: (Rule) =>
        Rule.error("You have to fill out the alternative text.").required(),
      options: {
        isHighlighted: true,
      },
    },
    {
      title: "Color Type",
      name: "colorType",
      type: "string",
      options: {
        list: [
          { title: "Light", value: "LIGHT" },
          { title: "Dark", value: "DARK" },
          { title: "Darker", value: "DARKER" },
        ],
        isHighlighted: true,
      },
    },
  ],
  preview: {
    select: {
      imageUrl: "asset.url",
      title: "caption",
    },
  },
};
