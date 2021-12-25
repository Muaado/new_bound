export default {
  widgets: [
    { name: "structure-menu" },
    {
      name: "project-info",
      options: {
        __experimental_before: [
          {
            name: "netlify",
            options: {
              description: "NOTE: Deply site ->",
              sites: [
                {
                  buildHookId: "61c6a96f5b5083dbc183f47c",
                  title: "Boundless Backend v0.9",
                  name: "cms-boundless",
                  apiId: "4dea360b-4783-46e4-8c42-56e985049676",
                },
                {
                  buildHookId: "61c2e0d609e05539731c8fc6",
                  title: "Boundless Home",
                  name: "boundlessbeta",
                  apiId: "2c1cfe58-c1ab-44a7-a08f-4b35469e63c5",
                },
              ],
            },
          },
        ],
        data: [
          {
            title: "GitHub repo",
            value: "https://github.com/Muaado/new_bound",
            category: "Code",
          },
          {
            title: "Frontend",
            value: "https://boundlessbeta.netlify.app/",
            category: "apps",
          },
          {
            title: "CMS",
            value: "https://cms-boundless.netlify.app/",
            category: "apps",
          },
        ],
      },
    },
    { name: "project-users", layout: { height: "auto" } },
    {
      name: "document-list",
      options: {
        title: "Recent Updates",
        order: "_createdAt desc",
        types: ["post"],
      },
      layout: { width: "medium" },
    },
  ],
};
