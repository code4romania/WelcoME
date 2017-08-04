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
        id={props.name}
        className={props.active ? 'active-link' : 'inactive-link'}
        onClick={props.action}
        label={props.text}
        isOpen={props.active}
        buttonChildren={props.icon}
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
        id={props.name}
        className={props.active ? 'active-link' : 'inactive-link'}
        onClick={props.action}
        label={props.text}
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
  name: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  active: PropTypes.bool.isRequired,
  className: PropTypes.string,
  icon: PropTypes.oneOf([PropTypes.string, PropTypes.element,PropTypes.object]),
  text: PropTypes.string,
  action: PropTypes.func,
  isMenu: PropTypes.bool,
  subLinks: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    action: PropTypes.func.isRequired,
    icon: PropTypes.string,
    text: PropTypes.string,
  })),
}

export default NavLink
