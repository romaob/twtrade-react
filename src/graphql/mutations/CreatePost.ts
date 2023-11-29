import { gql } from '@apollo/client';

export const CREATE_POST = gql`
  mutation CreatePost(
    $user: ID!
    $description: String!
    $priceNow: Int!
    $mileage: Int!
    $year: Int!
    $vehicle: ID!
    $images: [String]
    $brand: ID!
    $priceBefore: Int
    $views: Int
  ) {
    createPost(
      description: $description
      priceNow: $priceNow
      mileage: $mileage
      year: $year
      _user: $user
      _vehicle: $vehicle
      _brand: $brand
      images: $images
      priceBefore: $priceBefore
      views: $views
    ) {
      _id
      _vehicle {
        _id
        brand {
          _id
          name
          img
        }
        name
        model
        avgPrice
        horsepower
        torque
        engine
        weight
      }
      _user {
        _id
        username
        email
        profile {
          name
          profileImage
        }
      }
      description
      priceNow
      priceBefore
      images
      mileage
      year
      views
      createdAt
      updatedAt
    }
  }
`;
