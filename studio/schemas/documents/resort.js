export default {
  name: "resort",
  type: "document",
  title: "Resort",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Name",
    },

    {
      name: "uniqueCode",
      type: "string",
      title: "Resort unique code",
    },

    {
      name: "image",
      type: "mainImage",
      title: "Hero Image",
    },

    {
      name: "externalId",
      type: "string",
      title: "Hotels API ID",
    },

    {
      name: "locationFull",
      type: "string",
      title: "Location full",
    },

    {
      name: "locationAtoll",
      type: "string",
      title: "Location Atoll",
    },

    {
      name: "description",
      type: "bodyPortableText",
      title: "Description",
    },

    /* text, name, country source (Reviews) */
    {
      name: "accomodationDescription",
      type: "bodyPortableText",
      title: "Accomodation description",
    },
    // {
    //   name: "bottomLineDescription",
    //   type: "bodyPortableText",
    //   title: "Bottom line description",
    // },

    {
      name: "numberOfRooms",
      type: "number",
      title: "Number of rooms",
    },

    {
      name: "numberOfRestaurants",
      type: "number",
      title: "Number of restaurants",
    },

    {
      name: "numberOfBars",
      type: "number",
      title: "Number of bars",
    },

    {
      name: "roomVoltage",
      type: "number",
      title: "Resort room voltage",
    },

    {
      name: "timeToAirport",
      type: "string",
      title: "Time to airport",
    },

    {
      name: "resortTransferType",
      title: "Resort transfer type",
      type: "array",
      of: [
        {
          type: "reference",
          to: {
            type: "resortTransferType",
          },
        },
      ],
    },

    {
      title: "Highlights",
      name: "highlights",
      type: "array",
      of: [
        {
          // type: "reference",
          type: "resortHighlight",
          // to: {  },
        },
      ],
    },

    {
      title: "Activities",
      name: "activities",
      type: "array",
      of: [
        {
          // type: "reference",
          type: "activity",
          // to: {  },
        },
      ],
    },

    {
      title: "Gallery",
      name: "gallery",
      type: "array",
      of: [
        {
          type: "gallery",
        },
      ],
    },

    {
      title: "villas",
      name: "villas",
      type: "array",
      of: [
        {
          type: "reference",
          to: {
            type: "villa",
          },
        },
      ],
    },
    {
      title: "restaurants",
      name: "restaurants",
      type: "array",
      of: [
        {
          type: "reference",
          to: {
            type: "restaurant",
          },
        },
      ],
    },

    {
      title: "spa",
      name: "spa",
      type: "array",
      of: [
        {
          type: "reference",
          to: {
            type: "spa",
          },
        },
      ],
    },

    {
      title: "Reviews",
      name: "reviews",
      type: "array",
      of: [
        {
          type: "review",
          // to: { type: "review" },
        },
      ],
    },

    {
      name: "secondImage",
      type: "mainImage",
      title: "Bottom image",
    },

    {
      name: "resortBrandLogo",
      type: "mainImage",
      title: "Resort Brand Logo",
    },

    {
      title: "FAQ",
      name: "faq",
      type: "array",
      of: [{ type: "faq" }],
    },

    // {
    //   name: "restaurants",
    //   title: "Restaurants",
    //   type: "array",
    //   of: [
    //     {
    //       type: "reference",
    //       to: {
    //         type: "restaurant",
    //       },
    //     },
    //   ],
    // },

    // {
    //   name: "villas",
    //   title: "Villas",
    //   type: "array",
    //   of: [
    //     {
    //       type: "reference",
    //       to: {
    //         type: "villa",
    //       },
    //     },
    //   ],
    // },

    // {
    //   name: "spas",
    //   title: "Spas",
    //   type: "array",
    //   of: [
    //     {
    //       type: "reference",
    //       to: {
    //         type: "spa",
    //       },
    //     },
    //   ],
    // },

    // {
    //   name: "resortTags",
    //   title: "Resort tags",
    //   type: "array",
    //   of: [
    //     {
    //       type: "reference",
    //       to: {
    //         type: "tag",
    //       },
    //     },
    //   ],
    // },
    // {
    //   name: "resortAccomodationType",
    //   title: "Resort accomodation type",
    //   type: "array",
    //   of: [
    //     {
    //       type: "reference",
    //       to: {
    //         type: "resortAccomodationType",
    //       },
    //     },
    //   ],
    // },
    {
      name: "villa1",
      title: "Villas : Linked",
      type: "array",
      of: [
        {
          type: "reference",
          to: {
            type: "villa",
          },
        },
      ],
    },
    {
      name: "restaurant1",
      title: "Restaurant : Linked",
      type: "array",
      of: [
        {
          type: "reference",
          to: {
            type: "restaurant",
          },
        },
      ],
    },
    {
      name: "spa1",
      title: "Spa : Linked",
      type: "array",
      of: [
        {
          type: "reference",
          to: {
            type: "spa",
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
