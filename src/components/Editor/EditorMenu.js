import React from 'react'
import FilterSlider from './FilterSlider'
import { connect } from 'react-redux'
import { dispatch} from 'redux'


const EditorMenu = ({filterValues, updateFilter, ctxValues = {}, onClear, onSave, onPropertyChange, onFilterChange, imageLoaded, onCrop}) => {

    let isDisabled = !imageLoaded ? true : false;

    return (
        <div className="editor__menu">
            <h2>Filters</h2>
            <FilterSlider filter="opacity" value={filterValues.opacity.value} onChange={ updateFilter } disabled={ isDisabled }/>
            <FilterSlider filter="contrast" value={filterValues.contrast.value} onChange={ updateFilter } max="200" disabled={ isDisabled }/>
            <FilterSlider filter="saturate" value={filterValues.saturate.value} onChange={ updateFilter } label="Saturation" max="200" disabled={ isDisabled }/>
            <FilterSlider filter="hue-rotate" value={filterValues.hueRotate.value} onChange={ updateFilter } label="Hue" onChange={ onFilterChange } min="-360" max="360" unit="deg" disabled={ isDisabled }/>
            <FilterSlider filter="grayscale" value={filterValues.grayscale.value} onChange={ updateFilter } disabled={ isDisabled }/>
            <FilterSlider filter="sepia" value={filterValues.sepia.value} onChange={ updateFilter } disabled={ isDisabled }/>
            <FilterSlider filter="invert" value={filterValues.invert.value} onChange={ updateFilter } disabled={ isDisabled }/>
            <FilterSlider filter="blur" value={filterValues.blur.value} onChange={ updateFilter } unit="px" disabled={ isDisabled }/>

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

const mapStateToProps = state => {
    return {
      filterValues: state.filterReducers
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      updateFilter: (e, filter) => {
        dispatch({type:`UPDATE_${filter.toUpperCase()}`,value: e.target.value})
      }
    }
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditorMenu)
  