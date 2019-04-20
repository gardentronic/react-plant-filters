import React, {useState} from 'react'
import PropTypes from 'prop-types'

/**
 I just added this to
 A) play with  hooks!
 B) Get a quick "state" in there.

 */

/**
 Reuse the same component with 3 predefined states:

 - "display" current colors selected
 - "desktop" vertical layout for desktop choices
 - "mobile" horizontal layout for mobile

 switched via props "mode"

 */


import ColorList from '../ColorList'
import ColorIndicator from '../ColorIndicator'

const colorSelector = ({
                         colors,
                         selected_colors,
                         onColorClick
                       }) => {

  // This is reasonable for now, since the open/close state
  // does not need to be handled in redux
  const [open, setOpen] = useState(false)

  const onSelectorClick = () => {
    console.log(`onSelectorClick. Toggling to ${!open}`)
    setOpen(!open)
  }

  return (
    <div className="row">
      <div className="col-4">
        <span>COLORS</span>
      </div>
      <div className="col-8">
        {open ?
          <div className="modal-backdrop"
               onClick={onSelectorClick}
               style={{
                 backgroundColor: 'white',
                 opacity: '20%',
                 zindex: '100'
               }}>
            <div style={{zindex: '200'}}>
              <i className="fa fa-close"
                    onClick={onSelectorClick}
              style={{
                width:'50px',
                height: '50px',
                backgroundColor: 'white',
              }}/>
              <ColorList onColorClick={onColorClick}
                         colors={colors}/>
            </div>
          </div>
          :
          <div onClick={onSelectorClick}>
            <i className="fa fa-close"></i>
            <ColorIndicator colors={colors}/>
          </div>
        }
      </div>
    </div>
  )
}

colorSelector.propTypes = {
  colors: PropTypes.array,
  selected_colors: PropTypes.array,

  // Handlers
  onColorClick: PropTypes.func.isRequired,
}


colorSelector.defaultProps = {}

export default colorSelector

