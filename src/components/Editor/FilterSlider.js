import React from 'react'


export default class FilterSlider extends React.Component {

    componentDidMount() {
        this.inputElement.value = this.props.value
    }

    onChange = (e) => {
        e.preventDefault()
        this.props.onChange(e, this.props.filter)
    }

    render() {
        return (
            <div className="filter-slider">
                <label>{ this.props.label !== null ? this.props.label : this.props.filter }</label>
                <input  type="range"  
                        min={ this.props.min } 
                        max={ this.props.max } 
                        step={ this.props.step }
                        disabled={ this.props.disabled }
                        onChange={ e => this.onChange(e) }
                        ref={ (input) => this.inputElement = input } />
            </div>
        )
    }
}

FilterSlider.defaultProps = {
    defaultValue: 0,
    disabled: false,
    label: null, 
    unit: '%', 
    min: "0", 
    max: "100",
    step: "1"
}