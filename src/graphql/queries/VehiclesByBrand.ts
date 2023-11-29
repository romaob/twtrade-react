import { gql } from '@apollo/client';

export const VEHICLES_BY_BRAND = gql`
  query VehiclesByBrand($brand: String!) {
    vehiclesByBrand(brand: $brand) {
      _id
      name
      model
      avgPrice
      horsepower
      torque
      engine
      weight
    }
  }
`;
