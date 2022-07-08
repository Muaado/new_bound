export default {
  name: "month",
  title: "Monthly Rate",
  type: "object",
  description: "Monthly average room rate",
  fields: [
    {
      name: "price",
      type: "number",
      title: "Price",
      description: "Monthly average room price",
    },
    {
      name: "note",
      type: "text",
      title: "Note",
      description: "Note to clear the price",
    },
  ],
};
