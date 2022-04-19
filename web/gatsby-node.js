const { isFuture } = require("date-fns");
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const { format } = require("date-fns");

async function createBlogPostPages(graphql, actions) {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allSanityPost(
        filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }
      ) {
        edges {
          node {
            id
            _type
            publishedAt
            title
            slug {
              current
            }
          }
        }
      }
    }
  `);

  if (result.errors) throw result.errors;

  const postEdges = (result.data.allSanityPost || {}).edges || [];

  postEdges
    .filter((edge) => !isFuture(new Date(edge.node.publishedAt)))
    .forEach((edge) => {
      const { id, slug = {}, publishedAt, _type, title } = edge.node;
      const dateSegment = format(new Date(publishedAt), "yyyy/MM");
      const path = `/blog/${dateSegment}/${slug.current}/`;

      createPage({
        path,
        component: require.resolve("./src/templates/blog-post.js"),
        context: { id, _type, name: title },
      });
    });
}

async function createResortPages(graphql, actions) {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allSanityResort(sort: { fields: [name], order: ASC }) {
        nodes {
          name
          _id
          _type
        }
      }
    }
  `);

  if (result.errors) throw result.errors;

  const resortEdges = (result.data.allSanityResort || {}).nodes || [];

  resortEdges
    // .filter((edge) => !isFuture(new Date(edge.node.publishedAt)))
    .forEach((node) => {
      const { _id, name, _type } = node;
      // const dateSegment = format(new Date(publishedAt), "yyyy/MM");

      let path;
      if (typeof name === "string") {
        path = `/${name.toLowerCase().split(" ").join("-")}`;
      }
      // console.log(path, "path");

      if (path)
        createPage({
          path,
          component: require.resolve("./src/templates/resort.js"),
          context: { id: _id, _type: _type, name },
        });
    });
}

async function createVillaPages(graphql, actions) {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allSanityVilla {
        nodes {
          _id
          name
          _type
          resort {
            _id
            name
          }
        }
      }
    }
  `);

  if (result.errors) throw result.errors;

  const villaEdges = (result.data.allSanityVilla || {}).nodes || [];

  villaEdges.forEach((node) => {
    const { _id, name, resort, _type } = node;

    // console.log(node);

    let path;
    if (typeof name === "string" && resort) {
      path = `/${resort.name.toLowerCase().split(" ").join("-")}/${name
        .toLowerCase()
        .split(" ")
        .join("-")}`;
    }

    if (path)
      createPage({
        path,
        component: require.resolve("./src/templates/villa.js"),
        context: { id: _id, resortId: resort._id, _type, name },
      });
  });
}

async function createCollectionTypePages(graphql, actions) {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allSanityCollectionType {
        nodes {
          name
          type
        }
      }
    }
  `);

  if (result.errors) throw result.errors;

  const collectionNodes =
    (result.data.allSanityCollectionType || {}).nodes || [];

  const types = [];
  collectionNodes.forEach((collection) => {
    const typeAdded = types.find((value) => value === collection.type);
    if (!typeAdded)
      types.push({
        type: collection.type,
        name: collection.name,
      });
  });

  types
    // .filter((edge) => !isFuture(new Date(edge.node.publishedAt)))
    .forEach(({ type, name }) => {
      // const { _id, name } = node;
      // const dateSegment = format(new Date(publishedAt), "yyyy/MM");
      if (result.errors) throw result.errors;

      let path;
      path = `collection/${name.toLowerCase().split(" ").join("-")}`;

      if (type == "villa") {
        createPage({
          path,
          component: require.resolve("./src/templates/beachvilla.js"),
          context: { type, name },
        });
      } else if (type == "resort") {
        createPage({
          path,
          component: require.resolve("./src/templates/resortcollection.js"),
          context: { type, name },
        });
      }
    });

  // const collectionNodes = (result.data.allSanityCollectionType || {}).nodes || [];
}

