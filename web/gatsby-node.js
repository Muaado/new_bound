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
          rateModel {
            _id
          }
        }
      }
    }
  `);

  if (result.errors) throw result.errors;

  const villaEdges = (result.data.allSanityVilla || {}).nodes || [];

  villaEdges.forEach((node) => {
    const { _id, name, resort, _type, rateModel } = node;
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
        context: {
          id: _id,
          resortId: resort._id,
          _type,
          name,
          rateModelId: rateModel?._id || "",
        },
      });
  });
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
      component: require.resolve("./src/templates/collection.js"),
      context: { id, _type },
    });
  });
}

exports.createPages = async ({ graphql, actions }) => {
  await createResortPages(graphql, actions);
  await createVillaPages(graphql, actions);
  await createBlogPostPages(graphql, actions);
  await createBeachVillaPages(graphql, actions);
};
