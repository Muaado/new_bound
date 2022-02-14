import { graphql } from "gatsby";
import BlogPost from "../components/Post/blog-post";
import React from "react";
import GraphQLErrorList from "../components/graphql-error-list";
import Layout from "../containers/layout";
import Container from "../components/container";
import SEO from "../components/seo";
import { toPlainText } from "../lib/helpers";
import styled from "styled-components";
import { device } from "../styles/deviceSizes";

import { HeroStyles } from "../components/Homepage/styles";

import Image from "gatsby-plugin-sanity-image";
import { MouseScroll } from "../components/Ui/MouseScroll";


export const query = graphql`
  query BlogPostTemplateQuery($id: String!) {
    post: sanityPost(id: { eq: $id }) {
      id
      publishedAt
      categories {
        _id
        title
      }
      mainImage {
        ...SanityImage
        alt
      }
      title
      slug {
        current
      }
      _rawExcerpt(resolveReferences: { maxDepth: 5 })
      _rawBody(resolveReferences: { maxDepth: 5 })
      authors {
        _key
        author {
          image {
            crop {
              _key
              _type
              top
              bottom
              left
              right
            }
            hotspot {
              _key
              _type
              x
              y
              height
              width
            }
            asset {
              _id
            }
          }
          name
        }
      }
    }
  }
`;
const MagazineArticlePageStyles = styled.div`
  padding: 0 15%;

  .articletitle {
    position: absolute;

    width: 800px;
    text-wrap: pre-wrap;
    text-transform: uppercase;
    color: #fff;
    font-size: 4rem;
    color: #fff;
    z-index: 100;
    bottom:230px;
  

    @media ${device.mobileXL} {
      width:380px;
      font-size: 2rem;
      left:0;
      padding-bottom:10px;
    }
  
  }

  @media ${device.tablet} {
    .articletitle {
      width:80%;
      left: 10%;
    }
    
  }

  /* .magazine {
    &__hero {
      height: 80vh;
    }
  } */

  @media ${device.laptopM} {
    padding: 0 10%;
  }
  @media ${device.tablet} {
    padding: 0 1.5rem;
  }


  .post-list {
    max-width: 80%;

    @media ${device.laptopM} {
      max-width: 100%;
    }
  }
`;

const BlogPostTemplate = (props) => {
  const { data, errors } = props;
  const post = data && data.post;
  // return (
  //   <Layout>
  //     {errors && <SEO title="GraphQL Error" />}
  //     {post && (
  //       <SEO
  //         title={post.title || "Untitled"}
  //         description={toPlainText(post._rawExcerpt)}
  //         image={post.mainImage}
  //       />
  //     )}

  //     {errors && (
  //       <Container>
  //         <GraphQLErrorList errors={errors} />
  //       </Container>
  //     )}
  //     <h2>{title}</h2>
  //     {post && <BlogPost {...post} />}
  //   </Layout>
  // );

  return (
    <Layout>
      <SEO title="Magazine" />
      <Container>
        <HeroStyles className="height-80vh">
          {post.mainImage && post.mainImage.asset && (
            <Image
              {...post.mainImage}
              alt={post.mainImage.alt}
            />
          )}
          <MouseScroll />
        </HeroStyles>
        <MagazineArticlePageStyles>
          {post && <h3 className="articletitle">{post.title}</h3>}
          {post && <BlogPost {...post} />}
        </MagazineArticlePageStyles> 
        </Container>
    </Layout>
  );
};

export default BlogPostTemplate;
