import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { State, Store } from '@sambego/storybook-state'

import { filters, colors_by_id, selected_colors } from '../data'

import SearchFilters from 'src/SearchFilters'

import ColorItem from 'src/ColorFilter/ColorItem'
import ColorList from 'src/ColorFilter/ColorList'
import ColorIndicator from 'src/ColorFilter/ColorIndicator'
import ColorSelector from 'src/ColorFilter/ColorSelector'

const filterStore = new Store({
  filters: filters,
  colors_by_id: colors_by_id,
  selected_colors: selected_colors,
  selected_filters: [],
})

// This works like a redux selector to put the store state into a convenient format
const color_selector = (colors_by_id, selected_colors) => {
  const id_list = Object.keys(colors_by_id)
  const colors = id_list.map(id => {
    const selected = selected_colors.indexOf(id) >= 0
    return { 'id': id, ...colors_by_id[id], selected: selected }
  })
  return colors
}

storiesOf('Search Filters', module)
  .add('Color Item', () => {
    return (
      <ColorItem cx={ 50 } color='red'
                 onClick={ action('on click') }
      />
    )
  })
  .add('Color Item List', () => {
    return (
      <div className="container-fluid">
        <div className="row">
          <ColorList
            cx={ 50 }
            colors={ color_selector(colors_by_id, selected_colors) }
            onColorClick={ action('color clicked') }
          />
        </div>
      </div>
    )
  })
  .add('Color Item Indicator', () => {
    return (
      <div className="container-fluid">
        <div className="row" style={ {
          border: '1px solid blue',
        } }>
          <div className="col-4" style={ { overflow: 'hidden' } }>
            <div className="row" style={ { backgroundColor: 'lightgray' } }>
              <div className="col-4"><h3>COLORS</h3></div>
              <div className="col-8">
                <ColorIndicator
                  cx={ 25 } marg={ 10 }
                  colors={ filters }
                  onColorClick={ action('color clicked') }
                />

              </div>

            </div>
          </div>
        </div>
        <div className="row">
          <div className="col"><h2>Some following text</h2></div>
        </div>
      </div>
    )
  })
  .add('Color Selector', () => {
    return (
      <div className="row">
        <div className="col-4">
          <div className="row">
            <ColorSelector
              colors={ color_selector(colors_by_id, selected_colors) }
              selected_colors={ filters }
              onColorClick={ action('color clicked') }
            />
          </div>
        </div>
      </div>
    )
  })
  .add('Color Filter', () => {
    return (
      <div className="row">
        <div className="col-6">
          COLOR
        </div>
        <div className="col-6">
          <ColorIndicator
            cx={ 30 }
            colors={ color_selector(colors_by_id, selected_colors) }
            onColorClick={ action('color clicked') }
          />
        </div>
      </div>
    )
  })
  .add('Search Filters', () => {

    return (
      <State store={ filterStore }>
        { state => (
          <SearchFilters
            colors={ color_selector(colors_by_id, selected_colors) }
            selected_colors={selected_colors}
            onColorClick={ action('color clicked')}
            currentFilters={ state.filters }
          />
        ) }
      </State>
    )
  })
// .add('Color Filter List', () => {
//   const colors = [
//     {color:'red'},
//     {color:'blue'},
//     {color:'green'},
//     {color:'pink'},
//     {color:'gray'},
//   ]
//   return (
//     <svg width="400" height="200">
//       <CL2 colors={colors} />
//     </svg>
//   )
// })
// .add('Color Filter Vertical List', () => {
//   return (
//     <svg width="400" height="700">
//       <ColorSelector/>
//     </svg>
//   )
// })
// .add('Search Bar', () => {
//   return <h1>Search Bar</h1>
// })

