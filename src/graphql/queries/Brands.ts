import { gql } from '@apollo/client';

export const BRANDS_QUERY = gql`
  query Brands {
    brands {
      name
      img
      _id
    }
  }
`;
