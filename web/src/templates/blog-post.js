import { format } from "date-fns";
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
   background: white;
  .herodiv {
    text-align: center;
    overflow: hidden;
    color: #fff;

    /* position: absolute; */
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;

    @media ${device.laptop} {
      height: 80vh;
    }
    @media ${device.tablet} {
      height: 65vh !important;
    }

    &:before {
      content: "";
      position: absolute;
      opacity: 0.3;
      left: 0;
      top: 0;
      width: 100%;
      height: 100vh;
      background-color: #000;

      @media ${device.laptop} {
        height: inherit;
      }
    }
  }

  .titlwrapmagazine{
    position: absolute;
    bottom 20%;
    min-height:144px;
    padding:0 15%;

    @media ${device.tablet} {
      padding:0 1.5rem;
      bottom:40%;
    }
    
    span{
      ont-weight: bold;
      bottom: 15px;
      position: relative;
      color: #e2e2e2;
      font-size:13px;
    }
  }

  .titlwrapmagazine .articletitle {

    text-wrap: pre-wrap;
    text-align:left;
    text-transform: uppercase;
    color: #fff;
    font-size: 4rem;
    z-index: 100;
    // position: relative;
    // top: -20%;
    // max-width: 90%;
   

    @media ${device.mobileXL} {
      width:380px;
      font-size: 2rem;
      left:0;
      padding-bottom:10px;
    }
  
  }

  @media ${device.onlyMobile} {
    .titlwrapmagazine .articletitle {
      width:80%;
      left: 10%;
      font-size: 2rem;
    }

    .titlwrapmagazine span{
      bottom: 5px;

    }
    
  }



  // @media ${device.laptopM} {
  //   padding: 0 10%;
  // }
  // @media ${device.tablet} {
  //   padding: 0 1.5rem;
  // }

  // .post-list {
  //   max-width: 80%;

  //   @media ${device.laptopM} {
        font-size:3rem;
  //     max-width: 100%;
  //   }
  // }

  .articlecontent{
    padding: 0 15%;
    margin-bottom:10%;
    figcaption{
      top: -20px;
      font-size:1.5rem;
      position: relative;
      padding: 10px;
      color: #975b2c;
      background: #e8e8e8;
    } 
  }

  @media ${device.tablet} {
    .articlecontent{
      padding:0 1.5rem;
    }

  
  }

  h4,h3{
    color:#656565;
    font-family: "rivera_light_regular", sans-serif;
    // color:red;
    font-size:3rem;
    display:flex;
    width:100%;
    padding-top:30px;
    padding-bottom:10px;
  }

  .articlecontent p{
    font-size:1.6rem;
    color:#505050;
    line-height:1.8;
  }

  .gatsby-image-wrapper, .gatsby-image-wrapper-constrained{
    width:100%;
  }
  .gatsby-image-wrapper [data-main-image] {
    opacity: 0;
    width:100%;
}
`;

const BlogPostTemplate = (props) => {
  const { data, errors } = props;
  const post = data && data.post;
  const { _rawBody, authors, categories, title, mainImage, publishedAt } =
    props;
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
      <MagazineArticlePageStyles>
        <Container>
          <div className="herodiv height-80vh">
            {post.mainImage && post.mainImage.asset && (
              <Image {...post.mainImage} alt={post.mainImage.alt} />
            )}
          </div>

          <div className="titlwrapmagazine">
            <span>{format(new Date(post.publishedAt), "MMMM Mo, yyyy")}</span>
            <h3 className="articletitle">{post.title}</h3>
          </div>

          <div className="articlecontent">{post && <BlogPost {...post} />}</div>
        </Container>
      </MagazineArticlePageStyles>
    </Layout>
  );
};

export default BlogPostTemplate;
