import React from 'react'
import NavLink from './NavLink'

const Menu = ({links}) => {
  return (
    <div>
      {(links || []).map(link => (
        <NavLink name={link.key} {...link} />
        ))}
    </div>
  );
}

export default Menu
