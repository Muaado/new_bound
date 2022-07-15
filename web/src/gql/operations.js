import { gql } from "@apollo/client";
import { Fragment_MainImage } from "./fragments";
export const Query_Villa = gql`
  query Villa($id: ID!) {
    Villa(id: $id) {
      _id
      name
      headerImages {
        images {
          ...Fragment_MainImage
          alt
        }
      }
      numrooms
      sizeSqm
      showers {
        option
        number
      }

      villaPoolTypes {
        poolType
      }

      maxOccupancy {
        option
        number
      }
      resort {
        name
      }
    }
  }
  ${Fragment_MainImage}
`;
