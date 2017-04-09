import React, { PropTypes} from 'react'
import {Card, CardMedia, CardTitle} from 'material-ui/Card';

const TitleCard = (props, context) => {
  const state = context.store;
  const visible = props.visible ? props.visible(state) : true;
  if (!visible) {
    return null;
  }

  const welcomeTitle =
    <CardTitle
      style={{
        fontFamily: 'Roboto',
        fontWeight: '800',
        textSize: '17px',
        lineHeight: '25',
        color: '#7f7f7f'
      }}
      title="welcome" />;

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
            height: 'auto',
          }}>
          <img src={require('../../../public/media/header/main.jpg')} />
        </CardMedia>
      </Card>
    </div>
  );
}

TitleCard.propTypes = {
  // visibility function
  visible: PropTypes.func,
}

TitleCard.contextTypes = {
  store: PropTypes.object.isRequired,
}

export default TitleCard