async function createBeachVillaPages(graphql, actions) {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allSanityCollectionPage(filter: { slug: { current: { ne: null } } }) {
        edges {
          node {
            id
            _type
            CollectionPageName
            slug {
              current
            }
          }
        }
      }
    }
  `);

  if (result.errors) throw result.errors;

  const postEdges = (result.data.allSanityCollectionPage || {}).edges || [];

  postEdges.forEach((edge) => {
    const { id, slug = {}, _type } = edge.node;
    const path = `/collections/${slug.current}/`;

    createPage({
      path,
      component: require.resolve("./src/templates/beach.js"),
      context: { id, _type },
    });
  });
}

exports.createPages = async ({ graphql, actions }) => {
  await createResortPages(graphql, actions);
  await createVillaPages(graphql, actions);
  await createBlogPostPages(graphql, actions);
  await createCollectionTypePages(graphql, actions);
  await createBeachVillaPages(graphql, actions);

  // await createRestaurantPages(graphql, actions);
  // await createActivityPages(graphql, actions);
  // await createHighlightPage(graphql, actions);
};

// async function createRestaurantPages(graphql, actions) {
//   const { createPage } = actions;
//   const result = await graphql(`
//     {
//       allSanityRestaurant {
//         nodes {
//           _id
//           name
//           _type
//           resort {
//             _id
//             name
//           }
//         }
//       }
//     }
//   `);

//   if (result.errors) throw result.errors;

//   const restaurantNodes = (result.data.allSanityRestaurant || {}).nodes || [];

//   restaurantNodes.forEach((node) => {
//     const { _id, name, resort, _type } = node;

//     let path;
//     if (typeof name === "string" && resort) {
//       path = `/${resort.name
//         .toLowerCase()
//         .split(" ")
//         .join("-")}/restaurant/${name.toLowerCase().split(" ").join("-")}`;
//     }

//     if (path)
//       createPage({
//         path,
//         component: require.resolve("./src/templates/restaurant.js"),
//         context: { id: _id, resortId: resort._id, _type, name },
//       });
//   });
// }

// async function createActivityPages(graphql, actions) {
//   const { createPage } = actions;
//   const result = await graphql(`
//     {
//       allSanityActivity {
//         nodes {
//           _id
//           name
//           _type
//           resort {
//             _id
//             name
//           }
//         }
//       }
//     }
//   `);

//   if (result.errors) throw result.errors;

//   const activityNodes = (result.data.allSanityActivity || {}).nodes || [];

//   activityNodes.forEach((node) => {
//     const { _id, name, resort, _type } = node;

//     let path;
//     if (typeof name === "string" && resort) {
//       path = `/${resort.name.toLowerCase().split(" ").join("-")}/activity/${name
//         .toLowerCase()
//         .split(" ")
//         .join("-")}`;
//     }

//     if (path)
//       createPage({
//         path,
//         component: require.resolve("./src/templates/activity.js"),
//         context: { id: _id, resortId: resort._id, _type, name },
//       });
//   });
// }

// async function createHighlightPage(graphql, actions) {
//   const { createPage } = actions;
//   const result = await graphql(`
//     {
//       allSanityResortHighlight {
//         nodes {
//           _id
//           name
//           _type
//           resort {
//             _id
//             name
//           }
//         }
//       }
//     }
//   `);

//   if (result.errors) throw result.errors;

//   const highlightNodes =
//     (result.data.allSanityResortHighlight || {}).nodes || [];

//   console.log(highlightNodes, "nodes highlihgts");

//   highlightNodes.forEach((node) => {
//     const { _id, name, resort, _type } = node;

//     let path;
//     if (typeof name === "string" && resort) {
//       path = `/${resort.name
//         .toLowerCase()
//         .split(" ")
//         .join("-")}/highlight/${name.toLowerCase().split(" ").join("-")}`;
//     }

//     if (path)
//       createPage({
//         path,
//         component: require.resolve("./src/templates/highlight.js"),
//         context: { id: _id, resortId: resort._id, _type, name },
//       });
//   });
// }
