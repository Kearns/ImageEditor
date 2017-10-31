import React from 'react'

const CroppingTool = ({beginCrop, duringCrop, endCrop, state, children}) => {

    return (
        <div    className="cropping-wrapper" 
                onMouseDown={ e => beginCrop(e)} 
                onMouseMove={ e => duringCrop(e)} 
                onMouseUp={ e => endCrop(e)}  
                onMouseLeave={ e => endCrop(e)}>
                {console.log(state)}
            <div className="cropping-tool" style={{display: state.mouseDown ? 'block' : 'none' }}/>
            {children}
        </div>
    )
}

export default CroppingTool