import React from 'react'
import PropTypes from 'prop-types'

/**
 This is the list for the selection dialog. It's a unique component
 so that it is not necessary to make one component do both
 the selector and indicator function.

 I'm not opposed to them being the same, but I don't want to make things
 more complex, or have a "comlex" component, when 2 simpler ones would
 work just as well (and easier to reason about)
 */

import ColorItem, { colorItemProps } from '../ColorItem'

const colorList = ({
                     colors, cxinc, cyinc, cx,
                     cy, onColorClick,
                   }) => {

  if (!colors) { return null }

  cy = cy || cx

  const render_colors = colors.map((c, i) => {
    return (
      <ColorItem key={ i }
                 id={ i }
                 cx={ cx + i * cxinc }
                 cy={ cy + i * cyinc }
                 { ...c }
                 onClick={ onColorClick }/>
    )
  })

  return (
    <React.Fragment>
      { render_colors }
    </React.Fragment>
  )
}

colorList.propTypes = {
  ...colorItemProps,
  colors: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string.isRequired,
      selected: PropTypes.bool.isRequired,
    }).isRequired,
  ).isRequired,
  cxinc: PropTypes.number,
  cyinc: PropTypes.number,

  // Callbacks
  onColorClick: PropTypes.func.isRequired,
}

colorList.defaultProps = {
  cxinc: 0,
  cyinc: 0,
  cx: 50,
  cy: null,
  sw: 1,
}

export default colorList

