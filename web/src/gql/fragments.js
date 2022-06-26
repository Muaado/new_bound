import { gql } from "@apollo/client";

export const Fragment_MainImage = gql`
  fragment Fragment_MainImage on MainImage {
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
      url
    }
    colorType
  }
`;
