import React from 'react'

const DropZone = ({fileHandler}) => {

    const onFileSelected = e => {
        e.preventDefault();

       let file = e.target.tagName === 'INPUT' ? e.target.files[0] : e.dataTransfer.files[0]
        
        if (file !== undefined) {
            fileHandler(file)
        }
    }

    const onClick = e => {
        e.stopPropagation();

        //if parent clicked directly
        if (e.target.tagName === 'DIV') {
            return e.target.querySelector('input').click()
        }
        
        e.target.parentNode.querySelector('input').click()
    }
    
    return (
        <div className="dz__wrapper">
            <div    className= "dz__dropzone" 
                    onDragOver= { e => e.preventDefault() } 
                    onDrop= { e => onFileSelected(e) }
                    onClick= { e => onClick(e) }>
                    <input onChange = {e => onFileSelected(e) } type="file" id="fileLoader" name="files" title="Load File" style={{display:'none'}}/>
                    <span className="dz__upload-icon" />
                    <span className="dz__instructions">Drop file or click here.</span>
            </div>
        </div>

    )
}

export default DropZone