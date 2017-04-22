import React from 'react'
import Button from 'react-md/lib/Buttons/Button'
const Logo = ({clickLogo}) => {
  return <Button onClick={clickLogo} style={{marginTop: 7}} flat primary label='Welcome'>rss_feed</Button>
}
export default Logo
