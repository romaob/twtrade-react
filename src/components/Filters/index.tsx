import React from 'react';
import TextInput, { TextInputSizes } from '../TextInput';
import { useSearchContext } from '../../context/SearchContext';
import MakesSelector from '../MakesSelector';

import './Filters.css';
import { Brand } from '../../graphql/hooks/useBrands';

export default function Filters(): JSX.Element {
  const { searchFilters, setSearchFilters } = useSearchContext();

  function handleSearchChange(value: string) {
    setSearchFilters &&
      setSearchFilters({ ...searchFilters, description: value });
  }

  function updateFilters(key: string, value: any) {
    setSearchFilters && setSearchFilters({ ...searchFilters, [key]: value });
  }

  function handleOnBrandSelect(brand: Brand) {
    setSearchFilters && setSearchFilters({ ...searchFilters, brand: brand._id });
  }

  return (
    <div className="filters" data-testid="filters">
      <h3>Filter results</h3>

      <div className="filter">
        <TextInput
          value={searchFilters?.description || ''}
          placeholder="Search Posts"
          onChange={handleSearchChange}
          size={TextInputSizes.SMALL}
          testId="search-input"
        />
      </div>

      <h4>Makes:</h4>
      <div className="filter">
        <MakesSelector brandSelectedID={searchFilters?.brand || ''} onChange={handleOnBrandSelect} />
      </div>

      <h4>Price:</h4>
      <div className="filter">
        <TextInput
          type={'number'}
          placeholder="Min"
          size={TextInputSizes.SMALL}
          value={searchFilters?.priceMin + '' || ''}
          onChange={(value) => updateFilters('priceMin', parseInt(value))}
          testId="price-min"
        />
        <TextInput
          type={'number'}
          placeholder="Max"
          size={TextInputSizes.SMALL}
          value={searchFilters?.priceMax + '' || ''}
          onChange={(value) => updateFilters('priceMax', parseInt(value))}
          testId="price-max"
        />
      </div>

      <h4>Year:</h4>
      <div className="filter">
        <TextInput
          type={'number'}
          placeholder="Min"
          size={TextInputSizes.SMALL}
          value={searchFilters?.yearMin + '' || ''}
          onChange={(value) => updateFilters('yearMin', parseInt(value))}
          testId="year-min"
        />
        <TextInput
          type={'number'}
          placeholder="Max"
          size={TextInputSizes.SMALL}
          value={searchFilters?.yearMax + '' || ''}
          onChange={(value) => updateFilters('yearMax', parseInt(value))}
          testId="year-max"
        />
      </div>

      <h4>Mileage:</h4>
      <div className="filter">
        <TextInput
          type={'number'}
          placeholder="Min"
          size={TextInputSizes.SMALL}
          value={searchFilters?.mileageMin + '' || ''}
          onChange={(value) => updateFilters('mileageMin', parseInt(value))}
          testId="mileage-min"
        />
        <TextInput
          type={'number'}
          placeholder="Max"
          size={TextInputSizes.SMALL}
          value={searchFilters?.mileageMax + '' || ''}
          onChange={(value) => updateFilters('mileageMax', parseInt(value))}
          testId="mileage-max"
        />
      </div>
    </div>
  );
}
