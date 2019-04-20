import React, {useState} from 'react'
import PropTypes from 'prop-types'
import classes from './styles.local.scss'
import MediaQuery from 'react-responsive';

const searchFilter = (props) => {

  const [isFilterChoicesShown, setDisplay] = useState(false)

  const currentFiltersDisplay =
    props.children && React.cloneElement(props.children, {
      currentFilter: props.currentFilter,
      mode: 'display'
    })

  const filterChoices =
    <>
      <MediaQuery maxWidth={992}>
        <div
          className={classes.mobilefilterchoices}
        >
          {props.children && React.cloneElement(props.children, {
            currentFilter: props.currentFilter,
            mode: 'mobile'
          })}
        </div>
      </MediaQuery>
      <MediaQuery minWidth={993}>
        <div
          className={classes.desktopfilterchoices}
        >
          {props.children && React.cloneElement(props.children, {
            currentFilter: props.currentFilter,
            mode: 'desktop'
          })}
        </div>
      </MediaQuery>
    </>

  const iconStyle = props.iconURL ? {
    background: "url('" + props.iconURL + "') center center no-repeat",
  } : {
    background: "#B8C1CB",
    borderRadius: "50%"
  }

  return <>
    <div
      className={classes.searchfiltercontainer}
    >
      <div
        className={classes.searchfilter}
        onClick={() => setDisplay(!isFilterChoicesShown)}
      >
        <div
          className={classes.toggle}
        >
          {isFilterChoicesShown ? '-' : '+'}
        </div>
        <div
          className={classes.label}
        >
          {props.title}
          {!currentFiltersDisplay && <span
            className={classes.filtericon}
            style={iconStyle}
          ></span>}
        </div>
        <div>
          {currentFiltersDisplay}
        </div>
      </div>
      {isFilterChoicesShown && filterChoices}
    </div>

  </>
}

export default searchFilter

