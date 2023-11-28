import { useQuery } from '@apollo/client';
import { BRANDS_QUERY } from '../queries/Brands';

export interface Brand {
  name: string;
  img: string;
  _id: string;
}

interface BrandsData {
  brands: Brand[];
}

export function useBrands() {
  const { loading, error, data } = useQuery<BrandsData>(BRANDS_QUERY);

  return { loading, error, brands: data?.brands };
}