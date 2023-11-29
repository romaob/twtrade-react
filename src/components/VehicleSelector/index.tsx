import React from 'react';

import { Brand } from '../../graphql/hooks/useBrands';
import Skeleton from '../Skeleton';
import useVehicleByBrand, {
  Vehicle,
} from '../../graphql/hooks/useVechicleByBrand';

type Props = {
  brandFilter?: Brand | null;
  vehicleSelectedID?: string;
  onChange?: (vehicle: Vehicle) => void;
};

export default function VehicleSelector({
  brandFilter,
  vehicleSelectedID = '',
  onChange = () => {
    // do nothing
  },
}: Props): JSX.Element {
  const { loading, data } = useVehicleByBrand(brandFilter?._id || '');

  return (
    <Skeleton loading={loading} flex>
      <div className="selector" data-testid="makes-selector">
        {/* Dropdown selector for the makes */}
        <select
          className="selector-select"
          value={
            data?.find((vehicle) => vehicle._id === vehicleSelectedID)?.name ||
            ''
          }
          onChange={(e) => {
            const vehicle = data?.find(
              (vehicle) => vehicle.name === e.target.value,
            );
            vehicle && onChange(vehicle);
          }}
        >
          <option value="">Select a model</option>
          {data?.map((vehicle, i) => (
            <option key={vehicle.name + i} value={vehicle.name}>
              {vehicle.name}
            </option>
          ))}
        </select>
      </div>
    </Skeleton>
  );
}
