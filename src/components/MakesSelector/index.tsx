import React from 'react'

import brands from '../../fake-data/twtrade-db.brands.json'

import './MakesSelector.css'

type Props = {
    value?: string;
    onChange?: (value: string) => void;
}

export default function MakesSelector({
    value = '',
    onChange = () => {
        // do nothing
    },
}: Props): JSX.Element {
  return (
    <div className='makes-selector' data-testid='makes-selector'>
        {/* Dropdown selector for the makes */}
        <select className="makes-selector-select" value={value} onChange={(e) => onChange(e.target.value)}>
            <option value=''>All Makes</option>
            {brands.map((brand, i) => (
                <option key={brand.name + i} value={brand.name}>{brand.name}</option>
            ))}
        </select>
    </div>
  )
}