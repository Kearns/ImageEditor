import React from 'react'
import FilterSlider from './FilterSlider'

const EditorMenu = ({ctxValues = {}, onClear, onSave, onPropertyChange, onFilterChange, imageLoaded, onCrop}) => {
    
    let isDisabled = !imageLoaded ? true : false;

    return (
        <div className="editor__menu">
            <h2>Filters</h2>
            <FilterSlider filter="opacity" defaultValue="100" onChange={ onFilterChange } disabled={ isDisabled }/>
            <FilterSlider filter="contrast" defaultValue="100" onChange={ onFilterChange } max="200" disabled={ isDisabled }/>
            <FilterSlider filter="saturate" defaultValue="100" label="Saturation" onChange={onFilterChange} max="200" disabled={ isDisabled }/>
            <FilterSlider filter="hue-rotate" label="Hue" onChange={ onFilterChange } min="-360" max="360" unit="deg" step="1" disabled={ isDisabled }/>
            <FilterSlider filter="grayscale" onChange={ onFilterChange } disabled={ isDisabled }/>
            <FilterSlider filter="sepia" onChange={ onFilterChange } disabled={ isDisabled }/>
            <FilterSlider filter="invert" onChange={ onFilterChange } disabled={ isDisabled }/>
            <FilterSlider filter="blur" onChange={ onFilterChange } unit="px" disabled={ isDisabled }/>

            <div className="editor__menu__btns">
            <button className="editor__menu__btn" disabled={ isDisabled } onClick={ e => onCrop(e) }>Crop</button>
        </div>
            <div className="editor__menu__btns">
                <button className="editor__menu__btn editor__menu__btn--save" disabled={ isDisabled } onClick={ e => onSave(e) }>Save</button>
                <button className="editor__menu__btn editor__menu__btn--clear" disabled={ isDisabled } onClick={ e => onClear(e) }>Clear</button>
            </div>
        </div>
    )
}

export default EditorMenu
