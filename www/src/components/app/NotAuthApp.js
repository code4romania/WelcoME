import React from 'react'
import PropTypes from 'prop-types'
import HomeCard from '../header/HomeCard'
import LinearProgress from 'react-md/lib/Progress/LinearProgress'
import Toolbar from '../header/Toolbar'
import Pages from '../pages/Pages'
import './NotAuthApp.css'

const NotAuthApp = ({logo, links, pages, loaded}) => {
  const {title, action} = logo;

  return (
    <div>
      <Toolbar links={links} />
      <HomeCard title={title} action={action} />
      <Pages pages={pages} />
    </div>
  );
}

NotAuthApp.PropTypes = {
  loaded: PropTypes.bool.isRequired,
  logo:  PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired
  })).isRequired,
  links: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    action: PropTypes.func.isRequired,
    active: PropTypes.bool.isRequired
  })).isRequired,
  pages: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    Page: PropTypes.oneOf([PropTypes.element, PropTypes.func]).isRequired,
    visible: PropTypes.bool.isRequired
  })).isRequired
}

export default NotAuthApp
