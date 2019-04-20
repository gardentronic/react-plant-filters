import React from 'react'
import PropTypes from 'prop-types'
import classes from './styles.local.scss'

//import SearchFilter from './SearchFilter'
import ColorSelector from 'src/ColorFilter/ColorSelector'

const searchFilters = ({colors, selected_colors, onColorClick}) => (
  <div
    className={classes.searchfilterscontainer}
  >

    <ColorSelector
      colors={colors}
      selected_colors={selected_colors}
      onColorClick={onColorClick}
    />

    {/*<SearchFilter*/}
      {/*title="TYPE"*/}
      {/*iconURL=""*/}
    {/*>*/}
    {/*</SearchFilter>*/}

    {/*<SearchFilter*/}
      {/*title="SUN"*/}
      {/*iconURL="/static/images/app-icons/sun-icon-gray.png"*/}
    {/*>*/}
    {/*</SearchFilter>*/}

    {/*<SearchFilter*/}
      {/*title="SPACING"*/}
      {/*iconURL="/static/images/app-icons/space-icon-gray.png"*/}
    {/*>*/}
    {/*</SearchFilter>*/}

  </div>
)

searchFilters.propTypes = {
  colors: PropTypes.array,
  selected_colors: PropTypes.array,
  onColorClick: PropTypes.func,
}

export default searchFilters

