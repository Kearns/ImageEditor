import React from 'react'

export default class FilterSlider extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = { value: this.props.defaultValue }
    }

    onChange = (e) => {
        e.preventDefault();
        this.setState({ 
            value: e.target.value
        })
        this.props.onChange(this.props.filter, this.state.value + this.props.unit)
    }

    render(){
        return (
            <div className="filter-slider">
                <label>{ this.props.label !== null ? this.props.label : this.props.filter }</label>
                <input  type="range"  
                        min={ this.props.min } 
                        max={ this.props.max } 
                        step={ this.props.step }
                        value={ this.state.value }
                        disabled={ this.props.disabled }
                        onChange={ e => this.onChange(e) } />
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
