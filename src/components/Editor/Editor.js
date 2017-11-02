import React from 'react'
import './Editor.css'
import EditorCanvas from './EditorCanvas'
import EditorMenu from './EditorMenu'
import DropZone from './DropZone'

export default class Editor extends React.Component {

    constructor(props) {
        super(props);
        this.state = { imageLoaded: false, imageData: '', ctxValues: {}, filter: {}, imageSize: []}
    }
     
    /**
    * load image data into state
    * @param {File} src - image source
    */
      loadImage = (src) => {
        // ensure file is an image
        if(!src.type.match(/image.*/)) {
            return alert("The selected file is not an image");
        }
        // start file reader
        const reader = new FileReader();
        reader.onload = e => {    
            this.setState({
              imageLoaded: true,
              imageData: e.target.result,
              //imageSize: [this.canvas.canvasElement.width,this.canvas.canvasElement.height],
              ...this.state.ctxValues
            })
        };
        reader.readAsDataURL(src);
    }

    /**
     * Clears image from canvas
     */
    onCrop = (croppedSize) => {
        this.setState({
            imageSize: croppedSize, 
            ...this.state
        })
    }
    /**
     * Clears image from canvas
     */
    onClear = () => {
        this.setState({
            imageLoaded: false, 
            imageData: '',
            ...this.state.ctxValues
        })
    }

    /**
     * Attempts download of image from canvas
     * @param {Event} e
     */
    onSave = (e) => {
        let a = document.createElement('a');
       // prompt user for file name
        a.download = prompt("Please enter a name for your image","edited-image");
        // if user did not cancel prompt, continue download
        if(a.download !== 'null') {
            a.download = a.download !== '' ? a.download :'edited-image';
            a.href = this.canvas.canvasElement.toDataURL();
            a.click();
        }
    }
    /**
     * updates filter state on change.
     * @param {String} filter - Name of the filter
     * @param {String} value - Complete filter value output
     */
    onFilterChange = (filter, value) => {
        this.setState({
            ...this.state,
            filter: { ...this.state.filter, [filter]:value }
        })
    }

    updateStoredDimensions = (width,height) => {
        this.setState({
            ...this.state,
            imageSize: [width, height]
        })
    }
    
    render() {
        return (
            <div className="editor">
                { 
                    this.state.imageData === '' ? <DropZone fileHandler={ this.loadImage }/> 
                                                : <EditorCanvas src={ this.state.imageData } 
                                                                filter={ this.state.filter } 
                                                                ref={ canvasElement =>  this.canvas = canvasElement  }
                                                                imageSize = {this.state.imageSize}
                                                                updateStoredDimension= { this.updateStoredDimensions }/> 
                }

                <EditorMenu ctxValues={ this.state.ctxValues } 
                            onClear={ this.onClear } 
                            onSave={ this.onSave } 
                            onFilterChange={ this.onFilterChange } 
                            imageLoaded = { this.state.imageLoaded } />
            </div>
        )
    }
}
