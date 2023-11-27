import React from 'react'
import TextInput, { TextInputSizes } from '../TextInput'
import { useSearchContext } from '../../context/SearchContext'
import MakesSelector from '../MakesSelector';

import './Filters.css'

export default function Filters(): JSX.Element {
    const {searchValue, setSearchValue} = useSearchContext();

    function handleSearchChange(value: string) {
        setSearchValue(value);
    }

    return (
        <div className='filters' data-testid='filters'>
            <h3>Filter results</h3>

            <div className='filter'>
                <TextInput value={searchValue} placeholder='Search Posts' onChange={handleSearchChange} size={TextInputSizes.SMALL}/>
            </div>

            <h4>Makes:</h4>
            <div className='filter'>
                <MakesSelector />
            </div>

            <h4>Price:</h4>
            <div className='filter'>
                <TextInput type={'number'} placeholder='Min' size={TextInputSizes.SMALL}/>
                <TextInput type={'number'} placeholder='Max' size={TextInputSizes.SMALL}/>
            </div>

            <h4>Year:</h4>
            <div className='filter'>
                <TextInput type={'number'} placeholder='Min' size={TextInputSizes.SMALL}/>
                <TextInput type={'number'} placeholder='Max' size={TextInputSizes.SMALL}/>
            </div>

            <h4>Mileage:</h4>
            <div className='filter'>
                <TextInput type={'number'} placeholder='Min' size={TextInputSizes.SMALL}/>
                <TextInput type={'number'} placeholder='Max' size={TextInputSizes.SMALL}/>
            </div>
        </div>
    )
}