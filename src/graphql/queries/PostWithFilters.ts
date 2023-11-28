import { gql } from '@apollo/client';

export const POSTS_WITH_FILTERS_QUERY = gql`
  query PostsWithFilters(
    $description: String
    $brand: ID
    $priceMin: Int
    $priceMax: Int
    $yearMin: Int
    $yearMax: Int
    $mileageMin: Int
    $mileageMax: Int
  ) {
    postsWithFilters(
      description: $description
      brand: $brand
      priceMin: $priceMin
      priceMax: $priceMax
      yearMin: $yearMin
      yearMax: $yearMax
      mileageMin: $mileageMin
      mileageMax: $mileageMax
    ) {
      _vehicle {
        name
        _id
      }
      year
      priceNow
      priceBefore
      _id
      _user {
        _id
        username
        email
        profile {
          name
          profileImage
        }
      }
      createdAt
      description
      images
      mileage
      updatedAt
      views
    }
  }
`;
