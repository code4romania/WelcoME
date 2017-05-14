import React from 'react'
import PropTypes from 'prop-types'
import TitleCard from '../header/TitleCard'
import LinearProgress from 'react-md/lib/Progress/LinearProgress'
import Menu from '../header/Menu'
import Pages from '../pages/Pages'
import './NotAuthApp.css'

const NotAuthApp = ({logo, links, pages, loaded}) => {
  const {title, action} = logo;

  let progressBar = loaded
    ? <LinearProgress id='progress-notauth' className='progress-notauth' />
    : null;

  return (
    <div>
      <TitleCard title={title} action={action} />
      {progressBar}
      <div className='notauth-div'>
        <Menu links={links} />
      </div>
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
