import React from 'react'
import { Card, CardMedia, CardTitle } from 'react-md/lib/Cards'

const TitleCard = () => {
  const welcomeTitle =
    <CardTitle
      style={{
        fontFamily: 'Roboto',
        fontWeight: '800',
        textSize: '17px',
        lineHeight: '25',
        color: '#7f7f7f'
      }}
      title='welcome' />

  return (
    <div >
      <Card>
        <CardMedia
          overlay={welcomeTitle}
          overlayContainerStyle={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          overlayContentStyle={{
            position: 'relative',
            background: 'none !important'
          }}
          overlayStyle={{
            height: 'auto'
          }}>
          <img
            src={require('../../../public/media/header/main.jpg')} role='presentation' />
        </CardMedia>
      </Card>
    </div>
  )
}
export default TitleCard
