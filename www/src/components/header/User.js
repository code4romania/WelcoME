import React from 'react'
import PropTypes from 'prop-types'
import Button from 'react-md/lib/Buttons/Button'
const User = ({username, clickProfile, clickSignout}) => {
  return (
    <div>
      <Button onClick={clickProfile} style={{marginTop: 7}} flat primary label={username} />
      <Button onClick={clickSignout} style={{marginTop: 7}} flat secondary >power_settings_new</Button>
    </div>
  )
}
User.propTypes = {
  username: PropTypes.string.isRequired,
  clickProfile: PropTypes.func.isRequired,
  clickSignout: PropTypes.func.isRequired
}
export default User
