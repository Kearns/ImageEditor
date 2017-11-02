import React from 'react'
import CroppingTool from './CroppingTool'

import { connect } from 'react-redux'

class EditorCanvas extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            startPosition: {}, 
            currentPosition: {},
            mouseDown: false,
            image: null,
            prevImageState: [],
            ctx: {}
        }
    }

    componentDidMount(){
        // initial set up of the canvas
        let image = new Image();
        let ctx = this.canvasElement.getContext("2d")

        image.onload = () => {
            ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
            this.canvasElement.width = image.width;
            this.canvasElement.height = image.height;
            ctx.drawImage(image, 0, 0, image.width, image.height);

        };
        image.src = this.state.image !== null ? this.state.image : this.props.src;
        this.setState({
            ...this.state,
            image:image,
            ctx: ctx
        })
    }

    componentDidUpdate(){
        let image = this.state.image;
        let ctx = this.state.ctx
            //clear canvas to make opacity filter to properly work.
            ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);

            this.canvasElement.width = image.width;
            this.canvasElement.height = image.height;

            // gather all filters into a single string
            let filters = ''; 
            for(let key in this.props.filters) {
                let currentFilter = this.props.filters[key]
                filters += ` ${currentFilter.filter}(${currentFilter.value + currentFilter.unit})`
            }
            
            //set the filter prior to draw
            ctx.filter = filters;
            ctx.drawImage(image, 0, 0, image.width, image.height);
    }

    beginCrop = (e) => {
        let rect = this.canvasElement.getBoundingClientRect();

        //TODO: MOVE INTO COMPONENT
        let cTool = document.querySelector('.cropping-tool');
        cTool.style.left = e.clientX + 'px';
        cTool.style.top = e.clientY + 'px';

        this.setState({
            mouseDown: true,

            startPosition: { 
                x: Math.floor( ( e.clientX - rect.left ) / ( rect.right - rect.left ) * this.canvasElement.width ),
                y: Math.floor( ( e.clientY - rect.top ) / ( rect.bottom - rect.top ) * this.canvasElement.height )
            },
            currentPosition: { 
                x: Math.floor( ( e.clientX - rect.left ) / ( rect.right - rect.left ) * this.canvasElement.width ),
                y: Math.floor( ( e.clientY - rect.top ) / ( rect.bottom - rect.top ) * this.canvasElement.height )
            }
        })
    }
    
    duringCrop = (e) => {
        if (this.state.mouseDown === true) {
            let rect = this.canvasElement.getBoundingClientRect();

            //TODO: MOVE INTO COMPONENT
            let cTool = document.querySelector('.cropping-tool');
            cTool.style.height = e.clientY - parseInt(cTool.style.top, 10) + 'px'
            cTool.style.width = e.clientX - parseInt(cTool.style.left, 10) + 'px'
            
            this.setState({
                ...this.state,
                currentPosition: {
                    x: Math.floor( ( e.clientX - rect.left ) / ( rect.right - rect.left ) * this.canvasElement.width ),
                    y: Math.floor( ( e.clientY - rect.top ) / ( rect.bottom - rect.top ) * this.canvasElement.height )
                }
            })
        }
    }

    endCrop = (e) => {
        
        if (this.state.mouseDown === true) {
            this.cropCanvas()
        }
    }

    cropCanvas() {
        let image = this.state.image;
        let tempCanvas = document.createElement("canvas");
        let ctx = tempCanvas.getContext("2d")

        tempCanvas.width = Math.abs(this.state.currentPosition.x - this.state.startPosition.x);
        tempCanvas.height = Math.abs(this.state.currentPosition.y - this.state.startPosition.y);

        ctx.drawImage(image, 
            this.state.startPosition.x, this.state.startPosition.y, 
            this.state.currentPosition.x, this.state.currentPosition.y,0,0,
            this.state.currentPosition.x, this.state.currentPosition.y,
        );

        image.onload = () => {
            this.setState({
                ...this.state,
                image: image,
                mouseDown: false
            })
        }

        image.src = tempCanvas.toDataURL()

        
    }
    
    render(){
        return (
            <div className="editor__canvas__wrapper">
                    <CroppingTool  beginCrop={this.beginCrop} duringCrop={this.duringCrop} endCrop={this.endCrop} position={this.state.mousePos} state={this.state}>
                    <canvas className="editor__canvas" ref={ ref => this.canvasElement = ref }/>
                    </CroppingTool>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        filters: state.filterReducers
    }
}

export default connect( mapStateToProps)(EditorCanvas)