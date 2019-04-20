import React from 'react'
import PropTypes from 'prop-types'

/**
 Implementation Notes

 I wrapped the colors in a div, and set the height of the div
 to be larger than the circles by 2x the  margin (marg).

 I use absolute positioning on the circle spans, and move them
 relative to the start point with the 'left' style


 */

import ColorItem, { colorShape } from '../ColorItem'

const colorIndicator = ({
                          colors,
                          cxinc,
                          cx,
                          margin=20,
                        }) => {

  cxinc = cxinc || cx / 2

  const onColorClick = () => {
    console.log('Color Item clicked')
  }

  let render_colors = null
  if (colors) {
    render_colors = colors.map((c, i) => {

        const style = {
          position: 'absolute',
          top: `${ margin }px`,
          left: `${ cx + i * cxinc }px`,
        }

        return (
          <div key={ i } style={ style }>
            <ColorItem
              id={ i }
              cx={ cx }
              { ...c }
              onClick={ onColorClick }/>
          </div>
        )
      },
    )

  }

  return (
    <div style={ {
      width: '100%',
      height: `${ cx + 2 * margin }px`,
      position: 'relative',
    } }>
      { render_colors }
    </div>
  )
}

colorIndicator.propTypes = {

  colors: PropTypes.arrayOf(colorShape).isRequired,
  cx: PropTypes.number.isRequired,
  cxinc: PropTypes.number,
  sw: PropTypes.number,
  margin: PropTypes.number,
}

colorIndicator.defaultProps = {
  marg: 5,
  cx: 50,
  sw: 1,
}

export default colorIndicator

