import { useQuery, gql } from '@apollo/client';
import { VEHICLES_BY_BRAND } from '../queries/VehiclesByBrand';
import { Brand } from './useBrands';

export interface Vehicle {
  _id: string;
  name: string;
  model: string;
  avgPrice: number;
  horsepower: number;
  torque: number;
  engine: string;
  weight: number;
  brand: Brand;
}

interface VehiclesByBrandData {
  vehiclesByBrand: Vehicle[];
}

const useVehicleByBrand = (brand: string) => {
  const { loading, error, data } = useQuery<VehiclesByBrandData>(
    VEHICLES_BY_BRAND,
    {
      variables: { brand },
    },
  );

  return {
    loading,
    error,
    data: data?.vehiclesByBrand,
  };
};

export default useVehicleByBrand;
