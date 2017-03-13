import React from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentRemove from 'material-ui/svg-icons/content/remove'
import { ListItem } from 'material-ui/List'

const Camp = (props) => {

  const className = props.activeCamp ? 'activeCamp' : '';

  const renderPrimaryText = () => {
    return (
      <div>
        <b>
          {props.name}
        </b>
      </div>
    );
  }

  const renderRightIconButton = () => {
    return props.hasRemove
      ? (<FloatingActionButton
          onClick={props.onDeleteCamp}
          mini
          secondary
          title='Remove camp'>
          <ContentRemove className="removeCampIcon" />
        </FloatingActionButton>)
      : null;
  }

  return (
    <ListItem
      className={className}
      onClick={props.activeCamp ? props.onDeselectCamp : props.onSelectCamp}
      primaryText={renderPrimaryText()}
      rightIconButton={renderRightIconButton()} />
  );
}

export default Camp
