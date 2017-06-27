import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-md/lib/Buttons'
import MenuButton from 'react-md/lib/Menus/MenuButton';
import ListItem from 'react-md/lib/Lists/ListItem';

import './NavLink.css'

const NavLink = (props) => {
  if (!props.visible) {
    return null;
  }
  
  const renderMenu = () => {
    return (
      <MenuButton
        id={props.key}
        className={props.active ? 'active-link' : 'inactive-link'}
        onClick={props.action}   
        label={props.text}
        isOpen={props.active}
        flat >      
        {(props.subLinks || []).map(link => (
          <ListItem>
            <NavLink {...link} />
          </ListItem>
        ))}        
      </MenuButton>
    );
  };
  
  const renderLink = () => {
    return (
      <Button         
        id={props.key}
        className={props.active ? 'active-link' : 'inactive-link'}
        onClick={props.action}   
        label={props.text}
        isOpen={props.active}
        flat >
        {props.icon}
      </Button>
    );
  };
    
  return props.isMenu 
    ? renderMenu()
    : renderLink();
}

NavLink.propTypes = {
  key: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  active: PropTypes.bool.isRequired,
  className: PropTypes.string,
  icon: PropTypes.string,
  text: PropTypes.string,
  action: PropTypes.func,
  isMenu: PropTypes.bool,
  subLinks: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    action: PropTypes.func.isRequired,
    icon: PropTypes.string,
    text: PropTypes.string,
    action: PropTypes.func,
  })),
}

export default NavLink
