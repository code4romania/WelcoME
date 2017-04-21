import React from 'react'
const Pages = ({pages}) => {
  return (
    <div>
      {(pages || []).map(({Page, props, visible}) => (
        visible ? <Page {...props} /> : null
      ))}
    </div>
  )
}

export default Pages
