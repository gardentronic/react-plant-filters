import React from 'react'
import PropTypes from 'prop-types'

/**
 So far this is used for the color list and the color indicator.
 This wraps a span in a div, but maybe that isn't the best solution?
 Perhaps we want to use a ul, or even let the caller determine
 the wrapper component.

 Probably the best solution would be to
 */

const colorItem = ({
                     id, cx, cy, sw,
                     color, onClick, selected
                   }) => {

  if (cy == null) {
    cy = cx
  }

  let cprops = {
    stroke: 'white',
    fillOpacity: 0.7,
  }

  if (selected) {
    cprops = {
      strokeWidth: sw,
      // Turn on one of the filters
      filter: "url(#selected)"
    }
  }

  const styles = {
    borderRadius: '50%',
    width: cx,
    height: cy,
    border: '2px solid white',
    display: 'inline-block',
    backgroundColor: color,
  }

  return (
    <span
      style={styles}
      onClick={() => onClick(id)}
    />
  )
}

export const colorShape = PropTypes.shape({
  color: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
})

export const colorItemProps = {
  cx: PropTypes.number.isRequired,
  cy: PropTypes.number,
  sw: PropTypes.number,
}

colorItem.propTypes = {
  ...colorItemProps,
  color: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
}

colorItem.defaultProps = {
  cy: null,
  selected: false,
  sw: 2,
}

export default colorItem

