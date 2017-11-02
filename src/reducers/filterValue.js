import { combineReducers } from 'redux'

function createFilterWithNamedType(initialState={filter: '', value: 0, unit: '%'}) {
    return function filterValue(state = initialState, action) {
        switch (action.type) {
            case `UPDATE_${state.filter.toUpperCase()}`:
                state.value = action.value
                return state;
            default:
                return state;
        }
    }
}

export default combineReducers({
    opacity: createFilterWithNamedType({filter: 'opacity', value: 100, unit:'%'}),
    contrast: createFilterWithNamedType({filter: 'contrast', value: 100, unit:'%'}),
    saturate: createFilterWithNamedType({filter: 'saturate', value: 100, unit:'%'}),
    hueRotate: createFilterWithNamedType({filter: 'hue-rotation', value: 0, unit:'deg'}),
    grayscale: createFilterWithNamedType({filter:'grayscale', value: 0, unit:'%'}),
    sepia: createFilterWithNamedType({filter: 'sepia', value: 0, unit:'%'}),
    invert: createFilterWithNamedType({filter: 'invert', value: 100, unit:'%'}),
    blur: createFilterWithNamedType({filter: 'blur', value: 100, unit: 'px'})
})
