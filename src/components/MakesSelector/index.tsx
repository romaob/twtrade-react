import React from 'react';

import { Brand, useBrands } from '../../graphql/hooks/useBrands';
import Skeleton from '../Skeleton';

type Props = {
  brandSelectedID?: string;
  onChange?: (brand: Brand) => void;
};

export default function MakesSelector({
  brandSelectedID = '',
  onChange = () => {
    // do nothing
  },
}: Props): JSX.Element {
  const { loading, brands } = useBrands();

  return (
    <Skeleton loading={loading} flex>
      <div className="selector" data-testid="makes-selector">
        {/* Dropdown selector for the makes */}
        <select
          className="selector-select"
          value={
            brands?.find((brand) => brand._id === brandSelectedID)?.name || ''
          }
          onChange={(e) => {
            const brand = brands?.find(
              (brand) => brand.name === e.target.value,
            );
            brand && onChange(brand);
          }}
        >
          <option value="">All Makes</option>
          {brands?.map((brand, i) => (
            <option key={brand.name + i} value={brand.name}>
              {brand.name}
            </option>
          ))}
        </select>
      </div>
    </Skeleton>
  );
}
